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
  Modal,
  Timeline,
  Marker,
} from "@panely/components";
import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions";
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
import Countdown, { zeroPad } from "react-countdown";
import QuestionForm from "./question";
import Training from "./training";

class JourneyGeneralPage extends React.Component {
  componentDidMount() {
    if (!Router.query.id) {
      Router.push("/catalog");
    }
    this.props.pageChangeHeaderTitle("Pathway");
    this.props.breadcrumbChange([
      { text: "Catalog", link: "/catalog" },
      { text: "My Journey" },
    ]);

    firestoreClient
      .collection("journeys")
      .doc(Router.query.id)
      .get()
      .then(async (doc) => {
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
    return (
      <React.Fragment>
        <Head>
          <title>Journey | Teaching Path</title>
        </Head>
        <Container fluid>
          <Row portletFill="xl">
            <Col md="6">
              {this.state?.id && (
                <StatusProgress
                  progress={this.state.progress}
                  journeyId={this.state.id}
                />
              )}
            </Col>
            <Col md="6">
              {this.state?.runners && (
                <Runners
                  current={this.state.current}
                  runners={this.state.runners}
                  journeyId={this.state.id}
                />
              )}
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
    const { runners, journeyId } = this.props;
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
                    <ContentModal
                      runnerId={runnerId}
                      runnerIndex={runnerIndex}
                      trackId={item.id}
                      trackIndex={index}
                      time={item.time}
                      isRunning={item.isRunning || false}
                      runners={runners}
                      journeyId={journeyId}
                    ></ContentModal>
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
              <>
                <p>Present Quiz to validate knowledge.</p>
              </>
            }
          />
        )}
      </Steps>
    );
  }
}

const StatusProgress = ({ progress, journeyId }) => {
  return (
    <Widget1.Group>
      <Widget1.Title>
        <h4>Progress</h4>
        <Progress striped value={progress} className="mr-5 w-80">
          {progress}%
        </Progress>
      </Widget1.Title>
      <Widget1.Addon>
        {/* BEGIN Dropdown */}
        <Dropdown.Uncontrolled>
          <Dropdown.Toggle caret children="Option" />
          <Dropdown.Menu right animated>
            <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faRedo} />}>
              Reset
            </Dropdown.Item>
            <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faShare} />}>
              Share
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Uncontrolled>
        {/* END Dropdown */}
      </Widget1.Addon>
    </Widget1.Group>
  );
};

