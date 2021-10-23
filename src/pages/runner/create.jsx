import { Container, Row, Col, Button, Portlet } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
  cleanRunner,
  pageShowAlert
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import Router from "next/router";
import RunnerList from "components/widgets/RunnerList";
import RunnerForm from "components/widgets/RunnerForm";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "@panely/components/Alert";
import Spinner from "@panely/components/Spinner";
import { create } from "consumer/runner";
import { updateToDraft } from "consumer/pathway";



class RunnerCreatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pathwayId: null,
      runnerId: null,
      saved: false,
    };

    this.onCreate = this.onCreate.bind(this);
  }

  componentDidMount() {
    const {pathwayId} = Router.query;
    if (!pathwayId) {
      Router.push("/pathway/create");
    }
    this.props.pageChangeHeaderTitle("Actualizar");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      {
        text: "Pathway",
        link: "/pathway/edit?pathwayId=" + pathwayId,
      },
      { text: "Runner" },
    ]);
    this.setState({
      ...this.state,
      pathwayId: pathwayId,
    });
    this.props.cleanRunner();

  }

  onCreate(data) {
    const pathwayId = this.state.pathwayId;
    const {pageShowAlert, activityChange}  = this.props;

    return create(pathwayId, data)
      .then((docRef) => {
        this.setState({
          pathwayId,
          saved: true,
          runnerId: docRef.id,
          ...data,
        });
        pageShowAlert("El Runner guardado correctamente");
        activityChange({
          pathwayId,
          type: "new_runner",
          msn: 'El runner "' + data.name + '" fue creado.',
        });
        return updateToDraft(pathwayId);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        pageShowAlert("Error al crear el runner", "error");
      });
      
  }

  render() {
    if (!this.state.pathwayId) {
      return <Spinner>Cargando...</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Runner | Create</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="4">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Runner | Crear</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                  Los Runners son los objetivos que contienen tareas o tracks
                     para lograr una base de conocimiento, cada Runner debe crearse un Quiz para validar conocimientos.
                      <a target="_blank" rel="noopener noreferrer" href="https://docs.teachingpath.info/concepts/runner">Ver más información</a> acerca de los runners
                  </p>
                  <hr />
                  <RunnerForm onSave={this.onCreate} />
                </Portlet.Body>
                <Portlet.Footer>
                  {this.state.saved && (
                    <Alert
                      variant="outline-info"
                      icon={<FontAwesomeIcon icon={SolidIcon.faInfoCircle} />}
                    >
                       <p>Agregue el Quiz o Track de la Runner creado.</p>
                      <Button
                        type="button"
                        disabled={!this.state.saved}
                        className="float-right ml-2"
                        onClick={() => {
                          Router.push({
                            pathname: "/runner/quiz/create",
                            query: {
                              runnerId: this.state.runnerId,
                              pathwayId: this.state.pathwayId,
                            },
                          });
                        }}
                      >
                        Agregar Quiz
                        <FontAwesomeIcon
                          className="ml-2"
                          icon={SolidIcon.faPlus}
                        />
                      </Button>
                      <Button
                        type="button"
                        disabled={!this.state.saved}
                        className="float-right"
                        onClick={() => {
                          Router.push({
                            pathname: "/track/create",
                            query: {
                              runnerId: this.state.runnerId,
                              pathwayId: this.state.pathwayId,
                            },
                          });
                        }}
                      >
                        Agregar Tracks
                        <FontAwesomeIcon
                          className="ml-2"
                          icon={SolidIcon.faPlus}
                        />
                      </Button>
                    </Alert>
                  )}
                </Portlet.Footer>
              </Portlet>
            </Col>

            <Col md="8">
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Runners</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <RunnerList
                    pathwayId={this.state.pathwayId}
                    item={this.state}
                  />
                </Portlet.Body>
              </Portlet>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange,cleanRunner, pageShowAlert},
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(RunnerCreatePage)));
