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
  Col,
} from "@panely/components";
import { firebaseClient } from "components/firebase/firebaseClient";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { deleteResponseById, getTracksResponses, saveTrackResponse } from "consumer/track";
import { useState } from "react";
import {
  activityMapper,
  linkGroup,
  linkTrack,
} from "components/helpers/mapper";
import { getUser } from "consumer/user";
import swalContent from "sweetalert2-react-content";
import Swal from "@panely/sweetalert2";
import { Avatar } from "@panely/components";
import { Badge } from "@panely/components";
const ReactSwal = swalContent(Swal);
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

function QuestionForm({ onSave }) {
  const [load, setLoad] = useState(null);

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
        setLoad(true);
        onSave(data).then(() => {
          reset();
          setLoad(false);
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
          <Button
            type="submit"
            variant="primary"
            className="ml-2"
            disabled={load}
          >
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
      () => {
        console.log("Error al obtener la respuesta");
      }
    );
  }

  onDelete(id) {
    swal
      .fire({
        title: "¿Estas seguro/segura?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, bórralo!",
      })
      .then((result) => {
        if (result.value) {
          deleteResponseById(id).then(() => {
            this.componentDidMount();
          });
        }
      });
  }
  render() {
    const { activeCard } = this.state;
    const {
      data: { questions = [], id },
      group,
      journeyId,
    } = this.props;
    const user = this.props.user || firebaseClient.auth().currentUser;
    return (
      <Accordion>
        <p>En esta lección debes responder a las siguientes preguntas:</p>
        {questions.map((question, index) => {
          return (
            <Card key={"myquestions" + index}>
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
                        return getUser(user.uid).then((dataUser) => {
                          data.name = question.name;
                          data.user = {
                            displayName:
                              dataUser.data.firstName +
                              " " +
                              dataUser.data.lastName,
                            email: dataUser.data.email,
                            image: dataUser.data.image,
                          };
                          data.index = index;
                          return saveTrackResponse(
                            id,
                            group,
                            data,
                            question.id
                          ).then(() => {
                            if (this.props.activityChange) {
                              this.props.activityChange(
                                activityMapper(
                                  "new_track_response",
                                  linkTrack(
                                    this.props.data.id,
                                    this.props.data.runnerId,
                                    this.props.data.name,
                                    "Nueva respuesta al questionario __LINK__ "
                                  ),
                                  linkGroup(
                                    journeyId,
                                    user,
                                    linkTrack(
                                      this.props.data.id,
                                      this.props.data.runnerId,
                                      this.props.data.name,
                                      "ha escrito una nueva respuesta para el questionario __LINK__ "
                                    )
                                  ),
                                  this.props.group,
                                  2
                                )
                              );
                            }
                            setTimeout(() => {
                              this.componentDidMount();
                            }, 400);
                          });
                        });
                      }}
                    />
                  )}

                  <Timeline>
                    {this.state.list
                      .filter((q) => q.index === index)
                      .map((data, index) => {
                        const { date, answer, userId, id } = data;
                        return (
                          <Timeline.Item
                            key={index}
                            date={date}
                            pin={
                              <Avatar circle display>
                                <img
                                  src={data.user.image}
                                  alt="Avatar image"
                                  title={data.user.displayName}
                                />
                              </Avatar>
                            }
                          >
                            <p> {answer}</p>
                          {user.uid === userId && (
                                <p> <Badge
                                href="javascript:void(0)"
                                onClick={() => {
                                  this.onDelete(id);
                                }}
                              >
                                Eliminar
                              </Badge></p>
                            )}
                           
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
