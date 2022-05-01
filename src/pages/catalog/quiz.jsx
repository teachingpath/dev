import Quiz from "@panely/quiz";

import { Row, Col, Portlet, Container, Button } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withAuth from "components/firebase/firebaseWithAuth";
import { firebaseClient } from "components/firebase/firebaseClient";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import Router from "next/router";
import Alert from "@panely/components/Alert";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Label from "@panely/components/Label";
import Spinner from "@panely/components/Spinner";
import { loadQuiz } from "consumer/evaluation";
import { enableBadge, getJourney, processFinish, processJourney, updateJourney } from "consumer/journey";
import { removePoint } from "consumer/user";
import { userChange } from "store/actions/userAction";
import swalContent from "sweetalert2-react-content";
import Swal from "@panely/sweetalert2";


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

class QuizPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizTitle: "Comprueba tu conocimiento de la Ruta.",
      quizSynopsis:
        "Bienvenido a la evaluación de conceptos de verificación de la ruta. Al aprobar este quiz, puede reclamar el emblema de la RUTA. Responda el quiz en el menor tiempo posible. Con esta evaluación te permite asegurar el conocimiento, si por alguna razón te das cuenta que no puedes resolver el quiz, te invito a repasar los conceptos previos. IMPORTANTE, para presentar el quiz debes canjear puntos de tu bolsa de puntos. ¡Muchas suerte en tu evaluación!",
      questions: [],
      start: false,
      loading: false,
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    if (!Router.query.id) {
      Router.push("/catalog");
    }
    this.props.pageChangeHeaderTitle("Pathway");
    this.props.breadcrumbChange([
      { text: "Catálogo", link: "/catalog" },
      { text: "Journey", link: "/catalog/journey?id=" + Router.query.id },
      { text: "Quiz" },
    ]);
    this.onLoad(Router.query);
  }

  onLoad = ({ runnerId, id }) => {
    loadQuiz(runnerId, id, (data) => {
        this.setState({
          ...this.state,
          ...data,
        });
      },
      () => {
        Router.push({
          pathname: "/catalog/journey",
          query: {
            id: id,
          },
        });
      }
    );
  };

  onFinish = ({ runnerId, id, totalPoints }) => {
    toast.fire({
      icon: "success",
      title: "Haz finalizado tu quiz, espere un momento...",
    });
    this.setState({
      ...this.state,
      loading: true,
    });
    getJourney(id, (data) => {
        if (data.progress >= 100) {
          Router.push({
            pathname: "/catalog/journey",
            query: {
              id: id,
            },
          });
        } else {
          this.processQuiz(data, runnerId, id, totalPoints).then(() => {
            this.setState({
              ...this.state,
              loading: false,
            });
          });
        }
      },
      () => {
        toast.fire({
          icon: "error",
          title: "Se ha presentado un problema, vuelva a intentar.",
        });
      }
    );
  };

  processQuiz = (data, runnerId, id, totalPoints) => {
    return this.completeQuiz(processJourney(data), id, runnerId, totalPoints);
  };

  completeQuiz(data, id, runnerId, totalPoints) {
    const user = firebaseClient.auth().currentUser;
    const currentRunner = data.breadcrumbs[data.current-1];
    return enableBadge(id, runnerId, totalPoints)
      .then((doc) => {
        return updateJourney(id, data).then(() => {
          processFinish(data, user, id, currentRunner, totalPoints, this.props.activityChange);
          Router.push({
            pathname: "/catalog/journey",
            query: {
              id: id,
            },
          });
        });
      })
      .catch((error) => {
        if(error.message.startsWith("No document to update:")){
          toast.fire({
            icon: "success",
            title: "Este pathway no tiene emblema, pero puede continuar.",
          });
          return updateJourney(id, data).then(() => {
            processFinish(data, user, id, currentRunner, totalPoints, this.props.activityChange);
            Router.push({
              pathname: "/catalog/journey",
              query: {
                id: id,
              },
            });
          });
        } else {
          toast.fire({
            icon: "error",
            title: "Se ha presentado un problema, vuelva a intentar.",
          });
        }
      
      });
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Evaluación de conceptos | Teaching Path</title>
        </Head>
        <Container fluid>
          <Portlet>
            <Portlet.Header bordered>
              <Portlet.Title>
                {this.state?.trophy?.name || "Cargando evaluación..."}
              </Portlet.Title>
            </Portlet.Header>
            <Portlet.Body>
              {this.state.loading && <Spinner></Spinner>}
              {this.state.loading === false && (
                <>
                  {this.state.questions.length === 0 && <Spinner></Spinner>}
                  {this.state.questions.length > 0 && (
                    <>
                      {!this.state.start && (
                        <Alert variant={"label-info"}>
                          ESTE QUIZ TIENE UN CAJE DE{" "}
                          <strong>{this.state.questions.length * 2} PTS</strong>{" "}
                          AL INICIAR EL QUIZ
                        </Alert>
                      )}

                      <Quiz
                        quiz={this.state}
                        onStart={() => {
                          const userId = this.props.user.uid;
                          const point = this.state.questions.length * 2;
                          removePoint(userId, point).then(() => {
                            this.props.userChange({
                              ...this.props.user,
                              point:
                                this.props.user.point -
                                this.state.questions.length * 2,
                            });
                            this.setState({
                              ...this.state,
                              start: true,
                            });
                          });
                        }}
                        showDefaultResult={false}
                        customResultPage={(props) => (
                          <RenderCustomResultPage
                            {...props}
                            onFinish={this.onFinish}
                          />
                        )}
                      />
                    </>
                  )}
                </>
              )}
            </Portlet.Body>
          </Portlet>
        </Container>
      </React.Fragment>
    );
  }
}

