import {
  Form,
  Label,
  Input,
  Button,
  FloatLabel,
  Timeline,
  Marker,
  Card,
} from "@panely/components";
import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Row from "@panely/components/Row";
import Col from "@panely/components/Col";
import ReactPlayer from "react-player";

function FeedbackForm({ onSave }) {
  const schema = yup.object().shape({
    feedback: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your feedback"),
  });

  const { control, errors, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      feedback: "",
    },
  });
  return (
    <Form
      onSubmit={handleSubmit((data) => {
        onSave(data).then(() => {
          reset();
        });
      })}
    >
      <Row>
        <Col sm="12">
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="textarea"
                id="feedback"
                name="feedback"
                control={control}
                invalid={Boolean(errors.feedback)}
                placeholder="Insert your feedback"
              />
              <Label for="name">My Feedback</Label>
              {errors.feedback && (
                <Form.Feedback children={errors.feedback.message} />
              )}
            </FloatLabel>
          </Form.Group>
        </Col>
        <Col sm="12">
          <Button type="submit" variant="primary">
            Send
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

class LearningTrack extends React.Component {
  state = { list: [] };

  componentDidMount() {
    const {
      data: { id },
    } = this.props;
    firestoreClient
      .collection("track-response")
      .orderBy("date")
      .where("trackId", "==", id)
      .limit(20)
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
    const { data } = this.props;
    const user = firebaseClient.auth().currentUser;
    const id = data.id;
    const typeContent = data.typeContent;
    return (
      <>
        {typeContent === "video" ? (
          <ReactPlayer url={data.content} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        )}

        {user && (
          <div>
            <hr />
            <h3 className="mt-3">Feedback</h3>
            <p>Write a feedback about what you learned.</p>

            <FeedbackForm
              onSave={(data) => {
                return firestoreClient
                  .collection("track-response")
                  .add({
                    id: 1,
                    trackId: id,
                    ...data,
                    userId: user.uid,
                    date: Date.now(),
                  })
                  .then(() => {
                    this.componentDidMount();
                    this.setState({ current: this.state.current + 1 });
                  });
              }}
            />
            <Timeline>
              {this.state.list.map((data, index) => {
                const { date, feedback } = data;

                return (
                  <Timeline.Item date={date} pin={<Marker type="dot" />}>
                    {feedback}
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </div>
        )}
      </>
    );
  }
}

export default LearningTrack;
