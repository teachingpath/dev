import { Accordion, Card, Collapse, Portlet } from "@panely/components";

import Router from "next/router";
import Steps from "rc-steps";
import Button from "@panely/components/Button";
import TrackModal from "../../components/widgets/TrackModal";
import React from "react";
import Badge from "@panely/components/Badge";
import Link from "next/link";
import { timeShortPowerTen } from "components/helpers/time";

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
    const { runners, journeyId, pathwayId, group, onComplete, activityChange } =
      this.props;
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
                <Card.Title>{item.name.toUpperCase()}</Card.Title>
                {totalTime > 0 ? (
                  <Portlet.Addon>
                    Time limit:{" "}
                    <strong>{timeShortPowerTen(totalTime)} + Quiz</strong>
                  </Portlet.Addon>
                ) : (
                  <Portlet.Addon>
                    <strong>Finished</strong>
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
                    <Link href={extarnalLink}>{item.title}</Link>
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
            title={"Quiz"}
            description={
              <div>
                {activeQuiz && (
                  <div dangerouslySetInnerHTML={{ __html: feedback }} />
                )}
                <p>Present Quiz to validate knowledge.</p>
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
                  Take quiz
                </Button>
              </div>
            }
          />
        )}
      </Steps>
    );
  }
}

export default RunnersExecutor;
