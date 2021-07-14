import Questions from "./QuestionTrack";
import TrainingTrack from "./TrainingTrack";
import HackingTrack from "./HackingTrack";
import LearningTrack from "./LearningTrack";
import Card from "@panely/components/Card";

class TrackContent extends React.Component {

  componentDidMount(){
    document.querySelectorAll("pre").forEach((el) => {
      hljs.configure({   // optionally configure hljs
        languages: ['javascript', 'ruby', 'python', 'java']
      });
      hljs.highlightElement(el);
    });
  }

  render() {
    return (
      <React.Fragment>
        {
          {
            learning: <LearningTrack data={this.props} group={"default"} />,
            questions: <Questions data={this.props} group={"default"} />,
            training: <TrainingTrack data={this.props} group={"default"} />,
            hacking: <HackingTrack data={this.props} group={"default"} />,
          }[this.props.type]
        }
        {this.props.references && (
          <Card className="mt-4">
            <Card.Header>
              <h3 className="mt-3">Referencias</h3>
            </Card.Header>
            <Card.Body>
              <div
                dangerouslySetInnerHTML={{ __html: this.props.references }}
              />
            </Card.Body>
          </Card>
        )}
      </React.Fragment>
    );
  }
}

export default TrackContent;
