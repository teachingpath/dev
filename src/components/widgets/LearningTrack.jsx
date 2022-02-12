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
import {
  deleteResponseById,
  getTracksResponses,
  saveTrackResponse,
} from "consumer/track";
import {
  activityMapper,
  linkGroup,
  linkify,
  linkTrack,
} from "components/helpers/mapper";
import { useState } from "react";
import Badge from "@panely/components/Badge";
import { getUser } from "consumer/user";
import Avatar from "@panely/components/Avatar";

import swalContent from "sweetalert2-react-content";
import Swal from "@panely/sweetalert2";
const ReactSwal = swalContent(Swal);
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});


function FeedbackForm({ onSave }) {
  const [load, setLoad] = useState(null);
  const schema = yup.object().shape({
    feedback: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor ingrese su feedback"),
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
        setLoad(true);
        onSave(data).then(() => {
          reset();
          setLoad(false);
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
                placeholder="Ingrese su feedback"
              />
              <Label for="name">Mi Feedback</Label>
              {errors.feedback && (
                <Form.Feedback children={errors.feedback.message} />
              )}
            </FloatLabel>
          </Form.Group>
        </Col>
        <Col sm="12">
          <Button type="submit" variant="primary" disabled={load}>
            Enviar
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
    const { data, group, journeyId } = this.props;
    const user = firebaseClient.auth().currentUser;
    const id = data.id;
    const typeContent = data.typeContent;
    return (
      <>
        {
          {
            file: <div dangerouslySetInnerHTML={{ __html: data.content }} />,
            fileCode: (
              <div dangerouslySetInnerHTML={{ __html: data.content }} className="center"/>
            ),
            video: (
              <p className="pt-2 center">
                <ReactPlayer url={data.content} />
              </p>
            ),
            url: <DescribeURL url={data.content} />,
          }[typeContent]
        }

        {user && (
          <Card>
            <Card.Header>
              <h3 className="mt-3">Retroalimentación</h3>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Responder alguna de estas preguntas:{" "}
                <i>
                  ¿Qué aprendiste con este contenido? ¿Cuál es tu apreciación?,
                  ¿Qué opinas?, ¿10 elementos claves?
                </i>
              </Card.Text>
              {id && (
                <FeedbackForm
                  onSave={(data) => {
                    return getUser(user.uid).then((dataUser) => {
                      data.user = {
                        displayName:
                          dataUser.data.firstName +
                          " " +
                          dataUser.data.lastName,
                        email: dataUser.data.email,
                        image: dataUser.data.image,
                      };
                      return saveTrackResponse(id, group, data).then(() => {
                        if (this.props.activityChange) {
                          this.props.activityChange(
                            activityMapper(
                              "new_track_response",
                              linkTrack(
                                this.props.data.id,
                                this.props.data.runnerId,
                                this.props.data.name,
                                "Nueva respuesta al learning __LINK__ "
                              ),
                              linkGroup(
                                journeyId,
                                user,
                                linkTrack(
                                  this.props.data.id,
                                  this.props.data.runnerId,
                                  this.props.data.name,
                                  "ha escrito una nueva respuesta para el learning __LINK__ "
                                )
                              ),
                              this.props.group,
                              2
                            )
                          );
                        }
                        this.setState({ current: this.state.current + 1 });
                        setTimeout(() => {
                          this.componentDidMount();
                        }, 400);
                      });
                    });
                  }}
                />
              )}

              <Timeline>
                {this.state.list.map((data, index) => {
                  const { date, feedback, userId, id } = data;

                  return (
                    <Timeline.Item
                      date={date}
                      key={"timeline" + index}
                      pin={
                        <Avatar  circle display>
                          <img
                            src={data.user.image}
                            alt="Avatar image"
                            title={data.user.displayName}
                          />
                        </Avatar>
                      }
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: linkify(feedback),
                        }}
                      />
                      {user.uid === userId && (
                        <Badge
                          href="javascript:void(0)"
                          onClick={() => {
                            this.onDelete(id);
                          }}
                        >
                          Eliminar
                        </Badge>
                      )}
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
