import Questions from "./QuestionTrack";
import TrainingTrack from "./TrainingTrack";
import HackingTrack from "./HackingTrack";
import LearningTrack from "./LearningTrack";

class TrackContent extends React.Component {
  render() { 
    return (
      <React.Fragment>
        {
          {
            learning: <LearningTrack data={this.props} group={"default"} />,
            questions: <Questions data={this.props} group={"default"}/>,
            training: <TrainingTrack data={this.props} group={"default"}/>,
            hacking: <HackingTrack data={this.props} group={"default"}/>,
          }[this.props.type]
        }
      </React.Fragment>
    );
  }
}

export default TrackContent;
