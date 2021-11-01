import { Container, Row, Dropdown, Col, Portlet } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
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
    this.props.pageChangeHeaderTitle("Actualizar");
    this.loadData(Router.query);
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      {
        text: "Track",
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
        pageShowAlert("Error al obtener el track", "error");
      }
    );
  }

  onEdit(data) {
    const { pathwayId, runnerId, trackId, extend } = this.state;
    const { pageShowAlert, activityChange } = this.props;

    return updateTrack(runnerId, trackId, data)
      .then((docRef) => {
        this.setState({
          pathwayId,
          runnerId,
          trackId,
          extend,
          ...data,
        });

        pageShowAlert("Track fue actualizado correctamente");

        activityChange({
          pathwayId: pathwayId,
          type: "edit_track",
          msn: 'El track "' + data.name + '"  fue actualizado.',
        });
        return updateToDraft(pathwayId);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        pageShowAlert("Error en actualizar el track", "error");
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
          text: "Runner",
          link:
            "/runner/edit?pathwayId=" +
            Router.query.pathwayId +
            "&runnerId=" +
            Router.query.runnerId,
        },
        { text: "Track" },
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
          <title>Track | Edit</title>
        </Head>
        <Container fluid={!this.state.extend}>
          <Row>
            <Col md={this.state.extend ? "12" : "6"}>
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Track | {this.state.name || "Editar"}</Portlet.Title>
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
                      Cree cada track para evaluar las competencias dentro del
                      runner.
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
            Nuevo Track
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
    </>
  );
};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange, pageShowAlert },
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
