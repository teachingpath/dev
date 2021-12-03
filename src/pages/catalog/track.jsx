import {
  Row,
  Col,
  Portlet,
  Container,
  Spinner,
  Button,
  DemoWrapper,
} from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
  asideToggle,
  pageShowAlert,
} from "store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TrackContent from "components/widgets/TrackContent";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import Router from "next/router";
import Aside from "components/layout/part/Aside";
import { getTrack, getTracks } from "consumer/track";
import { getRunners } from "consumer/runner";
import { Widget1 } from "@panely/components";
import PathwayResume from "components/widgets/PathwayResume";
import Badge from "../../../docs/template/src/modules/components/Badge";
import { timePowerTen, timeShortConvert } from "components/helpers/time";
import { firebaseClient } from "components/firebase/firebaseClient";

class TrackPage extends React.Component {
  state = { trackId: null, runnerId: null, trackList: null };
  componentDidMount() {
    if (!Router.query.id || !Router.query.runnerId) {
      Router.push("/catalog");
    }
    this.props.pageChangeHeaderTitle("Pathway");
    this.loadBreadcrumbChange();
    this.loadCurrentTrack();
  }

  loadBreadcrumbChange() {
    const { journeyId, pathwayId, runnerId } = Router.query;
    let configure = [
      { text: "Catálogo", link: "/catalog" },
      { text: "Ruta", link: "/catalog/runner?id=" + runnerId },
      { text: "Lección" },
    ];

    if (journeyId) {
      configure = [
        { text: "Catálogo", link: "/catalog" },
        {
          text: "Pathway",
          link: "/catalog/pathway?id=" + pathwayId,
        },
        {
          text: "Journey",
          link: "/catalog/journey?id=" + journeyId,
        },
        { text: "Lección" },
      ];
      if (pathwayId) {
        this.loadTracks();
      }
    } else if (pathwayId) {
      configure = [
        { text: "Catálogo", link: "/catalog" },
        {
          text: "Pathway",
          link: "/catalog/pathway?id=" + pathwayId,
        },
        { text: "Ruta", link: "/catalog/runner?id=" + runnerId },

        { text: "Lección" },
      ];
      this.loadTracks();
    }

    this.props.breadcrumbChange(configure);
  }

  loadTracks() {
    const { runnerId, pathwayId, id } = Router.query;
    getTracks(
      runnerId,
      (result) => {
        const list = [
          {
            title: "Lecciones",
            section: true,
          },
        ];
        result.list.forEach((data, index) => {
          list.push({
            title: data.name,
            current: id === data.id,
            icon: () => (
              <div className="rc-steps-item rc-steps-item-process">
                <div className="rc-steps-item-icon">
                  <span className="rc-steps-icon">{index + 1}</span>
                </div>
              </div>
            ),
            link: {
              pathname: "/catalog/track",
              query: { ...Router.query, id: data.id },
            },
          });
        });
        this.loadRunners(pathwayId, list);
      },
      () => {
        console.log("Tracks empty or errors");
      }
    );
  }

  loadCurrentTrack() {
    const { pathwayId, runnerId, id } = Router.query;
    const { pageShowAlert } = this.props;

    getTrack(
      pathwayId,
      runnerId,
      id,
      (data) => {
        this.setState({
          ...this.state,
          ...data,
          pathwayId,
        });
      },
      () => {
        pageShowAlert("Error al obtener La lección", "error");
      }
    );
  }

  loadRunners(pathwayId, trackList) {
    const { pageShowAlert } = this.props;
    getRunners(pathwayId, (result) => {
        const list = trackList;
        list.push({
          title: "Rutas relacionados",
          section: true,
        });
        result.list.forEach((data, index) => {
          if (Router.query.runnerId !== data.id) {
            list.push({
              title: data.name,
              current: false,
              icon: () => (
                <div className="rc-steps-item rc-steps-item-process">
                  <div className="rc-steps-item-icon">
                    <span className="rc-steps-icon">{index + 1}</span>
                  </div>
                </div>
              ),
              link: {
                pathname: "/catalog/runner",
                query: { ...Router.query, id: data.id },
              },
            });
          }
        });
        this.setState({ ...this.state, trackList: list, pathwayId });
      },
      () => {
        pageShowAlert("Error al obtener los runners", "error");
      }
    );
  }

  render() {
    Router.events.on("routeChangeComplete", () => {
      this.loadCurrentTrack();
    });
    const { asideToggle } = this.props;
    const { trackId, runnerId, trackList, pathwayId, leaderId } = this.state;
    if (trackId === null || runnerId == null) {
      return <Spinner>Cargando...</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Lección | {this.state.name}</title>
          <meta
            property="og:title"
            content={"Lección | " + this.state.name}
            key="title"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content={this.state.description}></meta>
        </Head>
        <Container fluid>
          {trackList && <Aside menuList={trackList} />}
          <Row portletFill="xl" style={{margin: "-15px"}}>
            <Col md="12">
              <DisplayTrackTitle
                track={this.state}
                asideToggle={asideToggle}
                runnerId={runnerId}
                leaderId={leaderId}
                pathwayId={pathwayId}
              />
              <Portlet>
                <Portlet.Body>
                  <div className="content-track">
                    <TrackContent {...this.state} />
                  </div>
                </Portlet.Body>
                <Portlet.Footer className="p-0 pt-2 pb-2">
                  {pathwayId && <PathwayResume pathwayId={pathwayId} />}
                </Portlet.Footer>
              </Portlet>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const DisplayTrackTitle = ({
  asideToggle,
  runnerId,
  pathwayId,
  track,
  leaderId,
}) => {
  const user = firebaseClient.auth().currentUser;
  const enabledEdit = user.uid === leaderId;
  return (
    <Widget1>
      <Widget1.Display top size="sm" className="bg-primary text-white">
        <Widget1.Addon>
          <DemoWrapper>
            <Button
              icon
              circle
              variant="flat-primary"
              className="mr-2"
              onClick={asideToggle}
            >
              <FontAwesomeIcon icon={SolidIcon.faBars} />
            </Button>
            <Button
              icon
              circle
              variant="flat-primary"
              className="mr-2"
              disabled={!enabledEdit}
              onClick={() => {
                Router.push({
                  pathname: "/track/edit",
                  query: {
                    trackId: track.id,
                    runnerId,
                    pathwayId,
                  },
                });
              }}
            >
              <FontAwesomeIcon icon={SolidIcon.faEdit} />
            </Button>
          </DemoWrapper>
        </Widget1.Addon>

        <Widget1.Body>
          <h1 className="display-4" children={track.name} />
        </Widget1.Body>
        <Widget1.Body>
          {track.description}
          <div className="text-right">
            <small>
              <i>Ultima actualización: {new Date(track.date).toDateString()}</i>
            </small>
          </div>
          <Badge>
            Duración: {timeShortConvert(timePowerTen(track.timeLimit))}
            <FontAwesomeIcon className="ml-2" icon={SolidIcon.faClock} />
          </Badge>
          <Badge className="ml-2">
            {track.type}
            <FontAwesomeIcon className="ml-2" icon={SolidIcon.faUserGraduate} />
          </Badge>
        </Widget1.Body>
      </Widget1.Display>
    </Widget1>
  );
};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    {
      pageChangeHeaderTitle,
      breadcrumbChange,
      activityChange,
      asideToggle,
      pageShowAlert,
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withLayout(TrackPage, "public"));
