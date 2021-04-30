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

function SolutionForm({ onSave }) {
  const schema = yup.object().shape({
    solution: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your solution"),
  });

  const { control, errors, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      solution: "",
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
                id="solution"
                name="solution"
                control={control}
                invalid={Boolean(errors.solution)}
                placeholder="Insert your solution"
              />
              <Label for="name">My Solution</Label>
              {errors.solution && (
                <Form.Feedback children={errors.solution.message} />
              )}
            </FloatLabel>
          </Form.Group>
        </Col>
        <Col sm="12">
          <Button type="submit" variant="primary">
            Respond
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

class HackingTrack extends React.Component {
  state = { list: [] };

  componentDidMount() {
    const {
      data: { id },
    } = this.props;
    firestoreClient
      .collection("track-response")
      .orderBy("date")
      .where("trackId", "==", id)
      .limit(10)
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
    const id = data.id;
    return (
      <>
        <Card>
          <Card.Header>Guidelines</Card.Header>
          <Card.Body>
            <Card.Subtitle>
              Take into account the following guide to carry out the hacking
            </Card.Subtitle>
            <Card.Text>
              <div dangerouslySetInnerHTML={{ __html: data.guidelines }} />
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mt-3">
          <Card.Header>Criteria</Card.Header>
          <Card.Body>
            <Card.Subtitle>
              Hacking should be assessed as follows:
            </Card.Subtitle>
            <Card.Text>
              <div dangerouslySetInnerHTML={{ __html: data.criteria }} />
            </Card.Text>
          </Card.Body>
        </Card>
        <div>
          <h3 className="mt-3">Solution</h3>
          <p>
            Add here your hacking answer, add links, repositories or comments.
          </p>

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
              const { date, solution } = data;

              return (
                <Timeline.Item date={date} pin={<Marker type="dot" />}>
                  {solution}
                </Timeline.Item>
              );
            })}
          </Timeline>
        </div>
      </>
    );
  }
}

export default HackingTrack;
