import { Container, Row, Col, Portlet } from "@panely/components";
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
import QuizForm from "../../../components/widgets/QuestionForm";
import { getQuiz, updateQuiz } from "consumer/runner";

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
    return getQuiz(
      pathwayId,
      runnerId,
      questionId,
      (data) => {
        this.setState(data);
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
    const { pathwayId, runnerId, questionId } = this.state;
    return updateQuiz(runnerId, questionId, data)
      .then((docRef) => {
        this.setState({
          pathwayId,
          runnerId,
          questionId,
          ...data,
        });
        toast.fire({
          icon: "success",
          title: "La pregunta fue actualizada correctamente",
        });
        this.props.activityChange({
          pathwayId: pathwayId,
          type: "edit_question",
          msn: 'La pregunta "' + data.question + '" fue actualizada.',
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
                  <Portlet.Title>Pregunta | Editar</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                  Agregue todas las preguntas relacionadas con este corredor, estas
                     Las preguntas deberían ayudar a validar el conocimiento.
                  </p>
                  <hr />
                  <QuizForm onSave={this.onEdit} data={this.state} />
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
