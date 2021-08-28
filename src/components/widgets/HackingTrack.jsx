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
import { linkify } from "components/helpers/mapper";

function SolutionForm({ onSave }) {
  const schema = yup.object().shape({
    solution: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor ingrese su solución"),
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
                placeholder="Ingrese su solución aquí"
              />
              <Label for="name">Mi Solución</Label>
              {errors.solution && (
                <Form.Feedback children={errors.solution.message} />
              )}
            </FloatLabel>
          </Form.Group>
        </Col>
        <Col sm="12">
          <Button type="submit" variant="primary">
            Responder
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
    const { data, group, journeyId } = this.props;
    const id = data.id;
    const user = firebaseClient.auth().currentUser;
    const typeContent = data?.typeContent;
    const trackName = this.props.data?.name;
    return (
      <>
        <Card>
          <Card.Header>Pautas</Card.Header>
          <Card.Body>
            <Card.Text>
              {
                {
                  file: (
                    <div
                      dangerouslySetInnerHTML={{ __html: data.guidelines }}
                    />
                  ),
                  fileCode: (
                    <div
                      dangerouslySetInnerHTML={{ __html: data.guidelines }}
                    />
                  ),
                  video: <ReactPlayer url={data.guidelines} />,
                  url: <DescribeURL url={data.guidelines} />,
                }[typeContent]
              }
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mt-3">
          <Card.Header>Criterios</Card.Header>
          <Card.Body>
            <Card.Text>
              <div dangerouslySetInnerHTML={{ __html: data.criteria }} />
            </Card.Text>
          </Card.Body>
        </Card>
        {user && (
          <Card>
            <Card.Header>
              <h3 className="mt-3">Solución</h3>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Agregue aquí su respuesta de piratería, agregue enlaces,
                repositorios o comentarios.
              </Card.Text>
              <SolutionForm
                onSave={(data) => {
                  saveTrackResponse(id, group, data).then(() => {
                    if (this.props.activityChange) {
                      const linkResume = journeyId
                        ? '<i><a href="/pathway/resume?id=' +
                          journeyId +
                          '">' +
                          user.displayName +
                          "</a></i>"
                        : "<i>" + user.displayName + "</i>";
                      this.props.activityChange({
                        type: "new_track_response",
                        msn:
                          'Respuesta de nueva Track dentro de la sala "' +
                          group +
                          '".',
                        msnForGroup:
                          "Nueva respuesta  por " +
                          linkResume +
                          " para el hacking task <b>" +
                          trackName +
                          "</b>.",
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
                  const { date, solution } = data;

                  return (
                    <Timeline.Item
                      key={"timeline" + index}
                      date={date}
                      pin={<Marker type="dot" />}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: linkify(solution),
                        }}
                      />
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

export default HackingTrack;
