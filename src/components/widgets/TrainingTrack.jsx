import Steps from "rc-steps";
import {
  Button,
  FloatLabel,
  Form,
  Input,
  Label,
  Marker,
  Timeline,
  Row,
  Col,
  Card
} from "@panely/components";
import {
  firebaseClient,
} from "components/firebase/firebaseClient";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { getTracksResponses, saveTrackResponse } from "consumer/track";

function SolutionForm({ onSave }) {
  const schema = yup.object().shape({
    result: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your result"),
  });

  const { control, errors, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      result: "",
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
                id="result"
                name="result"
                control={control}
                invalid={Boolean(errors.result)}
                placeholder="Insert your result"
              />
              <Label for="name">My Result</Label>
              {errors.result && (
                <Form.Feedback children={errors.result.message} />
              )}
            </FloatLabel>
          </Form.Group>
        </Col>
        <Col sm="12">
          <Button type="submit" variant="primary">
            Reply
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

class TrainingTrack extends React.Component {
  state = { current: 0, list: [] };

  componentDidMount() {
    const {
      data: { id },
      group
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
    const {
      data: { training, id },
      group,
    } = this.props;
    const user = firebaseClient.auth().currentUser;
    const trackName = this.props.data?.name;
    return (
      <Steps current={this.state.current} direction="vertical">
        {training?.map((item, index) => {
          return (
            <Steps.Step
              key={index}
              title={"Step#" + (index + 1)}
              description={
                <>
                  {this.state.current === index && (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: item.name }} />
                      <Button
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            current: this.state.current + 1,
                          });
                        }}
                      >
                        Done
                      </Button>
                    </>
                  )}
                </>
              }
            />
          );
        })}

        <Steps.Step
          title={"Result"}
          description={
            <Card>
              <Card.Body>
                <Card.Text>
                  Add here your training answer, add links, repositories or
                  comments.
                </Card.Text>
                {this.state.current === training?.length && (
                  <>
                    {user && (
                      <SolutionForm
                        onSave={(data) => {
                          saveTrackResponse(id, group, data).then(() => {
                            if (this.props.activityChange) {
                              this.props.activityChange({
                                type: "new_track_response",
                                msn: 'New track response inside group "'+group+'".',
                                msnForGroup:'New track response by <i>'+user.displayName+'</i> from training task <b>'+trackName+'</b>.',
                                group: group,
                              });
                            }
                            this.componentDidMount();
                            this.setState({ current: this.state.current + 1 });
                          });
                        }}
                      />
                    )}

                    <Timeline>
                      {this.state.list.map((data, index) => {
                        const { date, result } = data;

                        return (
                          <Timeline.Item
                            date={date}
                            pin={<Marker type="dot" />}
                          >
                            {result}
                          </Timeline.Item>
                        );
                      })}
                    </Timeline>
                  </>
                )}
              </Card.Body>
            </Card>
          }
        />
      </Steps>
    );
  }
}

export default TrainingTrack;
