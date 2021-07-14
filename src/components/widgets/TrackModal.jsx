import { Modal } from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import Button from "@panely/components/Button";
import Countdown, { zeroPad } from "react-countdown";
import Questions from "./QuestionTrack";
import TrainingTrack from "./TrainingTrack";
import HackingTrack from "./HackingTrack";
import LearningTrack from "./LearningTrack";
import Link from "next/link";
import { timeShortPowerTen } from "components/helpers/time";
import Progress from "@panely/components/Progress";
import { getTrack } from "consumer/track";

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

  componentDidMount(){
    document.querySelectorAll("pre").forEach((el) => {
      hljs.configure({   // optionally configure hljs
        languages: ['javascript', 'ruby', 'python', 'java']
      });
      hljs.highlightElement(el);
    });
  }
  
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
    if (!this.state.isOpen) {
      this.loadData();
    }
  };

  loadData() {
    const { pathwayId, runnerId, trackId } = this.props;
    getTrack(
      pathwayId,
      runnerId,
      trackId,
      (data) => {
        this.setState({
          isOpen: true,
          isRunning: true,
          ...data,
        });
      },
      () => {}
    );
  }

  complete = () => {
    const { runnerIndex, trackIndex, journeyId, runners } = this.props;
    const data = {
      breadcrumbs: runners,
    };
    let tracksCompleted = runnerIndex + 1;
    let tracksTotal = data.breadcrumbs.length;
    data.breadcrumbs.forEach((runner) => {
      if (runner.tracks) {
        runner.tracks.forEach((track) => {
          tracksTotal++;
          if (track.status === "finish" || track.status === null) {
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
    const { runnerIndex, trackIndex, journeyId, runners, onComplete } =
      this.props;

    if (completed) {
      this.complete().then(() => {
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
    const {
      time,
      onComplete,
      extarnalLink,
      tracksLength,
      trackIndex,
      group,
      activityChange,
    } = this.props;
    const titleButton = timeLimit
      ? "Tiempo limite[" + timeShortPowerTen(timeLimit) + "]"
      : "Inicia el Track";
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
          )) || <>Iniciar</>}
        </Button>
        <Modal
          scrollable
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          className="modal-xl"
        >
          <Progress
            striped
            variant="primary"
            value={((trackIndex + 1) / tracksLength) * 100}
          />
          <Modal.Header toggle={this.toggle}>
            <Link href={extarnalLink} className={"w-100"}>
              {name || "..."}
            </Link>
          </Modal.Header>
          <Modal.Body>
            {
              {
                learning: (
                  <LearningTrack
                    data={this.state}
                    group={group}
                    activityChange={activityChange}
                  />
                ),
                questions: (
                  <Questions
                    data={this.state}
                    group={group}
                    activityChange={activityChange}
                  />
                ),
                training: (
                  <TrainingTrack
                    data={this.state}
                    group={group}
                    activityChange={activityChange}
                  />
                ),
                hacking: (
                  <HackingTrack
                    data={this.state}
                    group={group}
                    activityChange={activityChange}
                  />
                ),
              }[type]
            }
          </Modal.Body>
          <Modal.Footer className="bg-yellow">
            <strong className="mr-2">Time to finish {dataTime} hours.</strong>
            <Button
              variant="primary"
              className="mr-2"
              title={"He completado este Track"}
              onClick={() => {
                this.complete().then(() => {
                  onComplete();
                });
              }}
            >
              Completar
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
      </React.Fragment>
    );
  }
}

export default TrackModal;
