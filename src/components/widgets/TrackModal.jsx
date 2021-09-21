import { Modal, Card } from "@panely/components";
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
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
const ReactSwal = swalContent(Swal);
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

class TrackModal extends React.Component {
  minutes = 0;
  countdownRef = null;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dataTime: "00:00",
      isRunning: props.isRunning || false,
      wait: false,
    };
    this.countdownRef = React.createRef();
  }

  componentDidMount() {
    document.querySelectorAll("pre").forEach((el) => {
      hljs.configure({
        languages: ["javascript", "ruby", "python", "java"],
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
    getTrack(pathwayId, runnerId,  trackId, (data) => {
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
    data.date = new Date();
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
      if (this.minutes == 0) {
        const element = this.countdownRef?.current;
        this.setState({
          ...this.state,
          isRunning: false,
          wait: true,
        });
        swal
          .fire({
            title: "¿Quieres agregar 5 minutos mas para completar el track?",
            text: "¡Tu tiempo ha terminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
          })
          .then((result) => {
            if (result.value === true) {
              element.state.timeDelta.minutes = 5;
              element.start();
              this.minutes = 5;
              const data = {
                breadcrumbs: runners,
              };
              data.breadcrumbs[runnerIndex].tracks[trackIndex].time = 300000;
              data.breadcrumbs[runnerIndex].tracks[trackIndex].isRunning = true;

              firestoreClient
                .collection("journeys")
                .doc(journeyId)
                .update(data)
                .then((docRef) => {
                  this.setState({
                    ...this.state,
                    isRunning: true,
                    time: 300000,
                    wait: false,
                    dataTime: zeroPad(hours) + ":" + zeroPad(this.minutes),
                  });
                });
            }
          });
      }

      return <span> 00:00:00 h</span>;
    } else {
      if (minutes !== this.minutes) {
        this.minutes = minutes;
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
            console.log("time updated");
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
      onComplete,
      extarnalLink,
      tracksLength,
      trackIndex,
      journeyId,
      group,
      activityChange,
    } = this.props;
    const time = this.state.time || this.props.time;
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
          )) ||
            (this.state.wait ? <>Stop [00:00:00 h]</> : <>Iniciar</>)}
        </Button>
        <Modal scrollable isOpen={this.state.isOpen} className="modal-xl">
          <Progress
            striped
            variant="primary"
            value={((trackIndex + 1) / tracksLength) * 100}
          />
          <Modal.Header toggle={this.toggle}>
          
            <Link href={extarnalLink} className={"w-100"}>
              <i className="fas fa-expand mr-1" style={{cursor: "pointer"}}></i>
            </Link>
            {name || "..."}:
          </Modal.Header>
          <Modal.Body>
            {
              {
                learning: (
                  <LearningTrack
                    data={this.state}
                    group={group}
                    journeyId={journeyId}
                    activityChange={activityChange}
                  />
                ),
                questions: (
                  <Questions
                    data={this.state}
                    group={group}
                    journeyId={journeyId}
                    activityChange={activityChange}
                  />
                ),
                training: (
                  <TrainingTrack
                    data={this.state}
                    group={group}
                    journeyId={journeyId}
                    activityChange={activityChange}
                  />
                ),
                hacking: (
                  <HackingTrack
                    data={this.state}
                    group={group}
                    journeyId={journeyId}
                    activityChange={activityChange}
                  />
                ),
              }[type]
            }

            {this.state.references && (
              <Card className="mt-4">
                <Card.Header>
                  <h3 className="mt-3">Referencias</h3>
                </Card.Header>
                <Card.Body>
                  <div
                    dangerouslySetInnerHTML={{ __html: this.state.references }}
                  />
                </Card.Body>
              </Card>
            )}
          </Modal.Body>
          <Modal.Footer className="bg-yellow">
            <strong className="mr-2">
              Tiempo para finalizar {dataTime} hrs.
            </strong>
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