class ContentModal extends React.Component {
  time = 0;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isRunning: props.isRunning || false,
    };
    this.countdownRef = React.createRef();
  }
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
    if (!this.state.isOpen) {
      this.loadData();
    }
  };

  loadData() {
    firestoreClient
      .collection("runners")
      .doc(this.props.runnerId)
      .collection("tracks")
      .doc(this.props.trackId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({
            isOpen: true,
            isRunning: true,
            id: this.props.trackId,
            ...doc.data(),
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  complete = () => {
    const { runnerIndex, trackIndex, journeyId, runners } = this.props;
    const data = {
      breadcrumbs: runners,
    };
    let tracksCompleted = 1;
    let tracksTotal = 0;

    data.breadcrumbs.forEach((runner) => {
      if (runner.tracks) {
        runner.tracks.forEach((track) => {
          tracksTotal++;
          if (track.status === "finish") {
            tracksCompleted++;
          }
        });
      }
    });
    data.progress = (tracksCompleted / tracksTotal) * 100;

    const tracks = data.breadcrumbs[runnerIndex].tracks;

    tracks[trackIndex].time = 0;
    tracks[trackIndex].status = "finish";
    if (tracks.length > trackIndex) {
      tracks[trackIndex + 1].status = "process";
    }

    return firestoreClient
      .collection("journeys")
      .doc(journeyId)
      .update(data)
      .then((docRef) => {});
  };

  renderer = ({ hours, minutes, seconds, completed, total }) => {
    const { runnerIndex, trackIndex, journeyId, runners } = this.props;
    if (completed) {
      complete();
      return <span> 00:00:00 h</span>;
    } else {
      if (minutes % 2 === 0 && minutes !== this.time) {
        this.time = minutes;
        const data = {
          breadcrumbs: runners,
        };
        data.breadcrumbs[runnerIndex].tracks[trackIndex].time = total;
        data.breadcrumbs[runnerIndex].tracks[trackIndex].isRunning = true;
        firestoreClient
          .collection("journeys")
          .doc(journeyId)
          .update(data)
          .then((docRef) => {});
      }
      return (
        <span>
          Running [{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)} h]
        </span>
      );
    }
  };

  render() {
    const { name, type, isRunning, timeLimit } = this.state;
    const { time } = this.props;
    const titleButton = timeLimit
      ? "time limit [" + timeLimit + " h]"
      : "Start this track";
    const date = this.countdownRef?.current?.props?.date
      ? this.countdownRef?.current?.props?.date
      : Date.now() + time;
    return (
      <React.Fragment>
        <Button title={titleButton} onClick={this.toggle}>
          {(isRunning && (
            <Countdown
              ref={this.countdownRef}
              date={date}
              renderer={this.renderer}
            />
          )) || <>Start</>}
        </Button>
        {/* BEGIN Modal */}
        <Modal scrollable isOpen={this.state.isOpen} toggle={this.toggle} className="modal-xl">
          <Modal.Header toggle={this.toggle}>
            {name || "Loading"}
            <small className="text-muted"> {type || ""}</small>
          </Modal.Header>
          <Modal.Body>
            {
              {
                learning: (
                  <div
                    dangerouslySetInnerHTML={{ __html: this.state.content }}
                  />
                ),
                q_and_A: <Questions data={this.state} />,
                training: <Training data={this.state} />,
              }[type]
            }
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="mr-2"
              onClick={() => {
                this.complete().then(() => {
                  window.location.reload();
                });
              }}
            >
              Complete
            </Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </React.Fragment>
    );
  }
}

class Questions extends React.Component {
  // Default active card id
  state = { activeCard: 0, list: [] };

  // Handle toggling accordion
  toggle = (id) => {
    if (this.state.activeCard === id) {
      this.setState({ activeCard: null });
    } else {
      this.setState({ activeCard: id });
    }
  };

  componentDidMount() {
    const {
      data: { id },
    } = this.props;
    firestoreClient
      .collection("track-answers")
      .orderBy("date")
      .where("trackId", "==", id)
      .limit(30)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const list = [];
          querySnapshot.forEach((doc) => {
            list.push(doc.data());
          });
          this.setState({
            ...this.state,
            list: list,
          });
        } else {
          console.log("No such journeys!");
        }
      })
      .catch((error) => {
        console.log("Error getting journeys: ", error);
      });
  }

  render() {
    const { activeCard } = this.state;
    const {
      data: { questions, id },
    } = this.props;
    return (
      <Accordion>
        {questions.map((question, index) => {
          return (
            <Card>
              <Card.Header
                collapsed={!(activeCard === index)}
                onClick={() => this.toggle(index)}
              >
                <Card.Title>{question.name}</Card.Title>
              </Card.Header>
              <Collapse isOpen={activeCard === index}>
                <Card.Body>
                  <QuestionForm
                    onSave={(data) => {
                      const user = firebaseClient.auth().currentUser;
                      return firestoreClient
                        .collection("track-answers")
                        .add({
                          id: question.id,
                          trackId: id,
                          ...data,
                          userId: user.uid,
                          date: Date.now(),
                        })
                        .then(() => {
                          this.componentDidMount();
                        });
                    }}
                  />

                  <Timeline>
                    {this.state.list.map((data, index) => {
                      const { date, answer } = data;

                      return (
                        <Timeline.Item
                          key={index}
                          date={date}
                          pin={<Marker type="circle" />}
                        >
                          {answer}
                        </Timeline.Item>
                      );
                    })}
                  </Timeline>
                </Card.Body>
              </Collapse>
            </Card>
          );
        })}
      </Accordion>
    );
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(JourneyGeneralPage, "public")));
