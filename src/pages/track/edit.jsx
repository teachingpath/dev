import { Container, Row, Dropdown, Col, Portlet } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  pageShowAlert,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import Router from "next/router";
import TrackForm from "components/widgets/TrackForm";
import Spinner from "@panely/components/Spinner";
import { getTrack, updateTrack } from "consumer/track";
import { updateToDraft } from "consumer/pathway";


class FormBasePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pathwayId: null,
      runnerId: null,
      trackId: null,
      saved: false,
      extend: true,
    };

    this.onEdit = this.onEdit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    if (!Router.query.runnerId || !Router.query.trackId) {
      Router.push("/pathway/create");
    }
    if (Router.query.runnerId === "undefined" || Router.query.trackId === "undefined") {
      Router.push("/");
    }
    this.props.pageChangeHeaderTitle("Actualizar");
    this.loadData(Router.query);
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      {
        text: "Lección",
        link:
          "/catalog/track?pathwayId=" +
          Router.query.pathwayId +
          "&runnerId=" +
          Router.query.runnerId +
          "&id=" +
          Router.query.trackId,
      },
    ]);
  }

  loadData({ pathwayId, runnerId, trackId }) {
    const { pageShowAlert } = this.props;
    return getTrack(
      pathwayId,
      runnerId,
      trackId,
      (data) => {
        this.setState({
          ...data,
          extend: this.state.extend,
        });
      },
      () => {
        pageShowAlert("Error al obtener La lección", "error");
      }
    );
  }

  onEdit(data) {
    const { pathwayId, runnerId, trackId, extend } = this.state;
    const { pageShowAlert } = this.props;

    return updateTrack(runnerId, trackId, data)
      .then((docRef) => {
        this.setState({
          pathwayId,
          runnerId,
          trackId,
          extend,
          ...data,
        });

        pageShowAlert("Lección fue actualizado correctamente");
        return updateToDraft(pathwayId);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        pageShowAlert("Error en actualizar La lección", "error");
      });
  }

  componentDidUpdate(props) {
    if (props.isOwner) {
      this.props.breadcrumbChange([
        { text: "Home", link: "/" },
        {
          text: "Pathway",
          link: "/pathway/edit?pathwayId=" + Router.query.pathwayId,
        },
        {
          text: "Ruta",
          link:
            "/runner/edit?pathwayId=" +
            Router.query.pathwayId +
            "&runnerId=" +
            Router.query.runnerId,
        },
        { text: "Lección" },
      ]);
    }
  }

  toggle() {
    this.setState({
      ...this.state,
      extend: !this.state.extend,
    });
  }

  render() {
    if (!this.state.saved) {
      return <Spinner>Cargando...</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Lección | Edit</title>
        </Head>
        <Container fluid={!this.state.extend}>
          <Row>
            <Col md={this.state.extend ? "12" : "6"}>
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Lección | {this.state.name || "Editar"}</Portlet.Title>
                  {this.props.isOwner && (
                    <Portlet.Addon>
                      <TrackAddon
                        extend={this.state.extend}
                        toggle={this.toggle}
                        runnerId={this.state.runnerId}
                        pathwayId={this.state.pathwayId}
                        id={this.state.id}
                      />
                    </Portlet.Addon>
                  )}
                </Portlet.Header>

                <>
                  <Portlet.Body>
                    <p>
                      Cree cada lección para evaluar las competencias dentro de la
                      ruta.
                    </p>
                    <hr />
                    <TrackForm
                      onSave={this.onEdit}
                      data={this.state}
                      onExtend={() => {
                        if (!this.state.extend) {
                          this.toggle();
                        }
                      }}
                    />
                  </Portlet.Body>
                </>
              </Portlet>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const TrackAddon = ({ extend, toggle, runnerId, id, pathwayId }) => {
  return (
    <>
      <Dropdown.Uncontrolled>
        <Dropdown.Toggle icon variant="text-secondary">
          <FontAwesomeIcon icon={SolidIcon.faEllipsisV} />
        </Dropdown.Toggle>
        <Dropdown.Menu right animated>
          <Dropdown.Item
            onClick={toggle}
            icon={<FontAwesomeIcon icon={SolidIcon.faExpand} />}
          >
            {extend ? "Colapsar" : "Expandir"}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/catalog/track",
                query: {
                  id: id,
                  runnerId: runnerId,
                  pathwayId: pathwayId,
                },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faBook} />}
          >
            Vista Previa
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/track/create",
                query: {
                  runnerId: runnerId,
                  pathwayId: pathwayId,
                },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faListOl} />}
          >
            Nuevo Lección
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
    </>
  );
};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, pageShowAlert },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    pathway: state.pathway.pathwaySeleted,
    runner: state.pathway.runnerSeleted,
    user: state.user,
    isOwner: state.pathway.runnerSeleted?.leaderId === state.user?.uid,
  };
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withAuth(withLayout(FormBasePage)));
