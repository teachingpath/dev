import { Container, Row, Dropdown, Col, Portlet } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import Router from "next/router";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import TrackForm from "../../components/widgets/TrackForm";
import Spinner from "@panely/components/Spinner";
import { getTrack, updateTrack } from "consumer/track";
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
    this.props.pageChangeHeaderTitle("Update Pathway");
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
    this.loadData(Router.query);
  }

  loadData({ pathwayId, runnerId, trackId }) {
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
        toast.fire({
          icon: "error",
          title: "Getting a runner",
        });
      }
    );
  }

  onEdit(data) {
    const { pathwayId, runnerId, trackId, extend } = this.state;

    return updateTrack(runnerId, trackId, data)
      .then((docRef) => {
        this.setState({
          pathwayId,
          runnerId,
          trackId,
          extend,
          ...data,
        });
        toast.fire({
          icon: "success",
          title: "Track fue actualizado correctamente",
        });
        this.props.activityChange({
          pathwayId: pathwayId,
          type: "edit_track",
          msn: 'El track "' + data.name + '"  fue actualizado.',
          ...data,
        });
        return updateToDraft(pathwayId);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.fire({
          icon: "error",
          title: "Update track",
        });
      });
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
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Track | Editar</Portlet.Title>
                  <Portlet.Addon>
                    <TrackAddon
                      extend={this.state.extend}
                      toggle={this.toggle}
                      runnerId={this.state.runnerId}
                      pathwayId={this.state.pathwayId}
                      id={this.state.id}
                    />
                  </Portlet.Addon>
                </Portlet.Header>
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
    { pageChangeHeaderTitle, breadcrumbChange, activityChange },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(FormBasePage)));
