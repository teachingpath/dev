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
import QuizForm from "./questions";
import QuestionList from "./questionList";
import uuid from "components/helpers/uuid";

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
      {
        text: "Runner",
        link: "/runner/create?pathwayId=" + Router.query.pathwayId,
      },
      { text: "Quiz" },
    ]);
    this.setState({
      runnerId: Router.query.runnerId,
      pathwayId: Router.query.pathwayId,
    });
  }

  onCreate(data) {
    const questionId = uuid();
    const runnersDb = firestoreClient
      .collection("runners")
      .doc(this.state.runnerId);

    return runnersDb
      .collection("questions")
      .doc(questionId)
      .set({
        position: 1,
        question: data.question,
        type: data.type,
        options: data.options.map((item, index) => {
          return {
            name: item.name,
            isCorrect: data.type === 'multiple' ? item.isCorrect === true : item.isCorrect === index ,
          };
        }),
      })
      .then((docRef) => {
        this.setState({
          pathwayId: this.state.pathwayId,
          runnerId: this.state.runnerId,
          questionId: questionId,
          ...data,
        });
        toast.fire({
          icon: "success",
          title: "Question saved successfully",
        });
        this.props.activityChange({
          pathwayId: this.state.pathwayId,
          type: "new_question",
          msn: 'The "' + data.question + '" question was created.',
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.fire({
          icon: "error",
          title: "Creation question",
        });
      });
  }

  render() {
    if (!this.state.pathwayId && !this.state.runnerId) {
      return <Spinner>Loading</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Quiz | Question </title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Question | Create </Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add all the questions related to this runner, these
                    questions should help validate the knowledge.
                  </p>
                  <hr />
                  <QuizForm
                    onSave={this.onCreate}
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
                  <Portlet.Title>Questions</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <QuestionList
                    runnerId={this.state.runnerId}
                    pathwayId={this.state.pathwayId}
                    data={this.state}
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
