import {
  Accordion,
  Card,
  Col,
  Collapse,
  Container,
  Dropdown,
  Portlet,
  Progress,
  Row,
  Widget1,
} from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import {
  activityChange,
  breadcrumbChange,
  pageChangeHeaderTitle,
} from "store/actions";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import withAuth from "components/firebase/firebaseWithAuth";
import Router from "next/router";
import Steps from "rc-steps";
import Button from "@panely/components/Button";
import TrackModal from "../../components/widgets/TrackModal";
import BadgetList from "../../components/widgets/BadgetList";
import React from "react";
import Badge from "@panely/components/Badge";

class JourneyGeneralPage extends React.Component {
  state = { name: "Loading", trophy: {}, progress: 0, badgets: [] };

  componentDidMount() {
    if (!Router.query.id) {
      Router.push("/catalog");
    }
    this.props.pageChangeHeaderTitle("Pathways");
    this.props.breadcrumbChange([
      { text: "Catalog", link: "/catalog" },
      { text: "My Journey" },
    ]);

    firestoreClient
      .collection("journeys")
      .doc(Router.query.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = {
            ...doc.data(),
            id: Router.query.id,
          };
          data.runners = data.breadcrumbs;
          this.setState(data);
          this.props.breadcrumbChange([
            { text: "Catalog", link: "/catalog" },
            { text: "Pathway", link: "/catalog/pathway?id=" + data.pathwayId },
            { text: "My Journey" },
          ]);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    const { name, trophy, progress } = this.state;
    const isFinish = progress >= 100;
    return (
      <React.Fragment>
        <Head>
          <title>Journey | Teaching Path</title>
        </Head>
        <Container fluid>
          <Row portletFill="xl">
            <Col xl="12">
              <Widget1 fluid>
                <Widget1.Display
                  top
                  size="lg"
                  className={
                    isFinish
                      ? "bg-success text-white mb-5"
                      : "bg-info text-white mb-5"
                  }
                >
                  {this.state?.id && (
                    <StatusProgress
                      progress={this.state.progress.toFixed(2)}
                      journeyId={this.state.id}
                      runners={this.state?.runners}
                      pathwayId={this.state.pathwayId}
                    />
                  )}

                  <Widget1.Dialog>
                    <Widget1.DialogContent>
                      <h1
                        className="display-5"
                        children={name?.toUpperCase()}
                      />
                    </Widget1.DialogContent>
                  </Widget1.Dialog>
                  {Object.keys(trophy).length > 0 && (
                    <Widget1.Offset>
                      <img
                        src={trophy?.image}
                        alt="loading"
                        className="bg-white p-2 border mx-auto d-block mg-thumbnail avatar-circle"
                      />
                      <h4
                        className={
                          (isFinish ? "text-black " : "text-muted") +
                          " mx-auto d-block text-center "
                        }
                      >
                        {trophy?.name}
                      </h4>
                      <small
                        className={" mx-auto d-block text-center text-muted"}
                      >
                        {isFinish ? trophy?.description : ""}
                      </small>
                    </Widget1.Offset>
                  )}
                </Widget1.Display>
                <Widget1.Body style={{ marginTop: "60px" }}>
                  <Row>
                    <Col md="6">
                      {this.state?.id && (
                        <BadgetList journeyId={this.state?.id} />
                      )}
                    </Col>
                    <Col md="6">
                      {this.state?.runners && (
                        <Runners
                          current={this.state.current}
                          runners={this.state.runners}
                          journeyId={this.state.id}
                          onComplete={(data) => {
                            this.props.activityChange({
                              type: "complete_track",
                              msn: 'Track "' + data.name + '" completed.',
                              ...data,
                            });
                            this.componentDidMount();
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                </Widget1.Body>
              </Widget1>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

class Runners extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeCard: props.current || 0 };
  }

  toggle = (id) => {
    if (this.state.activeCard === id) {
      this.setState({ activeCard: null });
    } else {
      this.setState({ activeCard: id });
    }
  };

  render() {
    const { activeCard } = this.state;
    const { runners, journeyId, onComplete } = this.props;
    return (
      <Accordion {...this.props}>
        {runners.map((item, index) => {
          const total = item.tracks
            ?.filter((t) => t.status !== null)
            ?.filter((t) => t.status !== "finish")
            ?.map((t) => t.timeLimit)
            .reduce((a, b) => a + b, 0);

          return (
            <Card key={"runnerskys" + index}>
              <Card.Header
                collapsed={!(activeCard === index)}
                onClick={() => this.toggle(index)}
              >
                <Card.Title>{item.name.toUpperCase()}</Card.Title>
                {total > 0 ? (
                  <Portlet.Addon>Total time limit: {total} h</Portlet.Addon>
                ) : (
                  <Portlet.Addon>Finished</Portlet.Addon>
                )}
              </Card.Header>
              <Collapse isOpen={activeCard === index}>
                <Card.Body>{item.description}</Card.Body>
                <Card.Body>
                  <Tracks
                    onComplete={() => {
                      onComplete(item);
                    }}
                    runnerIndex={index}
                    tracks={item.tracks}
                    quiz={item.quiz}
                    runnerId={item.id}
                    journeyId={journeyId}
                    current={item.current}
                    runners={runners}
                  />
                </Card.Body>
              </Collapse>
            </Card>
          );
        })}
      </Accordion>
    );
  }
}

class Tracks extends React.Component {
  render() {
    const {
      tracks,
      current,
      runnerId,
      runnerIndex,
      journeyId,
      runners,
      quiz,
      onComplete,
    } = this.props;
    const activeQuiz = tracks.every((track) => {
      return track.status === "finish";
    });
    return (
      <Steps current={current} direction="vertical" index={runnerId}>
        {tracks.map((item, index) => {
          return (
            <Steps.Step
              key={item.id}
              index={item.id}
              status={item.status}
              title={
                <>
                {(item.status === "process" || item.status === "wait") && (
                    <Badge className="mr-2">{item.timeLimit} h</Badge>
                  )}
                  <Badge className="mr-2">{item.type}</Badge>
                  {
                    item.status !== "process" ? (
                      <a href={"/catalog/track?id="+item.id+"&runnerId="+runnerId+"&journeyId="+journeyId} >{item.title}</a>
                    ) : (
                      item.title
                    )
                  }
                 
                </>
              }
              description={
                <div>
                  <p>{item.subtitle}</p>
                  {item.status === "process" && (
                    <TrackModal
                      runnerId={runnerId}
                      runnerIndex={runnerIndex}
                      trackId={item.id}
                      trackIndex={index}
                      timeLimit={item.timeLimit}
                      time={item.time}
                      isRunning={item.isRunning || false}
                      runners={runners}
                      onComplete={onComplete}
                      journeyId={journeyId}
                    />
                  )}
                </div>
              }
            />
          );
        })}

        {quiz && current !== null && (
          <Steps.Step
            status={activeQuiz ? "process" : "wait"}
            title={"Quiz"}
            description={
              <div>
                <p>Present Quiz to validate knowledge.</p>
                <Button
                  disabled={!activeQuiz}
                  onClick={() => {
                    Router.push({
                      pathname: "/catalog/quiz",
                      query: {
                        id: journeyId,
                        runnerId: runnerId,
                      },
                    });
                  }}
                >
                  Take quiz
                </Button>
              </div>
            }
          />
        )}
      </Steps>
    );
  }
}

const StatusProgress = ({ progress, journeyId, pathwayId, runners }) => {
  const isFinish = progress >= 100;
  const onReCreateJourney = (pathwayId, journeyId) => {
    return firestoreClient
      .collection("journeys")
      .doc(journeyId)
      .delete()
      .then((doc) => {
        Router.push({
          pathname: "/catalog/pathway",
          query: {
            id: pathwayId,
          },
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <>
      <Widget1.Group>
        {!isFinish ? (
          <Widget1.Title>
            <h4>Progress</h4>
            <Progress striped value={progress} className="mr-5 w-50">
              {progress}%
            </Progress>
          </Widget1.Title>
        ) : (
          <h4 className="mr-5 w-100">Pathway Successful</h4>
        )}

        <Widget1.Addon>
          {/* BEGIN Dropdown */}
          <Dropdown.Uncontrolled>
            <Dropdown.Toggle caret children="Option" />
            <Dropdown.Menu right animated>
              <Dropdown.Item
                icon={<FontAwesomeIcon icon={SolidIcon.faRedo} />}
                onClick={() => {
                  onReCreateJourney(pathwayId, journeyId, runners);
                }}
              >
                Reset
              </Dropdown.Item>
              <Dropdown.Item
                icon={<FontAwesomeIcon icon={SolidIcon.faShare} />}
              >
                Share
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Uncontrolled>
          {/* END Dropdown */}
        </Widget1.Addon>
      </Widget1.Group>
    </>
  );
};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(JourneyGeneralPage, "public")));
