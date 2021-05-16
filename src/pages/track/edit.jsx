import { Container, Row, Dropdown, Col, Portlet } from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
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
    firestoreClient
      .collection("runners")
      .doc(runnerId)
      .collection("tracks")
      .doc(trackId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({
            id: trackId,
            pathwayId,
            runnerId,
            trackId,
            saved: true,
            extend: this.state.extend,
            ...doc.data(),
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        toast.fire({
          icon: "error",
          title: "Getting a runner",
        });
      });
  }

  onEdit(data) {
    const runnersDb = firestoreClient
      .collection("runners")
      .doc(this.state.runnerId);

    return runnersDb
      .collection("tracks")
      .doc(this.state.trackId)
      .update({
        ...data,
      })
      .then((docRef) => {
        this.setState({
          pathwayId: this.state.pathwayId,
          runnerId: this.state.runnerId,
          trackId: this.state.trackId,
          extend: this.state.extend,
          ...data,
        });
        toast.fire({
          icon: "success",
          title: "Track saved successfully",
        });
        this.props.activityChange({
          pathwayId: this.state.pathwayId,
          type: "edit_track",
          msn: 'The "' + data.name + '" track was updated.',
          ...data,
        });
        return firestoreClient
          .collection("pathways")
          .doc(Router.query.pathwayId)
          .update({
            draft: true,
          });
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
      return <Spinner>Loading</Spinner>;
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
                  <Portlet.Title>Track | Edit</Portlet.Title>
                  <Portlet.Addon>
                    <TrackAddon
                      extend={this.state.extend}
                      toggle={this.toggle}
                    />
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    After creating the Pathway you must create the runners to
                    add the tracks.
                  </p>
                  <hr />
                  <TrackForm onSave={this.onEdit} data={this.state} />
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const TrackAddon = ({ extend, toggle }) => {
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
            {extend ? "Collapse":"Expand"}
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
