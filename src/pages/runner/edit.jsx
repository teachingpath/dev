import {
  Button,
  Col,
  Container,
  Dropdown,
  Portlet,
  Row,
} from "@panely/components";
import {
  breadcrumbChange,
  pageChangeHeaderTitle,
  loadRunner,
  pageShowAlert,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import Router from "next/router";
import Spinner from "@panely/components/Spinner";
import RunnerForm from "../../components/widgets/RunnerForm";
import TrackList from "../../components/widgets/TrackList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { update } from "consumer/runner";
import { updateToDraft } from "consumer/pathway";

class FormBasePage extends React.Component {
  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    const { pathwayId, runnerId } = Router.query;
    if (!pathwayId || !runnerId || pathwayId === "undefined" || runnerId=="undefined") {
      Router.push("/pathway/create");
    }
    if (pathwayId === "undefined" || runnerId=="undefined") {
      Router.push("/");
    }
    this.props.pageChangeHeaderTitle("Actualizar");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      {
        text: "Pathway",
        link: "/pathway/edit?pathwayId=" + pathwayId,
      },
      {
        text: "Ruta",
        link: "/runner/create?pathwayId=" + pathwayId,
      },
      { text: "Editar" },
    ]);
  }

  onEdit(data) {
    const { runnerId, pathwayId } = this.props.runner;
    const { pageShowAlert, loadRunner } = this.props;

    return update(runnerId, data)
      .then((docRef) => {
        pageShowAlert("Ruta fue guadado correctamente");
        loadRunner({
          trackId: null,
          runnerId,
          pathwayId,
          ...data,
        });

        return updateToDraft(pathwayId);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        pageShowAlert("Error al editar la ruta", "error");
      });
  }

  render() {
    const runner = this.props.runner;
    if (!runner) {
      return <Spinner>Cargando...</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>{runner.name || "Editar"}</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="4">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title title={runner.name || "Editar"}>{runner.name || "Editar"}</Portlet.Title>
                  <Portlet.Addon>
                    <RunnerAddon
                      id={runner.runnerId}
                      pathwayId={runner.pathwayId}
                    />
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Después de crear el Pathway, debe crear las RUTAS para
                    agregue Lecciones de aprendizaje.
                  </p>
                  <hr />
                  <RunnerForm onSave={this.onEdit} data={runner} />
                </Portlet.Body>
                <Portlet.Footer>
                  <Button
                    type="button"
                    className="float-right"
                    onClick={() => {
                      Router.push({
                        pathname: "/runner/quiz/create",
                        query: {
                          runnerId: runner.runnerId,
                          pathwayId: runner.pathwayId,
                        },
                      });
                    }}
                  >
                    Agregar Quiz
                    <FontAwesomeIcon className="ml-2" icon={SolidIcon.faPlus} />
                  </Button>
                </Portlet.Footer>
              </Portlet>
            </Col>
            <Col md="8">
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Lecciones</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <TrackList
                    runnerId={runner.runnerId}
                    pathwayId={runner.pathwayId}
                    data={runner}
                  />
                </Portlet.Body>
                <Portlet.Footer>
                  <Button
                    type="button"
                    className="float-right"
                    onClick={() => {
                      Router.push({
                        pathname: "/track/create",
                        query: {
                          runnerId: runner.runnerId,
                          pathwayId: runner.pathwayId,
                        },
                      });
                    }}
                  >
                    Agrega Lecciones
                    <FontAwesomeIcon className="ml-2" icon={SolidIcon.faPlus} />
                  </Button>
                </Portlet.Footer>
              </Portlet>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const RunnerAddon = ({ id, pathwayId }) => {
  return (
    <>
      <Dropdown.Uncontrolled>
        <Dropdown.Toggle icon variant="text-secondary">
          <FontAwesomeIcon icon={SolidIcon.faEllipsisV} />
        </Dropdown.Toggle>
        <Dropdown.Menu right animated>
          <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/runner/quiz/create",
                query: {
                  runnerId: id,
                  pathwayId: pathwayId,
                },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faQuestion} />}
          >
            Agregar Quiz
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/runner/badge",
                query: {
                  runnerId: id,
                  pathwayId: pathwayId,
                },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faTrophy} />}
          >
            Agregar Emblema
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/track/create",
                query: {
                  runnerId: id,
                  pathwayId: pathwayId,
                },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faListOl} />}
          >
            Agregar Lección
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/catalog/runner",
                query: {
                  id: id,
                },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faBook} />}
          >
            Vista Previa
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
    </>
  );
};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    {
      pageChangeHeaderTitle,
      breadcrumbChange,
      loadRunner,
      pageShowAlert,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    runner: state.pathway.runnerSeleted,
  };
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withAuth(withLayout(FormBasePage)));
