import { Accordion, Card, Collapse, Portlet } from "@panely/components";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import Steps from "rc-steps";
import Button from "@panely/components/Button";
import TrackModal from "../../components/widgets/TrackModal";
import React, { useState } from "react";
import Badge from "@panely/components/Badge";
import Link from "next/link";
import { timeShortPowerTen } from "components/helpers/time";
import { useEffect } from "react";
import { getTracksResponseByUserId } from "consumer/track";
import ResponseModal from "./ResponseModal";
import Alert from "@panely/components/Alert";
import {
  getJourney,
  processFinish,
  processJourney,
  updateJourney,
} from "consumer/journey";
import { Spinner } from "@panely/components";
import Timeline from "@panely/components/Timeline";
import Marker from "@panely/components/Marker";

class RunnersExecutor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeCard: props.current || 0 };
  }

  toggle = (id) => {
    if (this.state.activeCard === id) {
      this.setState({ activeCard: null });
    } else {
      this.setState({ activeCard: id });
    }
  };

  render() {
    const { activeCard } = this.state;
    const {
      runners,
      journeyId,
      pathwayId,
      group,
      onComplete,
      activityChange,
      user,
      current,
    } = this.props;

    return (
      <Accordion {...this.props}>
        {runners.map((item, index) => {
          const totalTime = item.tracks
            ?.filter((t) => t.status !== null)
            ?.filter((t) => t.status !== "finish")
            ?.map((t) => t.timeLimit)
            .reduce((a, b) => a + b, 0);

          return (
            <Card key={"runnerskys" + index}>
              <Card.Header
                collapsed={!(activeCard === index)}
                onClick={() => this.toggle(index)}
              >
                <Card.Title>
                  <i
                    className={
                      "fas fa-" +
                      (current === index
                        ? "running"
                        : totalTime == 0
                        ? "check"
                        : "clock")
                    }
                  ></i>{" "}
                  {index + 1 + ". " + item.name.toUpperCase()}
                </Card.Title>
                {totalTime > 0 ? (
                  <Portlet.Addon>
                    Limite de tiempo:{" "}
                    <strong>
                      {timeShortPowerTen(totalTime)} {item.badge && "+ Quiz"}
                    </strong>
                  </Portlet.Addon>
                ) : (
                  <Portlet.Addon>
                    <strong>Finalizado</strong>
                  </Portlet.Addon>
                )}
              </Card.Header>
              <Collapse isOpen={activeCard === index}>
                <Card.Body>{item.description}</Card.Body>
                <Card.Body>
                  <Lecciones
                    onComplete={(track) => {
                      onComplete(track);
                    }}
                    user={user}
                    activityChange={activityChange}
                    group={group}
                    pathwayId={pathwayId}
                    runnerIndex={index}
                    tracks={item.tracks}
                    hasQuiz={item.quiz.length > 0}
                    runnerId={item.id}
                    journeyId={journeyId}
                    current={item.current}
                    runners={runners}
                    feedback={item.feedback}
                  />
                </Card.Body>
              </Collapse>
            </Card>
          );
        })}
      </Accordion>
    );
  }
}

