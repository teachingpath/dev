import Steps from "rc-steps";
import {
  Form,
  Label,
  Input,
  Button,
  FloatLabel,
  Timeline,
  Marker
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
          <Button
            type="submit"
            variant="primary"
          >
            Reply
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

class Training extends React.Component {
  state = { current: 0, list: [] };
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
    const {
      data: { training, id },
    } = this.props;
    return (
      <Steps current={this.state.current} direction="vertical">
        {training?.map((item, index) => {
          return (
            <Steps.Step
              key={index}
              title={"Step#" + (index + 1)}
              description={
                <>
                  <div dangerouslySetInnerHTML={{ __html: item.name }} />
                  {this.state.current === index && (
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
                  )}
                </>
              }
            />
          );
        })}

        <Steps.Step
          title={"Result"}
          description={
            <>
              <p>
                Add here your training answer, add links, repositories or
                comments.
              </p>
              {this.state.current === training?.length && (
                <>
                  <SolutionForm
                    onSave={(data) => {
                      const user = firebaseClient.auth().currentUser;
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
            </>
          }
        />
      </Steps>
    );
  }
}

export default Training;
