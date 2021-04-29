import { Container, Row, Col, Button, Portlet } from "@panely/components";
import {
  firestoreClient,
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
   
    this.state = {
      id: null,
      saved: false,
    };

    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    if (!Router.query.pathwayId) {
      Router.push("/pathway/create");
    }
    this.props.pageChangeHeaderTitle("Update Pathway");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      { text: "Pathway" },
    ]);

    firestoreClient
      .collection("pathways")
      .doc(Router.query.pathwayId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = {
            id: Router.query.pathwayId,
            saved: true,
            ...doc.data(),
          }
          this.setState({...data});
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

    const tags = data.tags.split(",").map((item) => {
      return item.trim().toLowerCase();
    });

    return firestoreClient
      .collection("pathways")
      .doc(this.state.id)
      .update({
        ...data,
        draft: true,
        name: data.name.toLowerCase(),
        tags: tags
      })
      .then((docRef) => {
        this.setState({
          id: this.state.id,
          saved: true,
          ...data,
          name: data.name.toLowerCase(),
          tags: tags
        });
        toast.fire({
          icon: "success",
          title: "Pathway updated successfully",
        });
        this.props.activityChange({
          pathwayId: this.state.id,
          type: "edit_pathway",
          msn: 'The "' + data.name + '" pathway was changed.',
          ...data,
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
                <Portlet.Footer>
                  
                  <Button
                    type="button"
                    className="float-right mr-2"
                    onClick={() => {
                      Router.push({
                        pathname: "/pathway/trophy",
                        query: { pathwayId: this.state.id },
                      });
                    }}
                  >
                    Add Trophy
                    <FontAwesomeIcon className="ml-2" icon={SolidIcon.faPlus} />
                  </Button>
                </Portlet.Footer>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
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
