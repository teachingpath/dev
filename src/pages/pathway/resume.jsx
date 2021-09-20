import {
  Container,
  Row,
  Col,
  Portlet,
  Progress,
  Widget4,
  Button,
  Dropdown,
} from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import Router from "next/router";
import ActivitiesComponent from "components/widgets/Activities";
import { getJourney, updateJourney } from "consumer/journey";
import { Timeline } from "@panely/components";
import { getTracksResponses } from "consumer/user";
import Marker from "@panely/components/Marker";
import { linkify } from "components/helpers/mapper";

class PathwayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Resumen",
      progress: 0,
      list: [],
      runnerList: [],
      waitTracks: 0,
      finishTracks: 0,
      dateUpdated: "--",
      runnerSelected: "",
      runnerCurrent: "--",
      user: { displayName: "--", email: "--" },
    };
    this.onFilter = this.onFilter.bind(this);
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
    this.onLoad();
  }

  onLoad = () => {
    getJourney( Router.query.id, async (data) => {
        this.props.breadcrumbChange([
          { text: "Home", link: "/" },
          { text: data.name },
        ]);
        const trackMapper = {};
        const runnerMapper = [];
        const dateUpdated = new Date(
          (data.date.seconds + data.date.nanoseconds * 10 ** -9) * 1000
        );
        const isCompleted = data.current === data.breadcrumbs.length;
        const tracks = this.getTracksByBreadcrumbs(
          data.breadcrumbs,
          data.current,
          trackMapper,
          runnerMapper
        );

        const waitTracks = tracks.filter(
          (item) => item.status === "wait"
        ).length;

        const finishTracksTitles = isCompleted ? tracks.length : tracks
          .filter((item) => item.status === "finish")
          .map((it) => it.name)
          .join(", ");

        const runnerCurrent = (data.progress >= 100 || isCompleted) ? "PATHWAY COMPLETADO 👍"
            : data.breadcrumbs[data.current]?.name +
              "🏃🏻(" +(data.current + 1) + "/" + (data.breadcrumbs.length + 1) + ") [Running]";


        if(isCompleted && data.progress < 100){
          updateJourney(Router.query.id, {progress: 100});
        } 

        const list = await this.getResponseByUserAndGroup(
          data.userId,
          data.group,
          trackMapper
        );

        this.setState({
          name: data.name,
          list: list,
          contributions: list,
          group: data.group,
          waitTracks: waitTracks,
          runnerList: runnerMapper,
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
        this.onFilter(
          isCompleted ? "__all__":data.breadcrumbs[data.current]?.id,
          isCompleted ? null :data.breadcrumbs[data.current]?.name
        );
      },
      () => {}
    );
  };

  getTracksByBreadcrumbs(
    breadcrumbs,
    runnerCurrent,
    trackMapper,
    runnerMapper
  ) {
    return breadcrumbs.flatMap((item) => {
      runnerMapper.push({
        name: item.name,
        id: item.id,
        isCurrent: breadcrumbs[runnerCurrent]?.id === item.id,
      });
      return item.tracks.map((track) => {
        trackMapper[track.id] = {
          runnerId: item.id,
          name: "[" + track.type + "] " + track.title.trim(),
          runnerName: item.name,
        };
        return {
          status: track.status,
          name: track.title.trim(),
        };
      });
    });
  }
  async getResponseByUserAndGroup(userId, group, trackMapper) {
    const response = await getTracksResponses(userId, group);
    return response.list.map((data) => {
      return {
        response: data.result || data.feedback || data.answer || data.solution,
        track: trackMapper[data.trackId].name,
        runnerName: trackMapper[data.trackId].runnerName,
        runnerId: trackMapper[data.trackId].runnerId,
      };
    });
  }

  onFilter(runnerId, runnerName) {
    const list = this.state.contributions.filter((item) => {
      return runnerId === "__all__" || item.runnerId === runnerId;
    });
    this.setState({
      ...this.state,
      list: list,
      runnerSelected: !runnerName ? "" :
        "Runner [<a href='/catalog/runner?id=" + runnerId +"'rel='noopener noreferrer' target='_blank'>" +
          runnerName +
        "</a>]",
    });
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
      runnerList,
      runnerSelected,
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
                    runnerSelected={runnerSelected}
                    onFilter={this.onFilter}
                    runnerList={runnerList}
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
  runnerList,
  finishTracksTitles,
  list,
  onFilter,
  runnerSelected,
}) {
  return (
    <Portlet>
      <Portlet.Body className="list">
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
            {list && (
              <Widget5Display
                onFilter={onFilter}
                title={"Contribuciones "}
                list={list}
                runnerSelected={runnerSelected}
                runnerList={runnerList}
              />
            )}
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
  const { title, list, runnerList, runnerSelected, onFilter, ...attributes } =
    props;

  const RunnersAddon = ({ list }) => {
    let statusRunning = false;
    return (
      <Portlet.Addon addonType="prepend">
        <Dropdown.Uncontrolled>
          <Dropdown.Toggle icon variant="text-secondary">
            <FontAwesomeIcon icon={SolidIcon.faFilter} />
          </Dropdown.Toggle>
          <Dropdown.Menu right animated>
            {list.map((item) => {
              if (statusRunning === false) {
                statusRunning = item.isCurrent === true;
              }
              return (
                <Dropdown.Item
                  onClick={() => {
                    onFilter(item.id, item.name);
                  }}
                  icon={
                    <FontAwesomeIcon
                      icon={
                        item.isCurrent === true
                          ? SolidIcon.faRunning
                          : !statusRunning
                          ? SolidIcon.faCheck
                          : null
                      }
                    />
                  }
                >
                  {item.name}
                </Dropdown.Item>
              );
            })}

            <Dropdown.Item
              onClick={() => {
                onFilter("__all__", "");
              }}
              icon={<FontAwesomeIcon icon={SolidIcon.faListAlt} />}
            >
              Ver Todos
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Uncontrolled>
      </Portlet.Addon>
    );
  };

  return (
    <Widget4 {...attributes}>
      <Widget4.Group>
        <Widget4.Display>
          <Widget4.Highlight
            children={
              <Portlet.Header className="m-0 p-0">
                <span>{title + " (" + list.length + ")"}</span>
                <RunnersAddon list={runnerList} />
              </Portlet.Header>
            }
          />
          <Widget4.Subtitle
            children={
              <span dangerouslySetInnerHTML={{ __html: runnerSelected }} />
            }
          />

          <Timeline>
            {list.map((data, index) => {
              const { date, response, track, runnerName } = data;
              const title =
                runnerSelected === "" ? "[" + runnerName + "] " + track : track;
              return (
                <Timeline.Item
                  key={index}
                  date={date}
                  pin={<Marker type="circle" />}
                >
                  <strong>{title}:</strong>{" "}
                  <i
                    dangerouslySetInnerHTML={{ __html: linkify(response) }}
                  ></i>
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