class Lecciones extends React.Component {
  state = { isProcess: false, reviews: {} };
  render() {
    const {
      tracks,
      current,
      runnerId,
      runnerIndex,
      journeyId,
      runners,
      feedback,
      pathwayId,
      onComplete,
      group,
      hasQuiz,
      activityChange,
      user,
    } = this.props;

    const activeQuiz = tracks.every((track) => {
      return track.status === "finish";
    });

    if (!journeyId) {
      return <Spinner>Loading</Spinner>;
    }

    return (
      <Steps current={current} direction="vertical" index={runnerId}>
        {tracks.map((item, index) => {
          const extarnalLink = {
            pathname: "/catalog/track",
            query: {
              id: item.id,
              runnerId,
              journeyId,
              pathwayId,
            },
          };
          return (
            <Steps.Step
              key={item.id}
              index={item.id}
              status={item.status}
              className={item.status === "process" ? "bg-light p-2" : ""}
              title={
                <>
                  {(item.status === "process" || item.status === "wait") && (
                    <Badge className="mr-2">
                      {timeShortPowerTen(item.timeLimit)}
                    </Badge>
                  )}
                  <Badge className="mr-2">{item.type}</Badge>
                  {item.status !== "wait" && item.status !== "process" ? (
                    <>
                      <AttachResult
                        item={item}
                        user={user}
                        runnerId={runnerId}
                        pathwayId={pathwayId}
                        activityChange={activityChange}
                        journeyId={journeyId}
                        group={group}
                        addReview={(reviews) => {
                          const prev = this.state.reviews;
                          prev[item.id] = reviews;
                          this.setState({ ...this.state, reviews: prev });
                        }}
                      />
                      <Link href={extarnalLink} shallow>
                        {runnerIndex +
                          1 +
                          "." +
                          (index + 1) +
                          ". " +
                          item.title}
                      </Link>
                    </>
                  ) : (
                    runnerIndex + 1 + "." + (index + 1) + ". " + item.title
                  )}
                </>
              }
              description={
                <div>
                  <p>{item.subtitle}</p>
                  {this.state.reviews[item.id] && <h5>Feedback</h5>}
                  <Timeline>
                    {this.state.reviews[item.id] &&
                      this.state.reviews[item.id].map((data, index) => {
                        return (
                          <Timeline.Item
                            key={index}
                            date={new Date()}
                            pin={<Marker type="dot" />}
                          >
                            {data}
                          </Timeline.Item>
                        );
                      })}
                  </Timeline>
                  {item.status === "process" && (
                    <TrackModal
                      activityChange={activityChange}
                      runnerId={runnerId}
                      group={group}
                      runnerIndex={runnerIndex}
                      trackId={item.id}
                      trackIndex={index}
                      timeLimit={item.timeLimit}
                      time={item.time}
                      tracksLength={tracks.length}
                      extarnalLink={extarnalLink}
                      isRunning={item.isRunning || false}
                      runners={runners}
                      onComplete={() => {
                        item.runnerId = runnerId;
                        onComplete(item);
                      }}
                      journeyId={journeyId}
                    />
                  )}
                </div>
              }
            />
          );
        })}

        {current !== null && (
          <Steps.Step
            status={activeQuiz ? "process" : "wait"}
            title={"Fin de la ruta"}
            description={
              <div>
                {activeQuiz && (
                  <div dangerouslySetInnerHTML={{ __html: feedback }} />
                )}

                {hasQuiz && (
                  <>
                    <Alert variant={"label-info"}>
                      Presentar evaluación para validar conocimientos y obtener
                      el emblema.
                    </Alert>
                    <Button
                      disabled={!activeQuiz}
                      onClick={() => {
                        Router.push({
                          pathname: "/catalog/quiz",
                          query: {
                            id: journeyId,
                            runnerId: runnerId,
                          },
                        });
                      }}
                    >
                      Tomar Emblema
                    </Button>
                  </>
                )}
                {!hasQuiz && (
                  <Button
                    disabled={!activeQuiz || this.state.isProcess}
                    onClick={() => {
                      getJourney(
                        journeyId,
                        (data) => {
                          this.setState({ isProcess: true });
                          if (data.progress < 100) {
                            return updateJourney(
                              journeyId,
                              processJourney(data)
                            ).then(() => {
                              const currentRunner =
                                data.breadcrumbs[data.current - 1];
                              processFinish(
                                data,
                                user,
                                journeyId,
                                currentRunner,
                                10,
                                activityChange
                              );
                              Router.reload();
                              Router.reload();
                            });
                          } else {
                            Router.reload();
                          }
                        },
                        () => {
                          console.log("Error en processo pathway");
                        }
                      );
                    }}
                  >
                    Continuar
                  </Button>
                )}
              </div>
            }
          />
        )}
      </Steps>
    );
  }
}

const AttachResult = (props) => {
  return (
    <span className="float-left mr-1">
      {
        {
          training: <Attach {...props} />,
          hacking: <Attach {...props} />,
          questions: <Attach {...props} />,
        }[props.item.type]
      }
    </span>
  );
};

const Attach = ({
  item: { id, title, type },
  user,
  journeyId,
  group,
  runnerId,
  pathwayId,
  activityChange,
  addReview,
}) => {
  const [att, setAtt] = useState({ has: false, reviews: [] });
  const califications = {
    insufficient: "⭐️",
    regular: "⭐️⭐️",
    acceptable: "⭐️⭐️⭐️",
    good: "⭐️⭐️⭐️⭐️",
    excellent: "⭐️⭐️⭐️⭐️⭐️",
  };
  useEffect(() => {
    getTracksResponseByUserId(
      id,
      user.uid,
      (result) => {
        console.log(result.list);
        addReview(
          result.list
            .filter((resp) => {
              return resp?.review;
            })
            .map((resp) => {
              if (resp.calification) {
                return resp.review + " " + califications[resp.calification];
              }
              return resp.review;
            })
        );

        setAtt({
          has: result.list.length > 0,
        });
      },
      () => {}
    );
  }, [id, user.uid]);

  return (
    <>
      {att.has !== true ? (
        <Badge
          variant="warning"
          title="No se tiene una respuesta o feedback para esta lección. Click aquí para actualizar tu respuesta."
        >
          <ResponseModal
            id={id}
            title={title}
            group={group}
            journeyId={journeyId}
            type={type}
            user={user}
            runnerId={runnerId}
            pathwayId={pathwayId}
            activityChange={activityChange}
          >
            <FontAwesomeIcon icon={SolidIcon.faExclamationTriangle} />
          </ResponseModal>
        </Badge>
      ) : (
        <Badge
          variant="outline-success"
          title="Se completo con un feedback o respuesta. Click aquí para actualizar."
        >
          <ResponseModal
            id={id}
            title={title}
            group={group}
            journeyId={journeyId}
            type={type}
            user={user}
            runnerId={runnerId}
            pathwayId={pathwayId}
            activityChange={activityChange}
          >
            <FontAwesomeIcon icon={SolidIcon.faCheckCircle} />
          </ResponseModal>
        </Badge>
      )}
    </>
  );
};

export default RunnersExecutor;
