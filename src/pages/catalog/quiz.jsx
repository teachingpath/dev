import Quiz from "@panely/quiz";

import { Row, Col, Card, Portlet, Container, Button } from "@panely/components";
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreClient } from "components/firebase/firebaseClient";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import Router from "next/router";
import Alert from "@panely/components/Alert";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Label from "@panely/components/Label";

class QuizPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizTitle: "Check your knowledge of the runner",
      quizSynopsis:
        "Welcome to the Knowledge Verification Quiz for the Runner, by passing this Quiz you can get the pathway trophy. Solve the Quiz in the shortest time.",
      questions: [],
    };
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

    firestoreClient
      .collection("runners")
      .doc(Router.query.runnerId)
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
            if (type == "single" && opt.isCorrect === true) {
              correctAnswer = index + 1 + "";
              return;
            }
            if (type == "multiple" && opt.isCorrect === true) {
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
            point: "10",
          });
        });
        this.setState({
          ...this.state,
          questions: questions,
        });
        console.log(questions);
      });
  }

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
              firestoreClient
                .collection("journeys")
                .doc(Router.query.id)
                .get()
                .then((doc) => {
                  const data = doc.data();
                  if (data.progress >= 100) {
                    Router.push({
                      pathname: "/catalog/journey",
                      query: {
                        id: Router.query.id,
                      },
                    });
                  } else {
                    let tracksCompleted = 1;
                    let tracksTotal = data.breadcrumbs.length;
                    data.breadcrumbs.forEach((runner) => {
                      if (runner.tracks) {
                        runner.tracks.forEach((track) => {
                          tracksTotal++;
                          if (track.status === "finish") {
                            tracksCompleted++;
                          }
                        });
                      }
                    });
                    data.progress = (tracksCompleted / tracksTotal) * 100;
                    data.current = data.current + 1;

                    firestoreClient
                      .collection("journeys")
                      .doc(Router.query.id)
                      .collection("badgets")
                      .doc(Router.query.runnerId)
                      .update({
                        disabled: false,
                        date: new Date(),
                      })
                      .then((doc) => {
                        return firestoreClient
                          .collection("journeys")
                          .doc(Router.query.id)
                          .update(data)
                          .then((docRef) => {
                            Router.push({
                              pathname: "/catalog/journey",
                              query: {
                                id: Router.query.id,
                              },
                            });
                          });
                      })
                      .catch((error) => {
                        console.error("Error adding document: ", error);
                      });
                  }
                });
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
          <Row>
            <Col md="12">
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Validation runner</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {this.state.questions.length > 0 && (
                    <Quiz
                      quiz={this.state}
                      showDefaultResult={false}
                      customResultPage={this.renderCustomResultPage}
                    />
                  )}
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
    { pageChangeHeaderTitle, breadcrumbChange },
    dispatch
  );
}

export default connect(null, mapDispathToProps)(withLayout(QuizPage, "public"));
