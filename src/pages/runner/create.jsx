import {
  Container,
  Row,
  Col,
  Button,
  Portlet,
} from "@panely/components";
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
import uuid from "components/helpers/uuid";
import Router from "next/router";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import RunnerList from "./runnerList";
import RunnerForm from "./runner";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "@panely/components/Alert";
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
      saved: false,
    };

    this.onCreate = this.onCreate.bind(this);
  }

  componentDidMount() {
    if (!Router.query.pathwayId) {
      Router.push("/pathway/create");
    }
    this.props.pageChangeHeaderTitle("Update Pathway");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      {
        text: "Pathway",
        link: "/pathway/edit?pathwayId=" + Router.query.pathwayId,
      },
      { text: "Runner" },
    ]);
    this.setState({
      ...this.state,
      pathwayId: Router.query.pathwayId,
    });
  }

  onCreate(data) {
    const runnerId = uuid();
    return firestoreClient
      .collection("runners")
      .doc(runnerId)
      .set({
        level: 1,
        pathwayId: this.state.pathwayId,
        ...data,
      })
      .then((docRef) => {
        this.setState({
          pathwayId: this.state.pathwayId,
          saved: true,
          runnerId: runnerId,
          ...data,
        });
        toast.fire({
          icon: "success",
          title: "Runner saved successfully",
        });
        this.props.activityChange({
          pathwayId: this.state.pathwayId,
          type: "new_runner",
          msn: 'The "' + data.name + '" runner was created.',
          ...data,
        });

        return firestoreClient
          .collection("pathways")
          .doc(Router.query.pathwayId)
          .update({
            draft: true
          })
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
      return <Spinner>Loading</Spinner>;
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
                  <Portlet.Title>Runner | Create</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    The runners are the objectives that contain tasks or tracks
                    to achieve that objective, each objective must be created a
                    quiz.
                  </p>
                  <hr />
                  <RunnerForm onSave={this.onCreate} />
                  {/* END Portlet */}
                </Portlet.Body>
                <Portlet.Footer>
                  {this.state.saved && (
                    <Alert
                      variant="outline-info"
                      icon={<FontAwesomeIcon icon={SolidIcon.faInfoCircle} />}
                    >
                      Add the quiz or tracks of the created runner.
                      <Button
                        type="button"
                        disabled={!this.state.saved}
                        className="float-right ml-2"
                        onClick={() => {
                          Router.push({
                            pathname: "/runner/quiz",
                            query: {
                              runnerId: this.state.runnerId,
                              pathwayId: this.state.pathwayId,
                            },
                          });
                        }}
                      >
                        Add Quiz
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
                        Add Tracks
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
              {/* BEGIN Portlet */}
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
)(withAuth(withLayout(FormBasePage)));
