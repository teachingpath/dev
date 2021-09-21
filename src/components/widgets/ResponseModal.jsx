import { Modal, Card } from "@panely/components";
import Button from "@panely/components/Button";
import LearningTrack from "./LearningTrack";
import Questions from "./QuestionTrack";
import TrainingTrack from "./TrainingTrack";
import HackingTrack from "./HackingTrack";
import { getTrack } from "consumer/track";

class ResponseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: {},
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };


  componentDidMount() {
    const { pathwayId, runnerId, id } = this.props;
    getTrack(pathwayId,runnerId, id,(data) => {
      console.log(data);
        this.setState({
          ...data,
          id: id,
          training: [],
          typeContent: "",
          guidelines: null,
          criteria: null
        });
      },
      () => {}
    );
  }

  render() {
    const {
      title,
      type,
      children,
      group,
      journeyId,
      activityChange,
      user,
    } = this.props;

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
                    user={user}
                    data={this.state}
                    group={group}
                    journeyId={journeyId}
                    activityChange={activityChange}
                  />
                ),
                questions: (
                  <Questions
                    user={user}
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
                    user={user}
                    data={this.state}
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
