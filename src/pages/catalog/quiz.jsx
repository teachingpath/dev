import Quiz from "@panely/quiz";

import { Row, Col, Card, Portlet, Container, Button } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import Router from "next/router";
import Alert from "@panely/components/Alert";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Label from "@panely/components/Label";
import Spinner from "@panely/components/Spinner";

class QuizPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizTitle: "Check your knowledge of the runner",
      quizSynopsis:
        "Welcome to the Knowledge Verification Quiz for the Runner, by passing this Quiz you can get the pathway trophy. Solve the Quiz in the shortest time.",
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
      { text: "Catalog", link: "/catalog" },
      { text: "My Journey", link: "/catalog/journey?id=" + Router.query.id },
      { text: "Quiz" },
    ]);
    this.onLoad(Router.query);
  }

  onLoad = ({ runnerId, id }) => {
    firestoreClient
      .collection("runners")
      .doc(runnerId)
      .collection("questions")
      .get()
      .then((querySnapshot) => {
        const questions = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const type = data.type;
          let correctAnswer = null;
          const answers = data.options.map((opt) => {
            return opt.name;
          });
          data.options.forEach((opt, index) => {
            if (type === "single" && opt.isCorrect === true) {
              correctAnswer = index + 1 + "";
              return;
            }
            if (type === "multiple" && opt.isCorrect === true) {
              if (correctAnswer === null) {
                correctAnswer = [];
              }
              correctAnswer.push(index + 1);
            }
          });
          questions.push({
            question: data.question,
            questionType: "text",
            answerSelectionType: type,
            answers: answers,
            correctAnswer: correctAnswer,
            point: "2",
          });
        });
        this.setState({
          ...this.state,
          questions: questions,
        });

        return firestoreClient.collection("journeys").doc(id).get();
      })
      .then((doc) => {
        const data = doc.data();
        if (data.progress >= 100) {
          Router.push({
            pathname: "/catalog/journey",
            query: {
              id: id,
            },
          });
        } else {
          this.setState({
            ...this.state,
            trophy: data.trophy,
          });
        }
      });
  };

  onFinish = ({ runnerId, id, totalPoints }) => {
    firestoreClient
      .collection("journeys")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
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
      });
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
      console.log("There are no more runners");
    }

    firestoreClient
      .collection("journeys")
      .doc(id)
      .collection("badgets")
      .doc(runnerId)
      .update({
        disabled: false,
        date: new Date(),
        totalPoints: totalPoints,
      })
      .then((doc) => {
        //Update journey
        return firestoreClient
          .collection("journeys")
          .doc(id)
          .update(data)
          .then((docRef) => {
            this.props.activityChange({
              type: "complete_quiz",
              msn: 'Runner "' + currentRunner.name + '" completed.',
              point: totalPoints,
              msnForGroup:
                "<i>" +
                user.displayName +
                '</i> has completed runner <b>"' +
                currentRunner.name +
                '"</b> your new process is: ' +
                data.progress.toFixed(2) + '%',
              group: data.group,
            });

            if (data.progress >= 100) {
              this.props.activityChange({
                type: "complete_pathway",
                msn: 'Pathway "' + data.name + '" completed.',
                msnForGroup:
                  "<i>" +
                  user.displayName +
                  '</i> has completed pathway <b>"' +
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
        Congratulations you passed the Quiz. You have gotten {totalPoints}{" "}
        bonuses.
        <h4 className="mt-3">Result</h4>
        <div>
          <Label>
            Number of correct answers:{" "}
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
            Finish
          </Button>
        </p>
      </Alert>
    ) : (
      <Alert
        variant={"outline-danger"}
        icon={<FontAwesomeIcon icon={SolidIcon.faTimes} />}
      >
        The Quiz was not passed, you must try again in order to get the Runner's
        Badget. Cheer up and try again.
        <h4 className="mt-3">Result</h4>
        <div>
          <Label>
            Number of correct answers:{" "}
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
            Retry Quiz
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
                {this.state?.trophy?.name || "Validation runner"}
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
