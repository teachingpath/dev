import {
    Card,
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
  import Router from "next/router";
  import Button from "@panely/components/Button";
  import Countdown, { zeroPad } from "react-countdown";
  import QuestionForm from "./question";
  import Training from "./training";
  import Hacking from "./hacking";

class TrackModal extends React.Component {
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
    let tracksTotal = data.breadcrumbs.length;
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
    if (tracks.length - 1 > trackIndex) {
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
      this.complete();
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
      ? "Time limit [" + timeLimit + " hour]"
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
        <Modal
          scrollable
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          className="modal-xl"
        >
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
                hacking: <Hacking data={this.state} />,
              }[type]
            }
          </Modal.Body>
          <Modal.Footer>
            <strong className="mr-2">{titleButton}</strong>
            <Button
              variant="primary"
              className="mr-2"
              title={"I have completed this track"}
              onClick={() => {
                this.complete().then(() => {
                  Router.reload();
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

  export default TrackModal;
