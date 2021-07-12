import { Container, Row, Col, Button, Portlet } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import Router from "next/router";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import RunnerList from "components/widgets/RunnerList";
import RunnerForm from "components/widgets/RunnerForm";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "@panely/components/Alert";
import Spinner from "@panely/components/Spinner";
import { create } from "consumer/runner";
import { updateToDraft } from "consumer/pathway";

const ReactSwal = swalContent(Swal);
const toast = ReactSwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", ReactSwal.stopTimer);
    toast.addEventListener("mouseleave", ReactSwal.resumeTimer);
  },
});

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
    this.props.pageChangeHeaderTitle("Update Pathway");
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
  }

  onCreate(data) {
    const pathwayId = this.state.pathwayId;
    return create(pathwayId, data)
      .then((docRef) => {
        this.setState({
          pathwayId,
          saved: true,
          runnerId: docRef.id,
          ...data,
        });
        toast.fire({
          icon: "success",
          title: "El Runner guardado correctamente",
        });
        this.props.activityChange({
          pathwayId,
          type: "new_runner",
          msn: 'El runner "' + data.name + '" fue creado.',
        });
        return updateToDraft(pathwayId);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.fire({
          icon: "error",
          title: "Creation runner",
        });
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
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Runner | Crear</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                  Los Runners son los objetivos que contienen tareas o tracks
                     para lograr una base de conocimiento, cada Runner debe crearse un Quiz para validar conocimientos.
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
                       Agregue el Quiz o Track de la Runner creado.
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

            <Col md="6">
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
    { pageChangeHeaderTitle, breadcrumbChange, activityChange },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(RunnerCreatePage)));
