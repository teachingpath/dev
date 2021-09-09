import {
  Container,
  Row,
  Col,
  Portlet,
  Progress,
  Widget4,
  Button,
} from "@panely/components";

import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import Router from "next/router";
import ActivitiesComponent from "components/widgets/Activities";
import { getJourney } from "consumer/journey";
import { Timeline } from "@panely/components";
import { getTracksResponses } from "consumer/user";
import Marker from "@panely/components/Marker";

class PathwayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Resumen",
      progress: 0,
      list: [],
      waitTracks: 0,
      finishTracks: 0,
      dateUpdated: "--",
      runnerCurrent: "--",
      user: { displayName: "--", email: "--" },
    };
  }
  componentDidMount() {
    if (!Router.query.id) {
      Router.push("/");
    }
    this.props.pageChangeHeaderTitle("Journey");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      { text: "Resumen" },
    ]);

    getJourney(
      Router.query.id,
      async (data) => {
        this.props.breadcrumbChange([
          { text: "Home", link: "/" },
          { text: data.name },
        ]);
        const trackMapper = {};
        const dateUpdated = new Date(
          (data.date.seconds + data.date.nanoseconds * 10 ** -9) * 1000
        );

        const tracks = data.breadcrumbs.flatMap((item) =>
          item.tracks.map((track) => {
            trackMapper[track.id] = "["+item.name + "] "+track.title.trim();
            return {
              status: track.status,
              name: track.title.trim(),
            };
          })
        );

        const waitTracks = tracks.filter(
          (item) => item.status === "wait"
        ).length;

        const finishTracksTitles = tracks
          .filter((item) => item.status === "finish")
          .map((it) => it.name)
          .join(", ");
        const runnerCurrent =
          data.progress >= 100
            ? "Pathway completado"
            : data.breadcrumbs[data.current].name +
              " (" +
              (data.current + 1) +
              "/" +
              (data.breadcrumbs.length + 1) +
              ") [Running]";

        const response = await getTracksResponses(data.userId, data.group);

        this.setState({
          name: data.name,
          list: response.list.map(
            (data) => {
              return {
                response: data.result || data.feedback || data.answer || data.solution,
                track: trackMapper[data.trackId],
              };
            }
          ),
          group: data.group,
          waitTracks: waitTracks,
          finishTracksTitles: finishTracksTitles,
          user: data.user,
          userId: data.userId,
          pathwayId: Router.query.pathwayId,
          journeyId: Router.query.id,
          runnerCurrent: runnerCurrent,
          progress: data.progress.toFixed(2),
          dateUpdated:
            dateUpdated.toLocaleDateString() +
            " " +
            dateUpdated.toLocaleTimeString(),
        });
      },
      () => {}
    );
  }

  render() {
    const {
      name,
      progress,
      waitTracks,
      dateUpdated,
      finishTracksTitles,
      user,
      runnerCurrent,
      userId,
      group,
      pathwayId,
      journeyId,
      list,
    } = this.state;
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | {name}</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="8">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Pathway | {name}</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Widget6Component user={user} runnerCurrent={runnerCurrent} />
                  <hr />
                  <Widget7Component
                    list={list}
                    progress={progress}
                    waitTracks={waitTracks}
                    dateUpdated={dateUpdated}
                    finishTracksTitles={finishTracksTitles}
                  />
                </Portlet.Body>
                {pathwayId && (
                  <Portlet.Footer>
                    <Button
                      onClick={() => {
                        Router.push({
                          pathname: "/catalog/journey",
                          query: {
                            id: journeyId,
                          },
                        });
                      }}
                    >
                      Ir al Journey
                    </Button>
                  </Portlet.Footer>
                )}
              </Portlet>
            </Col>
            <Col md="4">
              {userId && (
                <ActivitiesComponent
                  filterByGroup={group}
                  firebase={{
                    user_id: userId,
                  }}
                />
              )}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

function Widget7Component({
  progress,
  waitTracks,
  dateUpdated,
  finishTracksTitles,
  list,
}) {
  return (
    <Portlet>
      <Portlet.Body>
        <Row>
          <Col sm="6">
            <Widget6Display
              body={finishTracksTitles}
              title="Tracks finalizados"
              className="mb-3"
            />
            <Widget6Display title="Ultima actualización" body={dateUpdated} />
          </Col>
          <Col sm="6">
            <Widget7Display
              title="Tracks en espera"
              highlight={waitTracks}
              className="mb-3"
            />
            <Widget7Progress
              title="Progreso del Pathway"
              highlight={progress + "%"}
              progress={progress}
            />
          </Col>
          <Col>
            {list && <Widget5Display
             title="Contribuciones" 
             list={list} />}
          </Col>
        </Row>
      </Portlet.Body>
    </Portlet>
  );
}

function Widget6Component({ user, runnerCurrent }) {
  return (
    <>
      <Widget4>
        <Widget4.Group>
          <Widget4.Display>
            <Widget4.Title children={user.displayName} />
            <Widget4.Subtitle children={user.email} />
            <Widget4.Subtitle children={<strong>{runnerCurrent}</strong>} />
          </Widget4.Display>
          <Widget4.Addon>
            <Widget4.Highlight className={`text-info`} children={""} />
          </Widget4.Addon>
        </Widget4.Group>
      </Widget4>
    </>
  );
}

function Widget7Display(props) {
  const { title, highlight, ...attributes } = props;

  return (
    <Widget4 {...attributes}>
      <Widget4.Group>
        <Widget4.Display>
          <Widget4.Subtitle children={title} />
          <Widget4.Highlight children={highlight} />
        </Widget4.Display>
      </Widget4.Group>
    </Widget4>
  );
}

function Widget6Display(props) {
  const { title, body, ...attributes } = props;

  return (
    <Widget4 {...attributes}>
      <Widget4.Group>
        <Widget4.Display>
          <Widget4.Highlight children={title} />
          <Widget4.Subtitle children={body} />
        </Widget4.Display>
      </Widget4.Group>
    </Widget4>
  );
}

function Widget5Display(props) {
  const { title, list, ...attributes } = props;

  return (
    <Widget4 {...attributes}>
      <Widget4.Group>
        <Widget4.Display>
          <Widget4.Highlight children={title+" ("+list.length+")"} />
          <Timeline>
            {list.map((data, index) => {
              const { date, response, track } = data;

              return (
                <Timeline.Item
                  key={index}
                  date={date}
                  pin={<Marker type="circle" />}
                >
                  <strong>{track}:</strong> <i>{response}</i>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Widget4.Display>
      </Widget4.Group>
    </Widget4>
  );
}

function Widget7Progress(props) {
  const { title, highlight, progress, ...attributes } = props;

  return (
    <Widget4 {...attributes}>
      <Widget4.Group>
        <Widget4.Display>
          <Widget4.Subtitle children={title} />
        </Widget4.Display>
        <Widget4.Addon>
          <Widget4.Subtitle children={highlight} />
        </Widget4.Addon>
      </Widget4.Group>
      <Progress value={progress} variant="primary" />
    </Widget4>
  );
}

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(PathwayPage)));
