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
import uuid from "components/helpers/uuid";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import PathwayForm from "../../components/widgets/PathwayForm";
import Alert from "@panely/components/Alert";

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

class PathwayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      saved: false,
    };
    this.onCreate = this.onCreate.bind(this);
  }
  componentDidMount() {
    this.props.pageChangeHeaderTitle("Create Pathway");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      { text: "Pathway" },
    ]);
  }

  onCreate(data) {
    const user = firebaseClient.auth().currentUser;
    const tags = data.tags.split(",").map((item) => {
      return item.trim().toLowerCase();
    });
    return firestoreClient
      .collection("pathways")
      .doc(this.state.id)
      .set({
        ...data,
        name: data.name.toLowerCase(),
        tags: tags,
        draft: true,
        leaderId: user.uid,
        date: new Date(),
      })
      .then(() => {
        this.setState({
          id: this.state.id,
          saved: true,
          ...data,
        });
        toast.fire({
          icon: "success",
          title: "Pathway saved successfully",
        });
        this.props.activityChange({
          pathwayId: this.state.id,
          type: "new_pathway",
          msn: 'The "' + data.name + '" pathway was created.',
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
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | Create</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Pathway | Create</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    After creating the Pathway you must create the runners to
                    add the tracks.
                  </p>
                  <hr />
                  <PathwayForm
                    onSave={this.onCreate}
                    pathwayId={this.state.id}
                  />
                </Portlet.Body>
                <Portlet.Footer>
                  {this.state.saved && (
                    <Alert
                      variant="outline-info"
                      icon={<FontAwesomeIcon icon={SolidIcon.faInfoCircle} />}
                    >
                      Add the trophy or runner of the created pathway.
                      <Button
                        type="button"
                        disabled={!this.state.saved}
                        className="float-right"
                        onClick={() => {
                          Router.push({
                            pathname: "/runner/create",
                            query: { pathwayId: this.state.id },
                          });
                        }}
                      >
                        Add Runner
                        <FontAwesomeIcon
                          className="ml-2"
                          icon={SolidIcon.faPlus}
                        />
                      </Button>
                      <Button
                        type="button"
                        disabled={!this.state.saved}
                        className="float-right mr-2"
                        onClick={() => {
                          Router.push({
                            pathname: "/pathway/trophy",
                            query: { pathwayId: this.state.id },
                          });
                        }}
                      >
                        Add Trophy
                        <FontAwesomeIcon
                          className="ml-2"
                          icon={SolidIcon.faPlus}
                        />
                      </Button>
                    </Alert>
                  )}
                </Portlet.Footer>
              </Portlet>
              {/* END Portlet */}
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
)(withAuth(withLayout(PathwayPage)));
