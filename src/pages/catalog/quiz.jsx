import Quiz from "@panely/quiz";

import { Row, Col, Portlet, Container, Button } from "@panely/components";
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
      quizSynopsis: "Bienvenido a la evaluación de conceptos de verificación del runner. Al aprobar este cuestionario, puede obtener el emblema del Runner. Resuelve el cuestionario en el menor tiempo posible. Con esta evaluación te permite asegurar el conocimiento, si por alguna razón te das cuenta que no puedes resolver el cuestionario, te invito a repasar los conceptos del Runner.",
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
          const linkResume = id
            ? '<i><a href="/pathway/resume?id=' + id +'">' +
              user.displayName +
              "</a></i>"
            : "<i>" + user.displayName + "</i>";

          this.props.activityChange({
            type: "complete_quiz",
            msn: 'Runner "' + currentRunner.name + '" está completo.',
            point: totalPoints,
            msnForGroup:linkResume + ' ha completado el runner <b>"' +
              currentRunner.name +   '"</b> y su nuevo progreso es: ' + 
               data.progress.toFixed(2) + "%",
            group: data.group,
          });

          if (data.progress >= 100) {
            fetch(
              "/api/sendemail/?email=" +
                user.email +
                "&template=finish-pathway&name=" +
                data.name
            ).then((res) => res.json());
            this.props.activityChange({
              type: "complete_pathway",
              msn: 'Pathway "' + data.name + '" esta completo.',
              msnForGroup:
                linkResume +
                ' ha complatado el pathway <b>"' +
                data.name +
                '"</b>',
              group: data.group,
            });
          } else {
            fetch(
              "/api/sendemail/?email=" +
                user.email +
                "&template=finish-runner&name=" +
                currentRunner.name
            ).then((res) => res.json());
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
       <i className="far fa-check-circle"></i> 
       ¡Felicitaciones!, pasó la validación de conceptos. Has conseguido {totalPoints} puntos que te ayudan a continuar.
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
       <i className="fas fa-exclamation-triangle"></i> Esta evaluación de conceptos no se aprobó, debe intentarlo de nuevo para obtener el emblema
        del Runner y pasar el Pathway. Anímate y vuelve a intentarlo. Te
        recomendamos volver al pathway y repasar los conceptos ahí descritos.
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
  };

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
              <Row>
                <Col md="2">
                  {this.state.questions.length === 0 && <Spinner></Spinner>}
                  {this.state.trophy && (
                    <div className="m-2 text-center">
                      <img
                        className={
                          this.state.trophy.disabled
                            ? "bg-white mg-thumbnail avatar-circle p-2 border border-warning"
                            : "bg-yellow mg-thumbnail avatar-circle p-2 border border-success"
                        }
                        style={{ width: "160px" }}
                        src={this.state.trophy.image}
                        alt="Card Image"
                      />
                      <br />
                      <small className="text-muted">
                        {this.state.trophy.description}
                      </small>
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

export default connect(null, mapDispathToProps)(withLayout(QuizPage));
