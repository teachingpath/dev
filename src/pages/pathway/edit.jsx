import { Container, Row, Col, Button, Portlet } from "@panely/components";
import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import RunnerList from "../runner/runnerList";
import TrophyForm from "./trophy";
import PathwayForm from "./pathway";
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
    if (!Router.query.pathwayId) {
      Router.push("/pathway/create");
    } else {
      this.state = {
        id: Router.query.pathwayId,
        saved: false,
      };

      this.onEdit = this.onEdit.bind(this);
    }
  }

  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Update Pathway");
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Pathway", link: "/" },
      { text: "Update" },
    ]);

    firestoreClient
      .collection("pathways")
      .doc(this.state.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({
            id: this.state.id,
            saved: true,
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
          title: "Getting a pathway",
        });
      });
  }

  onEdit(data) {
    firestoreClient
      .collection("pathways")
      .doc(this.state.id)
      .update({
        ...data
      })
      .then((docRef) => {
        this.setState({
          id: this.state.id,
          saved: true,
          ...data,
        });
        toast.fire({
          icon: "success",
          title: "Pathway updated successfully",
        });
        this.props.activityChange({
          pathwayId: this.state.id,
          type: "edit_pathway",
          msn: "The \""+data.name+"\" pathway was changed.",
          ...data
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.fire({
          icon: "error",
          title: "Creation pathway",
        });
      });
  }

  render() {
    if (!this.state.saved) {
      return <Spinner>Loading</Spinner>;
    }

    return (
      <React.Fragment>
        <Head>
          <title>Pathway | Edit</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Pathway | Edit</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <PathwayForm
                    onSave={this.onEdit}
                    pathwayId={this.state.id}
                    saved={this.state.saved}
                    data={this.state}
                  />
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Trophy</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <TrophyForm
                    activityChange={this.props.activityChange}
                    pathwayId={this.state.id}
                    data={this.state.trophy}
                    saved={this.state.saved}
                  />
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Runners</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <RunnerList pathwayId={this.state.id} />
                </Portlet.Body>
                <Portlet.Footer>
                  <Button
                    type="button"
                    disabled={!this.state.saved}
                    onClick={() => {
                      Router.push({
                        pathname: "/runner/create",
                        query: { pathwayId: this.state.id },
                      });
                    }}
                  >
                    Add Runner
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
