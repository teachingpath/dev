import { Modal } from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import Router from "next/router";
import Button from "@panely/components/Button";
import Countdown, { zeroPad } from "react-countdown";
import Questions from "./question";
import Training from "./training";
import Hacking from "./hacking";
import Learning from "./learning";

class TrackModal extends React.Component {
  time = 0;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dataTime: zeroPad(props.timeLimit) + ":00",
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
    const {
      runnerIndex,
      trackIndex,
      journeyId,
      runners,
      onComplete,
    } = this.props;

    if (completed) {
      complete().then(() => {
        onComplete();
      });
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
          .then((docRef) => {
            this.setState({
              ...this.state,
              dataTime: zeroPad(hours) + ":" + zeroPad(minutes),
            });
          });
      }
      return (
        <span>
          Running [{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)} h]
        </span>
      );
    }
  };

  render() {
    const { name, type, isRunning, timeLimit, dataTime } = this.state;
    const { time, onComplete } = this.props;
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
                learning: <Learning data={this.state} />,
                q_and_A: <Questions data={this.state} />,
                training: <Training data={this.state} />,
                hacking: <Hacking data={this.state} />,
              }[type]
            }
          </Modal.Body>
          <Modal.Footer>
            <strong className="mr-2">Time to finish {dataTime} hours.</strong>
            <Button
              variant="primary"
              className="mr-2"
              title={"I have completed this track"}
              onClick={() => {
                this.complete().then(() => {
                  onComplete();
                });
              }}
            >
              Complete
            </Button>
            <Button
              variant="secondary"
              className="mr-2"
              title={"Close modal"}
              onClick={() => {
                this.toggle();
              }}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </React.Fragment>
    );
  }
}

export default TrackModal;
