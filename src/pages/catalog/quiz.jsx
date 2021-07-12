import Quiz from "@panely/quiz";

import { Row, Col, Card, Portlet, Container, Button } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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

class QuizPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizTitle: "Comprueba tu conocimiento del Runner.",
      quizSynopsis:
        "Bienvenido al Quiz de verificación de conocimientos para el Runner. Al aprobar este Cuestionario, puede obtener el trofeo del Pathway. Resuelve el cuestionario en el menor tiempo posible.",
      questions: [],
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
      { text: "Mi Journey", link: "/catalog/journey?id=" + Router.query.id },
      { text: "Quiz" },
    ]);
    this.onLoad(Router.query);
  }

  onLoad = ({ runnerId, id }) => {
    loadQuiz(
      runnerId,
      id,
      (data) => {
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
    getJourney(
      id,
      (data) => {
        if (data.progress >= 100) {
          Router.push({
            pathname: "/catalog/journey",
            query: {
              id: id,
            },
          });
        } else {
          this.processQuiz(data, runnerId, id, totalPoints);
        }
      },
      () => {}
    );
  };

  processQuiz = (data, runnerId, id, totalPoints) => {
    const user = firebaseClient.auth().currentUser;
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
    enableBadge(id, runnerId, totalPoints)
      .then((doc) => {
        return updateJourney(id, data).then(() => {
          this.props.activityChange({
            type: "complete_quiz",
            msn: 'Runner "' + currentRunner.name + '" está completo.',
            point: totalPoints,
            msnForGroup:
              "<i>" +
              user.displayName +
              '</i> ha completado el runner <b>"' +
              currentRunner.name +
              '"</b> y su nuevo progreso es: ' +
              data.progress.toFixed(2) +
              "%",
            group: data.group,
          });

          if (data.progress >= 100) {
            this.props.activityChange({
              type: "complete_pathway",
              msn: 'Pathway "' + data.name + '" esta completo.',
              msnForGroup:
                "<i>" +
                user.displayName +
                '</i> ha complatado el pathway <b>"' +
                data.name +
                '"</b>',
              group: data.group,
            });
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
        console.error("Error adding document: ", error);
      });
  };

  renderCustomResultPage = ({
    numberOfCorrectAnswers,
    numberOfQuestions,
    totalPoints,
  }) => {
    const pass = numberOfCorrectAnswers === numberOfQuestions;

    return pass === true ? (
      <Alert
        variant={"outline-success"}
        icon={<FontAwesomeIcon icon={SolidIcon.faCheckCircle} />}
      >
       Felicitaciones, pasó el quiz. Has conseguido {totalPoints}{" "}
        puntos.
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
              this.onFinish({ ...Router.query, totalPoints });
            }}
          >
            Finalizar
          </Button>
        </p>
      </Alert>
    ) : (
      <Alert
        variant={"outline-danger"}
        icon={<FontAwesomeIcon icon={SolidIcon.faTimes} />}
      >
        El quiz no se aprobó, debe intentarlo de nuevo 
        para obtener el emblema del Runner y pasar el Pathway. 
        Anímate y vuelve a intentarlo.
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
        </p>
      </Alert>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Quiz | Teaching Path</title>
        </Head>
        <Container fluid>
          <Portlet>
            <Portlet.Header bordered>
              <Portlet.Title>
                {this.state?.trophy?.name || "Validar runner"}
              </Portlet.Title>
            </Portlet.Header>
            <Portlet.Body>
              <Row>
                <Col md="2">
                  {this.state.questions.length === 0 && <Spinner></Spinner>}
                  {this.state.trophy && (
                    <div className="m-2 text-center">
                      <img
                        className={
                          this.state.trophy.disabled
                            ? "bg-white mg-thumbnail avatar-circle p-3 border border-warning"
                            : "bg-yellow mg-thumbnail avatar-circle p-3 border border-success"
                        }
                        src={this.state.trophy.image}
                        alt="Card Image"
                      />
                      <p>{this.state.trophy.description}</p>
                    </div>
                  )}
                </Col>
                <Col md="10">
                  {this.state.questions.length > 0 && (
                    <Quiz
                      quiz={this.state}
                      showDefaultResult={false}
                      customResultPage={this.renderCustomResultPage}
                    />
                  )}
                </Col>
              </Row>
            </Portlet.Body>
          </Portlet>
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

export default connect(null, mapDispathToProps)(withLayout(QuizPage, "public"));
