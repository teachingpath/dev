import Questions from "./QuestionTrack";
import TrainingTrack from "./TrainingTrack";
import HackingTrack from "./HackingTrack";
import LearningTrack from "./LearningTrack";
import Card from "@panely/components/Card";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { activityChange } from "store/actions";

class TrackContent extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      document.querySelectorAll("pre").forEach((el) => {
        hljs.configure({
          // optionally configure hljs
          languages: ["javascript", "ruby", "python", "java"],
        });
        hljs.highlightElement(el);
      });
    }, 800);
  }

  render() {
    const group = localStorage.getItem("group")
      ? localStorage.getItem("group")
      : "default";
    const activityChange = localStorage.getItem("journeyId")
      ? this.props.activityChange
      : null;
    const journeyId = localStorage.getItem("journeyId")
      ? localStorage.getItem("journeyId")
      : null;
    return (
      <React.Fragment>
        <div className="mt-2">
          {
            {
              learning: (
                <LearningTrack
                  data={this.props}
                  group={group}
                  journeyId={journeyId}
                  activityChange={activityChange}
                />
              ),
              questions: (
                <Questions
                  data={this.props}
                  group={group}
                  journeyId={journeyId}
                  activityChange={activityChange}
                />
              ),
              training: (
                <TrainingTrack
                  data={this.props}
                  group={group}
                  journeyId={journeyId}
                  activityChange={activityChange}
                />
              ),
              hacking: (
                <HackingTrack
                  data={this.props}
                  group={group}
                  activityChange={activityChange}
                />
              ),
            }[this.props.type]
          }
        </div>

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

function mapDispathToProps(dispatch) {
  return bindActionCreators({ activityChange }, dispatch);
}

export default connect(null, mapDispathToProps)(TrackContent);
