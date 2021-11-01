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
import { enableBadge, getJourney, updateJourney } from "consumer/journey";
import { removePoint } from "consumer/user";
import { userChange } from "store/actions/userAction";
import swalContent from "sweetalert2-react-content";
import Swal from "@panely/sweetalert2";
import {
  activityMapper,
  linkGroup,
  linkPathway,
  linkRunner,
} from "components/helpers/mapper";
import { sendFinishPathway, sendFinishRunner } from "consumer/sendemail";

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
      quizTitle: "Comprueba tu conocimiento del Runner.",
      quizSynopsis:
        "Bienvenido a la evaluación de conceptos de verificación del runner. Al aprobar este cuestionario, puede obtener el emblema del Runner. Resuelve el cuestionario en el menor tiempo posible. Con esta evaluación te permite asegurar el conocimiento, si por alguna razón te das cuenta que no puedes resolver el cuestionario, te invito a repasar los conceptos del Runner.",
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
    let tracksCompleted = data.current + 1;
    let tracksTotal = data.breadcrumbs.length;
    data.breadcrumbs.forEach((runner) => {
      if (runner.tracks) {
        runner.tracks.forEach((track) => {
          tracksTotal++;
          if (track.status === "finish" || track.status === null) {
            tracksCompleted++;
          }
        });
      }
    });
    data.progress = (tracksCompleted / tracksTotal) * 100;

    const currentRunner = data.breadcrumbs[data.current];
    currentRunner.current = null;
    currentRunner.tracks.forEach((track) => {
      track.status = null;
    });
    data.current = data.current + 1;
    try {
      data.breadcrumbs[data.current].current = 0;
      data.breadcrumbs[data.current].tracks[0].status = "process";
    } catch (e) {
      console.log("There are no more runners, complete pathway");
    }
    return this.completeQuiz(data, id, runnerId, totalPoints);
  };

  completeQuiz(data, id, runnerId, totalPoints) {
    const user = firebaseClient.auth().currentUser;
    const currentRunner = data.breadcrumbs[data.current-1];
    return enableBadge(id, runnerId, totalPoints)
      .then((doc) => {
        return updateJourney(id, data).then(() => {
          if (data.progress >= 100) {//finish pathway
            sendFinishPathway(user.email, data.name);
            this.props.activityChange(
              activityMapper(
                "complete_pathway",
                linkPathway(
                  data.id,
                  data.name,
                  "El Pathway __LINK__ está competado."
                ),
                linkGroup(
                  id,
                  user,
                  linkPathway(
                    data.id,
                    data.name,
                    "ha completado el pathway: __LINK__, su nuevo progreso es: 100%"
                  )
                ),
                data.group,
                totalPoints
              )
            );
          } else {//finshi runner
            sendFinishRunner(user.email, currentRunner.name);
            this.props.activityChange(
              activityMapper(
                "complete_quiz",
                linkRunner(
                  currentRunner.id,
                  currentRunner.name,
                  "El Runner __LINK__ está competado."
                ),
                linkGroup(
                  id,
                  user,
                  linkRunner(
                    currentRunner.id,
                    currentRunner.name,
                    "ha completado el runner: __LINK__, su nuevo progreso es: " +
                      data.progress.toFixed(2) +
                      "%"
                  )
                ),
                data.group,
                totalPoints
              )
            );
          }

          Router.push({
            pathname: "/catalog/journey",
            query: {
              id: id,
            },
          });
        });
      })
      .catch((error) => {
        toast.fire({
          icon: "error",
          title: "Se ha presentado un problema, vuelva a intentar.",
        });
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
                {this.state?.trophy?.name || "Validar runner"}
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
      <i className="fas fa-exclamation-triangle"></i> Esta evaluación de
      conceptos no se aprobó, debe intentarlo de nuevo para obtener el emblema
      del Runner y pasar el Pathway. Anímate y vuelve a intentarlo. Te
      recomendamos volver al pathway y repasar los conceptos ahí descritos.
    </p>
    <h4 className="mt-3">Result</h4>
    <div>
      <Label>
        Número de respuestas correctas:{" "}
        <strong>
          {numberOfCorrectAnswers} / {numberOfQuestions}
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
    <p>
      <i className="far fa-check-circle"></i> ¡Felicitaciones!
    </p>
    <p>
      pasó la validación de conceptos. Has conseguido {totalPoints} puntos que
      te ayudan a continuar.
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
        Finalizar
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
