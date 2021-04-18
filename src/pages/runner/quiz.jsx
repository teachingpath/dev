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
import BadgetForm from "./badget";
import QuizForm from "./questions";

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
    if (!Router.query.runnerId) {
      Router.push("/pathway/create");
    }
    this.state = {
      runnerId: Router.query.runnerId,
      pathwayId: Router.query.pathwayId,
      saved: false,
      questions: [],
    };
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
      { text: "Quiz" },
    ]);
    const runnersDb = firestoreClient
      .collection("runners")
      .doc(this.state.runnerId);
    runnersDb
      .get()
      .then((doc) => {
        if (doc.exists) {
          runnersDb
            .collection("questions")
            .get()
            .then((querySnapshot) => {
              const questions = [];
              querySnapshot.forEach((doc) => {
                questions.push({
                  id: doc.id,
                  ...doc.data(),
                });
              });
              return Promise.resolve(questions);
            })
            .then((questions) => {
              this.setState({
                id: this.state.runnerId,
                pathwayId: this.state.pathwayId,
                saved: true,
                questions: questions,
                ...doc.data(),
              });
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

  render() {
    if (!this.state.saved) {
      return <Spinner>Loading</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Runner | Quiz</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Runner | Quiz</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add all the questions related to this runner, these
                    questions should help validate the knowledge.
                  </p>
                  <hr />
                  <QuizForm
                    activityChange={this.props.activityChange}
                    saved={this.state.saved}
                    runnerId={this.state.runnerId}
                    pathwayId={this.state.pathwayId}
                    data={this.state.questions}
                  />
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Badget</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    This badge is awarded to the trainee if they successfully
                    complete the Quiz.{" "}
                  </p>
                  <hr />
                  <BadgetForm
                    activityChange={this.props.activityChange}
                    saved={this.state.saved}
                    runnerId={this.state.runnerId}
                    pathwayId={this.state.pathwayId}
                    data={this.state}
                  />
                  {/* END Portlet */}
                </Portlet.Body>
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
)(withAuth(withLayout(FormBasePage)));
