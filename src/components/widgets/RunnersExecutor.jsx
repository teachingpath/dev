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
      current
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
                      "fas fa-" + (current === index ? "running" : totalTime == 0 ? "check": "clock")
                    }
                  ></i>{" "}
                  {item.name.toUpperCase()}
                </Card.Title>
                {totalTime > 0 ? (
                  <Portlet.Addon>
                    Limite de tiempo:{" "}
                    <strong>{timeShortPowerTen(totalTime)} + Quiz</strong>
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
                  <Tracks
                    onComplete={(track) => {
                      onComplete(track);
                    }}
                    user={user}
                    activityChange={activityChange}
                    group={group}
                    pathwayId={pathwayId}
                    runnerIndex={index}
                    tracks={item.tracks}
                    quiz={item.quiz}
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

class Tracks extends React.Component {
  render() {
    const {
      tracks,
      current,
      runnerId,
      runnerIndex,
      journeyId,
      runners,
      quiz,
      feedback,
      pathwayId,
      onComplete,
      group,
      activityChange,
      user,
    } = this.props;
    const activeQuiz = tracks.every((track) => {
      return track.status === "finish";
    });
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
                      />
                      <Link href={extarnalLink} shallow>{item.title}</Link>
                    </>
                  ) : (
                    item.title
                  )}
                </>
              }
              description={
                <div>
                  <p>{item.subtitle}</p>
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

        {quiz && current !== null && (
          <Steps.Step
            status={activeQuiz ? "process" : "wait"}
            title={"Preguntas de repaso"}
            description={
              <div>
                {activeQuiz && (
                  <div dangerouslySetInnerHTML={{ __html: feedback }} />
                )}
                <p>
                  Presentar Quiz para validar conocimientos y finalizar este
                  Runner.
                </p>
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
          learning: <Attach {...props} />,
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
}) => {
  const [att, setAtt] = useState(null);
  useEffect(() => {
    getTracksResponseByUserId(id,  user.uid,
      (result) => {
        setAtt(result.list.length === 0);
      },
      () => {}
    );
  }, [id, user.uid]);

  return (
    <>
      {att === true ? (
        <Badge
          variant="warning"
          shape="circle"
          title="No se tiene una respuesta o feedback para ente track. Click aquí para actualizar tu respuesta."
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
          shape="circle"
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
