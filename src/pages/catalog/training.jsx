import Steps from "rc-steps";
import { Form, Label, Input, Button, FloatLabel } from "@panely/components";
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
    answer: yup
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
              <Label for="name">Result</Label>
              {errors.result && (
                <Form.Feedback children={errors.result.message} />
              )}
            </FloatLabel>
          </Form.Group>
        </Col>
        <Col sm="2">
          <Button type="submit" variant="primary" className="ml-2" onClick={() => {
        console.log("asdasdas");

          }}>
            Send
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

class Training extends React.Component {
  state = { current: 0 };
  componentDidMount(){

  }
  render() {
    const {
      data: { training },
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
                        this.setState({ current: this.state.current + 1 });
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
              <p>Add here the result of your work.</p>
              {this.state.current === training?.length && (
                <>
                  <SolutionForm
                    onSave={(data) => {
                      const user = firebaseClient.auth().currentUser;
                      return firestoreClient
                        .collection("track-answers")
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