const RenderCustomResultPage = (props) => {
  const pass = props.numberOfCorrectAnswers === props.numberOfQuestions;
  return pass === true ? <QuizSuccess {...props} /> : <QuizFail {...props} />;
};

const QuizFail = ({ numberOfCorrectAnswers, numberOfQuestions }) => (
  <Alert
    variant={"outline-danger"}
    icon={<FontAwesomeIcon icon={SolidIcon.faTimes} />}
  >
    <p>
      <i className="fas fa-exclamation-triangle"></i> Está evaluación de
      conceptos no se aprobó, debe intentarlo de nuevo para obtener el emblema
      de la ruta y pasar el Pathway. Anímate y vuelve a intentarlo. Te
      recomendamos volver al pathway y repasar los conceptos allí descritos.
    </p>
    <h4 className="mt-3">RESULTADO</h4>
    <div>
      <Label>
        Número de respuestas correctas:{" "}
        <strong>
          {numberOfCorrectAnswers}/{numberOfQuestions}
        </strong>
      </Label>
    </div>
    <p>
      <Button
        onClick={() => {
          Router.reload();
        }}
      >
        Repetir Quiz
      </Button>
      <Button
        onClick={() => {
          Router.back();
        }}
      >
        Volver al Pathway
      </Button>
    </p>
  </Alert>
);

const QuizSuccess = ({
  totalPoints,
  numberOfCorrectAnswers,
  numberOfQuestions,
  onFinish,
}) => (
  <Alert
    variant={"outline-success"}
    icon={<FontAwesomeIcon icon={SolidIcon.faCheckCircle} />}
  >
    <h4>
      <i className="far fa-check-circle"></i> ¡Felicitaciones! lo hiciste 👍 
    </h4>
    <p>
      Pasó la validación de conceptos. Has conseguido {totalPoints} puntos FELICIDADES.<br />Ahora puedes continuar con la siguiente ruta o finalizar el pathway.
    </p>
    <h4 className="mt-3">Resultado</h4>
    <div>
      <Label>
        Número de respuestas correctas:{" "}
        <strong>
          {numberOfCorrectAnswers}/{numberOfQuestions}
        </strong>
      </Label>
    </div>
    <p>
      <Button
        onClick={() => {
          onFinish({ ...Router.query, totalPoints });
        }}
      >
        Tomar el emblema 
      </Button>
    </p>
  </Alert>
);

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange, userChange },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withAuth(withLayout(QuizPage)));
