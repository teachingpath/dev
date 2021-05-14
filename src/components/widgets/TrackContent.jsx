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
            learning: <LearningTrack data={this.props} />,
            q_and_A: <Questions data={this.props} />,
            training: <TrainingTrack data={this.props} />,
            hacking: <HackingTrack data={this.props} />,
          }[this.props.type]
        }
      </React.Fragment>
    );
  }
}

export default TrackContent;
