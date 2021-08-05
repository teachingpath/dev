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
  Row,
  Col
} from "@panely/components";
import {
  firebaseClient,
} from "components/firebase/firebaseClient";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { getTracksResponses, saveTrackResponse } from "consumer/track";

function QuestionForm({ onSave }) {
  const schema = yup.object().shape({
    answer: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor escriba su respuesta"),
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
                placeholder="Ingrese su respuesta aquí"
              />
              <Label for="name">Respuesta</Label>
              {errors.answer && (
                <Form.Feedback children={errors.answer.message} />
              )}
            </FloatLabel>
          </Form.Group>
        </Col>
        <Col sm="2">
          <Button type="submit" variant="primary" className="ml-2">
            Enviar
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

class Questions extends React.Component {
  state = { activeCard: null, list: [] };

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
    const { activeCard } = this.state;
    const {
      data: { questions, id },
      group,
    } = this.props;
    const user = firebaseClient.auth().currentUser;
    const trackName = this.props.data?.name;
    return (
      <Accordion>
        {questions.map((question, index) => {
          return (
            <Card>
              <Card.Header
                title="Click para expandir y ver el formulario de respuesta"
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
                        saveTrackResponse(id, group, data, question.id).then(
                          () => {
                            if (this.props.activityChange) {
                              this.props.activityChange({
                                type: "new_track_response",
                                msn: 'Nueva respuesta dentro de la sala "'+group+'".',
                                msnForGroup:'Nueva respuesta por <i>'+user.displayName+'</i> desde question track <b>'+trackName+'</b>.',
                                group: group,
                              });
                            }
                            this.componentDidMount();
                          }
                        );
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
