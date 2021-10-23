import { Container, Row, Col, Button, Portlet } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
  pageShowAlert
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import Router from "next/router";
import Spinner from "@panely/components/Spinner";
import QuizForm from "../../../components/widgets/QuestionForm";
import QuestionList from "../../../components/widgets/QuestionList";
import { createQuiz } from "consumer/runner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";


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
    this.props.pageChangeHeaderTitle("Actualizar");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      {
        text: "Pathway",
        link: "/pathway/edit?pathwayId=" + Router.query.pathwayId,
      },
      {
        text: "Runner",
        link: "/runner/edit?pathwayId=" + Router.query.pathwayId+"&runnerId="+Router.query.runnerId,
      },
      { text: "Quiz" },
    ]);
    this.setState({
      runnerId: Router.query.runnerId,
      pathwayId: Router.query.pathwayId,
    });
  }

  onCreate(data) {
    const { pageShowAlert, activityChange } = this.props;
    return createQuiz(this.state.runnerId, data)
      .then((docRef) => {
        this.setState({
          pathwayId: this.state.pathwayId,
          runnerId: this.state.runnerId,
          questionId: docRef.id,
          ...data,
        });
        pageShowAlert("La pregunta fue guardad correctamente.");
        activityChange({
          pathwayId: this.state.pathwayId,
          type: "new_question",
          msn: 'La pregunta "' + data.question + '" fue creada.',
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        pageShowAlert("Error al crear el quiz", "error");
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
            <Col md="4">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Pregunta | Nueva </Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                  Agregue todas las preguntas relacionadas con este Runner.
                     Las preguntas deberían ayudar a validar el conocimiento. <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://docs.teachingpath.info/concepts/quiz"
                    >
                      Ver más información
                    </a>{" "}
                  </p>
                  <hr />
                  <QuizForm onSave={this.onCreate} />
                </Portlet.Body>
                <Portlet.Footer>
                 
                  <Button
                    type="button"
                    className="float-right mr-2"
                    onClick={() => {
                      Router.push({
                        pathname: "/runner/badge",
                        query: {
                          runnerId: this.state.runnerId,
                          pathwayId: this.state.pathwayId,
                        },
                      });
                    }}
                  >
                    Agregar Emblema
                    <FontAwesomeIcon className="ml-2" icon={SolidIcon.faPlus} />
                  </Button> 
                </Portlet.Footer>
              </Portlet>
            </Col>

            <Col md="8">

              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Preguntas</Portlet.Title>
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
    { pageChangeHeaderTitle, breadcrumbChange, activityChange, pageShowAlert },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(FormBasePage)));
