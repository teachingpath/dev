import {
  Form,
  Label,
  Input,
  Button,
  FloatLabel,
  Card,
  Collapse,
  Accordion,
  Timeline,
  Marker,
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

function QuestionForm({ onSave }) {
  const schema = yup.object().shape({
    answer: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your answer"),
  });

  const { control, errors, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      answer: "",
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
        <Col sm="10">
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="textarea"
                id="answer"
                name="answer"
                control={control}
                invalid={Boolean(errors.answer)}
                placeholder="Insert your answer"
              />
              <Label for="name">Answer</Label>
              {errors.answer && (
                <Form.Feedback children={errors.answer.message} />
              )}
            </FloatLabel>
          </Form.Group>
        </Col>
        <Col sm="2">
          <Button type="submit" variant="primary" className="ml-2">
            Send
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

class Questions extends React.Component {
  // Default active card id
  state = { activeCard: null, list: [] };

  // Handle toggling accordion
  toggle = (id) => {
    if (this.state.activeCard === id) {
      this.setState({ activeCard: null });
    } else {
      this.setState({ activeCard: id });
    }
  };

  componentDidMount() {
    const {
      data: { id },
    } = this.props;
    firestoreClient
      .collection("track-response")
      .orderBy("date")
      .where("trackId", "==", id)
      .limit(30)
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
    const { activeCard } = this.state;
    const {
      data: { questions, id },
    } = this.props;
    const user = firebaseClient.auth().currentUser;

    return (
      <Accordion>
        {questions.map((question, index) => {
          return (
            <Card>
              <Card.Header
                collapsed={!(activeCard === index)}
                onClick={() => this.toggle(index)}
              >
                <Card.Title>{question.name}</Card.Title>
              </Card.Header>
              <Collapse isOpen={activeCard === index}>
                <Card.Body>
                  {user && (
                    <QuestionForm
                      onSave={(data) => {
                        const user = firebaseClient.auth().currentUser;
                        return firestoreClient
                          .collection("track-response")
                          .add({
                            id: question.id,
                            trackId: id,
                            ...data,
                            userId: user.uid,
                            date: Date.now(),
                          })
                          .then(() => {
                            this.componentDidMount();
                          });
                      }}
                    />
                  )}

                  <Timeline>
                    {this.state.list
                      .filter((q) => q.id === index)
                      .map((data, index) => {
                        const { date, answer } = data;

                        return (
                          <Timeline.Item
                            key={index}
                            date={date}
                            pin={<Marker type="circle" />}
                          >
                            {answer}
                          </Timeline.Item>
                        );
                      })}
                  </Timeline>
                </Card.Body>
              </Collapse>
            </Card>
          );
        })}
      </Accordion>
    );
  }
}

export default Questions;
