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
  Card,
} from "@panely/components";
import { firebaseClient } from "components/firebase/firebaseClient";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { getTracksResponses, saveTrackResponse } from "consumer/track";
import { activityMapper, linkGroup, linkify, linkTrack } from "components/helpers/mapper";
import { useState } from "react";

function SolutionForm({ onSave }) {
  const [load, setLoad] = useState(null);

  const schema = yup.object().shape({
    result: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor, ingrese su resultado aquí"),
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
                id="result"
                name="result"
                control={control}
                invalid={Boolean(errors.result)}
                placeholder="Ingrese su resultado"
              />
              <Label for="name">Mi resultado</Label>
              {errors.result && (
                <Form.Feedback children={errors.result.message} />
              )}
            </FloatLabel>
          </Form.Group>
        </Col>
        <Col sm="12">
          <Button type="submit" variant="primary" disabled={load}>
            Responder
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
    const {
      data: { training, id },
      journeyId,
      group,
    } = this.props;
    const user = this.props.user || firebaseClient.auth().currentUser;
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
                        Hecho
                      </Button>
                    </>
                  )}
                </>
              }
            />
          );
        })}
        {this.state.current === training?.length && (
          <Steps.Step
            title={"Resultado de aprendizaje"}
            description={
              <div>
                <Card.Body>
                  <Card.Text>
                    Agregue aquí su respuesta de Training, agregue enlaces,
                    repositorios o comentarios.
                  </Card.Text>

                  {user && (
                    <SolutionForm
                      onSave={(data) => {
                        return saveTrackResponse(id, group, data).then(() => {
                        
                          if (this.props.activityChange) {
                            this.props.activityChange(
                              activityMapper(
                                "new_track_response",
                                linkTrack(
                                  this.props.data.name,
                                  this.props.data.id,
                                  "Nueva respuesta al training __LINK__ "
                                ),
                                linkGroup(
                                  journeyId,
                                  user,
                                  linkTrack(
                                    this.props.data.name,
                                    this.props.data.id,
                                    "ha escrito una nueva respuesta para el training __LINK__ "
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
                          }, 500);
                        });
                      }}
                    />
                  )}

                  <Timeline>
                    {this.state.list.map((data, index) => {
                      const { date, result } = data;

                      return (
                        <Timeline.Item
                          key={"timeline" + index}
                          date={date}
                          pin={<Marker type="dot" />}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: linkify(result),
                            }}
                          />
                        </Timeline.Item>
                      );
                    })}
                  </Timeline>
                </Card.Body>
              </div>
            }
          />
        )}
      </Steps>
    );
  }
}

export default TrainingTrack;
