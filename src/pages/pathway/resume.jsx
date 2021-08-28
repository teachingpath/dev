import {
  Container,
  Row,
  Col,
  Portlet,
  Progress,
  Widget4,
  Button
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

class PathwayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Resumen",
      progress: 0,
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
      (data) => {
        this.props.breadcrumbChange([
          { text: "Home", link: "/" },
          { text: data.name },
        ]);
        const dateUpdated = new Date(
          (data.date.seconds + data.date.nanoseconds * 10 ** -9) * 1000
        );

        const tracks = data.breadcrumbs.flatMap((item) =>
          item.tracks.map((track) => track.status)
        );

        const waitTracks = tracks.filter((item) => item === "wait").length;
        const finishTracks = tracks.filter((item) => item === "finish").length;

        const runnerCurrent =
          data.progress >= 100
            ? "Pathway completado"
            : data.breadcrumbs[data.current].name +
              " (" +
              (data.current + 1) +
              "/" +
              (data.breadcrumbs.length + 1) +
              ") [Running]";

        this.setState({
          name: data.name,
          group: data.group,
          waitTracks: waitTracks,
          finishTracks: finishTracks,
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
      finishTracks,
      user,
      runnerCurrent,
      userId,
      group,
      pathwayId,
      journeyId
    } = this.state;
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | {name}</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Pathway | {name}</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Widget6Component user={user} runnerCurrent={runnerCurrent} />
                  <hr />
                  <Widget7Component
                    progress={progress}
                    waitTracks={waitTracks}
                    dateUpdated={dateUpdated}
                    finishTracks={finishTracks}
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
            <Col md="6">
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

function Widget7Component({ progress, waitTracks, dateUpdated, finishTracks }) {
  return (
    <Portlet>
      <Portlet.Body>
        <Row>
          <Col sm="6">
            <Widget7Display
              title="Tracks Finalizados"
              highlight={finishTracks}
              className="mb-3"
            />
            <Widget7Display
              title="Ultima actualización"
              highlight={dateUpdated}
            />
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
