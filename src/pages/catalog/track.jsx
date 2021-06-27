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

class TrackPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { trackId: null, runnerId: null, trackList: null };
  }

  componentDidMount() {
    if (!Router.query.id || !Router.query.runnerId) {
      Router.push("/catalog");
    }
    this.props.pageChangeHeaderTitle("Pathway");

    if (Router.query.journeyId) {
      this.props.breadcrumbChange([
        { text: "Catalog", link: "/catalog" },
        {
          text: "Pathway",
          link: "/catalog/pathway?id=" + Router.query.pathwayId,
        },
        {
          text: "My Journey",
          link: "/catalog/journey?id=" + Router.query.journeyId,
        },
        { text: "Track" },
      ]);
      if (Router.query.pathwayId) {
        this.loadTracks();
      }
    } else if (Router.query.pathwayId) {
      this.props.breadcrumbChange([
        { text: "Catalog", link: "/catalog" },
        {
          text: "Pathway",
          link: "/catalog/pathway?id=" + Router.query.pathwayId,
        },
        { text: "Runner", link: "/catalog/runner?id=" + Router.query.runnerId },

        { text: "Track" },
      ]);
      this.loadTracks();
    } else {
      this.props.breadcrumbChange([
        { text: "Catalog", link: "/catalog" },
        { text: "Runner", link: "/catalog/runner?id=" + Router.query.runnerId },
        { text: "Track" },
      ]);
    }
    this.loadCurrentTrack();
  }

  loadTracks() {
    const { runnerId, pathwayId, id } = Router.query;
    getTracks(
      runnerId,
      (result) => {
        const list = [
          {
            title: "Tracks",
            section: true,
          },
        ];
        result.list.forEach((data) => {
          const level = data.level;
          list.push({
            title: data.name,
            current: id === data.id,
            icon: () => (
              <div className="rc-steps-item rc-steps-item-process">
                <div className="rc-steps-item-icon">
                  <span className="rc-steps-icon">{level+1}</span>
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
      () => {}
    );
  }

  loadCurrentTrack() {
    const { pathwayId, runnerId, id } = Router.query;
    getTrack(pathwayId, runnerId, id, (data) => {
      this.setState({
        ...this.state,
        ...data,
        pathwayId,
      });
    });
  }

  loadRunners(pathwayId, trackList) {
    getRunners(pathwayId, (result) => {
      const list = trackList;
      list.push({
        title: "Related Runners",
        section: true,
      });
      result.list.forEach((data) => {
        const level = data.level;
        if (Router.query.runnerId !== data.id) {
          list.push({
            title: data.name,
            current: false,
            icon: () => (
              <div className="rc-steps-item rc-steps-item-process">
                <div className="rc-steps-item-icon">
                  <span className="rc-steps-icon">{level}</span>
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
    });
  }

  render() {
    Router.events.on("routeChangeComplete", () => {
      this.loadCurrentTrack();
    });
    const { asideToggle } = this.props;
    const { trackId, runnerId, trackList, pathwayId } = this.state;
    if (trackId === null || runnerId == null) {
      return <Spinner>Loading</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Track | {this.state.name}</title>
        </Head>
        <Container fluid>
          {trackList && <Aside menuList={trackList} />}
          <Row>
            <Col md="12">
              <Widget1>
                <Widget1.Display
                  top
                  size="sm"
                  className="bg-primary text-white"
                >
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
                    </DemoWrapper>
                  </Widget1.Addon>

                  <Widget1.Body>
                    <h1 className="display-3" children={this.state.name} />
                  </Widget1.Body>
                  <Widget1.Body>
                    {this.state.description}
                    <div className="text-right">
                      <small>
                        <i>Last update: {new Date().toDateString()}</i>
                      </small>
                    </div>
                  </Widget1.Body>
                </Widget1.Display>
              </Widget1>
              <Portlet>
                <Portlet.Body>
                  <div className="content-track">
                    <TrackContent {...this.state} />
                  </div>
                </Portlet.Body>

                <Portlet.Footer>
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


function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange, asideToggle },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withLayout(TrackPage, "public"));
