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
import { addFeedback, getTracksResponses, getUser } from "consumer/user";
import Marker from "@panely/components/Marker";
import swalContent from "sweetalert2-react-content";
import Swal from "@panely/sweetalert2";
import {
  escapeHtml,
  linkify,
  linkRunner,
  linkTrack,
} from "components/helpers/mapper";
import { Form } from "@panely/components";
import Label from "@panely/components/Label";
import { sendFeedback } from "consumer/sendemail";

// Use SweetAlert React Content library
const ReactSwal = swalContent(Swal);

// Set SweetAlert options
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

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
    getJourney(
      Router.query.id,
      async (data) => {
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

        const finishTracksTitles = isCompleted
          ? tracks.length
          : tracks
              .filter((item) => item.status === "finish")
              .map((it) => it.name)
              .join(", ");

        const runnerCurrent =
          data.progress >= 100 || isCompleted
            ? "PATHWAY COMPLETADO 👍"
            : data.breadcrumbs[data.current]?.name +
              "🏃🏻(" +
              (data.current + 1) +
              "/" +
              (data.breadcrumbs.length + 1) +
              ") [Running]";

        if (isCompleted && data.progress < 100) {
          updateJourney(Router.query.id, { progress: 100 });
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
          isCompleted ? "__all__" : data.breadcrumbs[data.current]?.id,
          isCompleted ? null : data.breadcrumbs[data.current]?.name
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
          name: linkTrack(
            track.id,
            item.id,
            "[" + track.type + "] " + track.title
          ),
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
        date: data.date,
        response: data.result || data.feedback || data.answer || data.solution,
        track: trackMapper[data.trackId].name,
        trackId: data.trackId,
        id: data.id,
        userId: data.userId,
        review: data.review,
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
      runnerSelected: !runnerName
        ? ""
        : linkRunner(runnerId, runnerName, "<h3>RUNNER  __LINK__</h3>"),
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
    const { leaderUser } = this.props;
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
                  <ResumUser user={user} runnerCurrent={runnerCurrent} />
                  <hr />
                  <ResumPathway
                    list={list}
                    user={user}
                    leaderUser={leaderUser}
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

function ResumPathway({
  progress,
  waitTracks,
  dateUpdated,
  runnerList,
  finishTracksTitles,
  list,
  user,
  leaderUser,
  onFilter,
  runnerSelected,
}) {
  return (
    <Portlet>
      <Portlet.Body className="list">
        <Row>
          <Col sm="6">
            <WidgetDisplay
              body={finishTracksTitles}
              title="Lecciones finalizadas"
              className="mb-3"
            />
            <WidgetDisplay title="Ultima actualización" body={dateUpdated} />
          </Col>
          <Col sm="6">
            <TrackDisplay
              title="Lecciones en espera"
              highlight={waitTracks}
              className="mb-3"
            />
            <DisplayProgress
              title="Progreso del Pathway"
              highlight={progress + "%"}
              progress={progress}
            />
          </Col>
          <Col>
            {list && (
              <DisplayContribution
                onFilter={onFilter}
                title={"Contribuciones "}
                list={list}
                user={user}
                leaderUser={leaderUser}
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

function ResumUser({ user, runnerCurrent }) {
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

function TrackDisplay(props) {
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

function WidgetDisplay(props) {
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

function DisplayContribution(props) {
  let flatRunnerName = "";
  const {
    title,
    list,
    runnerList,
    runnerSelected,
    onFilter,
    user,
    leaderUser,
    ...attributes
  } = props;

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

              const renderTooltip = () => {
                const fecha = new Date(date);
                return (
                  "Fecha de la respuesta: " +
                  fecha.toLocaleDateString() +
                  " " +
                  fecha.toLocaleTimeString()
                );
              };

              const renderTitle = () => {
                const title = flatRunnerName !== runnerName ? runnerName : "";
                flatRunnerName = runnerName;
                return runnerSelected === "" ? (
                  <>
                    <h4>{title}</h4>
                    <span dangerouslySetInnerHTML={{ __html: track }}></span>
                  </>
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: track }}></span>
                );
              };
              return (
                <Timeline.Item
                  key={index}
                  date={date}
                  title={renderTooltip()}
                  pin={<Marker type="circle" />}
                >
                  <strong>{renderTitle()}:</strong>{" "}
                  <i
                    dangerouslySetInnerHTML={{ __html: linkify(response) }}
                  ></i>
                  <br />
                  {leaderUser.profile !== "trainee" && (
                    <Review data={data} user={user} leaderUser={leaderUser} />
                  )}
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Widget4.Display>
      </Widget4.Group>
    </Widget4>
  );
}

class Review extends React.Component {
  handleClick = () => {
    swal
      .fire({
        title: "Hacer una realimentación",
        input: "textarea",
        inputValue: this.props.data.review || "",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Enviar",
        showLoaderOnConfirm: true,
        preConfirm: (feedback) => {
          const responseId = this.props.data.id;
          return addFeedback(responseId, feedback)
            .then(() => {
              const { track, runnerName, response } = this.props.data;
              const title = escapeHtml(runnerName + "/" + track);
              const email = this.props.user.email;
              const replyTo = this.props.leaderUser.email;
              return sendFeedback(email, title, response, feedback, replyTo).then(() => {
                return "Se envio el feedback correctamente.";
              });
            })
            .catch((error) => {
              swal.showValidationMessage(`Existe un error: ${error}`);
            });
        },
        allowOutsideClick: () => !swal.isLoading(),
      })
      .then((result) => {
        if (result.value) {
          swal.fire({
            title: result.value,
          });
        }
      });
  };

  render() {
    const { review } = this.props.data;
    return (
      <Button onClick={this.handleClick}>
        Revisar
        {review && (
          <Button.Marker>
            <Marker variant="dot" variant="success" />
          </Button.Marker>
        )}
      </Button>
    );
  }
}

function DisplayProgress(props) {
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

function mapStateToProps(state) {
  return {
    leaderUser: state.user,
  };
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withAuth(withLayout(PathwayPage)));
