import { Container, Row, Col, Portlet } from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
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
import Spinner from "@panely/components/Spinner";
import RunnerForm from "./runner";

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
    if (!Router.query.pathwayId || !Router.query.runnerId) {
      Router.push("/pathway/create");
    }
    this.state = {
      pathwayId: Router.query.pathwayId,
      runnerId: Router.query.runnerId,
      saved: false,
    };

    this.onEdit = this.onEdit.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Update Pathway");
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Pathway", link: "/" },
      {
        text: "Runner",
        link: "/runner/create?pathwayId=" + Router.query.pathwayId,
      },
      { text: "Edit" },
    ]);
    this.loadData();
  }

  loadData() {
    firestoreClient
      .collection("runners")
      .doc(this.state.runnerId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({
            id: this.state.runnerId,
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
          title: "Getting a runner",
        });
      });
  }

  onEdit(data) {
    return firestoreClient
      .collection("runners")
      .doc(this.state.runnerId)
      .update({
        ...data,
      })
      .then((docRef) => {
        this.setState({
          pathwayId: this.state.pathwayId,
          runnerId: this.state.runnerId,
          saved: true,
          ...data,
        });
        toast.fire({
          icon: "success",
          title: "Runner saved successfully",
        });
        this.props.activityChange({
          pathwayId: this.state.pathwayId,
          type: "edit_runner",
          msn: 'The "' + data.name + '" runner was updated.',
          ...data,
        });
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
    if (!this.state.saved) {
      return <Spinner>Loading</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Runner | Update</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Runner | Update</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    After creating the Pathway you must create the runners to
                    add the tracks.
                  </p>
                  <hr />
                  <RunnerForm onSave={this.onEdit} data={this.state} />
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
