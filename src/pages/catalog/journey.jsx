import {
  Row,
  Col,
  Container,
  Dropdown,
  Widget1,
  Card,
  Progress,
  Collapse,
  Accordion,
} from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
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
import TrackModal from "./trackModal";
import BadgetList from "./badgetList";

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
                  className={isFinish ? "bg-success text-white mb-5" : "bg-info text-white mb-5"}
                >
                  {this.state?.id && (
                    <StatusProgress
                      progress={this.state.progress}
                      journeyId={this.state.id}
                      runners={this.state?.runners}
                      pathwayId={this.state.pathwayId}
                    />
                  )}

                  <Widget1.Dialog>
                    <Widget1.DialogContent>
                      <h1
                        className="display-3"
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
                      <small className={" mx-auto d-block text-center text-muted"}>
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
          return (
            <Card>
              <Card.Header
                collapsed={!(activeCard === index)}
                onClick={() => this.toggle(index)}
              >
                <Card.Title>{item.name.toUpperCase()}</Card.Title>
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
      <Steps current={current} direction="vertical">
        {tracks.map((item, index) => {
          return (
            <Steps.Step
              status={item.status}
              title={item.title}
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

        {quiz && (
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
  const onReCreateJourney = (pathwayId, journeyId, runners) => {
    const breadcrumbs = runners.map(async (data, runnerIndex) => {
      const quiz = await firestoreClient
        .collection("runners")
        .doc(data.id)
        .collection("questions")
        .get()
        .then((querySnapshot) => {
          const questions = [];
          querySnapshot.forEach((doc) => {
            questions.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return questions;
        });

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        current: runnerIndex === 0 ? 0 : null,
        quiz: quiz,
        tracks: data.tracks.map((item, trackIndex) => {
          return {
            ...item,
            isRunning: false,
            time: item.timeLimit * 3600000,
            status: runnerIndex === 0 && trackIndex === 0 ? "process" : "wait",
          };
        }),
      };
    });

    return Promise.all(breadcrumbs).then((dataResolved) => {
      return firestoreClient
        .collection("journeys")
        .doc(journeyId)
        .update({
          progress: 1,
          pathwayId: pathwayId,
          date: new Date(),
          current: 0,
          breadcrumbs: dataResolved,
        })
        .then((doc) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
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
