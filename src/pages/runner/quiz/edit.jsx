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
      questionId: null,
      saved: false,
    };

    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    if (!Router.query.runnerId || !Router.query.questionId) {
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
    this.loadData(Router.query);
  }

  loadData({ pathwayId, runnerId, questionId }) {
    firestoreClient
      .collection("runners")
      .doc(runnerId)
      .collection("questions")
      .doc(questionId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({
            id: questionId,
            pathwayId,
            runnerId,
            questionId,
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
    const runnersDb = firestoreClient
      .collection("runners")
      .doc(this.state.runnerId);

    return runnersDb
      .collection("questions")
      .doc(this.state.questionId)
      .update({
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
          questionId: this.state.questionId,
          ...data,
        });
        toast.fire({
          icon: "success",
          title: "Question saved successfully",
        });
        this.props.activityChange({
          pathwayId: this.state.pathwayId,
          type: "edit_question",
          msn: 'The "' + data.question + '" question was updated.',
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.fire({
          icon: "error",
          title: "Update question",
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
          <title>Quiz | Question</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Question | Update</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add all the questions related to this runner, these
                    questions should help validate the knowledge.
                  </p>
                  <hr />
                  <QuizForm
                    onSave={this.onEdit} data={this.state}
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
