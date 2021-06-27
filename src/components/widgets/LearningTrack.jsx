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
import { firebaseClient } from "components/firebase/firebaseClient";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Row from "@panely/components/Row";
import Col from "@panely/components/Col";
import ReactPlayer from "react-player";
import DescribeURL from "@panely/components/DescribePage";
import { getTracksResponses, saveTrackResponse } from "consumer/track";

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
      group,
    } = this.props;
    getTracksResponses(
      id,
      group,
      (data) => {
        this.setState({
          ...this.state,
          list: data.list,
        });
      },
      () => {}
    );
  }
  render() {
    const { data, group } = this.props;
    const user = firebaseClient.auth().currentUser;
    const id = data.id;
    const trackName = this.props.data?.name;
    const typeContent = data.typeContent;
    return (
      <>
        {
          {
            file: <div dangerouslySetInnerHTML={{ __html: data.content }} />,
            fileCode: (
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            ),
            video: <ReactPlayer url={data.content} />,
            url: <DescribeURL url={data.content} />,
          }[typeContent]
        }

        {user && (
          <Card>
            <Card.Header>
              <h3 className="mt-3">Feedback</h3>
            </Card.Header>
            <Card.Body>
              <Card.Text>Write a feedback about what you learned.</Card.Text>
              <FeedbackForm
                onSave={(data) => {
                  return saveTrackResponse(id, group, data).then(() => {
                    if (this.props.activityChange) {
                      this.props.activityChange({
                        type: "new_track_response",
                        msn: 'New track response inside group "'+group+'".',
                        msnForGroup:'New track response by <i>'+user.displayName+'</i> from learning task <b>'+trackName+'</b>.',
                        group: group,
                      });
                    }
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
            </Card.Body>
          </Card>
        )}
      </>
    );
  }
}

export default LearningTrack;
