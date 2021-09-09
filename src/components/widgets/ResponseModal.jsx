import { Modal, Card } from "@panely/components";
import Button from "@panely/components/Button";
import LearningTrack from "./LearningTrack";
import Questions from "./QuestionTrack";
import TrainingTrack from "./TrainingTrack";
import HackingTrack from "./HackingTrack";

class ResponseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { title, type, id, children, group, journeyId, activityChange } =
      this.props;

    return (
      <React.Fragment>
        <span style={{ cursor: "pointer" }} onClick={this.toggle}>
          {children}
        </span>
        <Modal scrollable isOpen={this.state.isOpen} className="modal-xl">
          <Modal.Header toggle={this.toggle}>{title}</Modal.Header>
          <Modal.Body>
            {
              {
                learning: (
                  <LearningTrack
                    data={{ id }}
                    group={group}
                    journeyId={journeyId}
                    activityChange={activityChange}
                  />
                ),
                questions: (
                  <Questions
                    data={{ id }}
                    group={group}
                    journeyId={journeyId}
                    activityChange={activityChange}
                  />
                ),
                training: (
                  <TrainingTrack
                    data={{ id }}
                    group={group}
                    journeyId={journeyId}
                    activityChange={activityChange}
                  />
                ),
                hacking: (
                  <HackingTrack
                    data={{ id }}
                    group={group}
                    journeyId={journeyId}
                    activityChange={activityChange}
                  />
                ),
              }[type]
            }
          </Modal.Body>
          <Modal.Footer className="bg-yellow">
            <Button
              variant="secondary"
              className="mr-2"
              title={"Close modal"}
              onClick={() => {
                this.toggle();
              }}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ResponseModal;
