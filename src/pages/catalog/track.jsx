import {
  Row,
  Col,
  Portlet,
  Container,
  Spinner,
  Badge,
  Button,
} from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
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
import Header from "@panely/components/Header";

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
    //  this.loadRunners(Router.query.pathwayId);
    this.loadCurrentTrack();
  }

  loadTracks() {
    firestoreClient
      .collection("runners")
      .doc(Router.query.runnerId)
      .collection("tracks")
      .orderBy("level")
      .get()
      .then((querySnapshot) => {
        const list = [
          {
            title: "Tracks",
            section: true,
          },
        ];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const level = data.level;
          list.push({
            title: data.name,
            current: Router.query.id === doc.id,
            icon: () => (
              <div className="rc-steps-item rc-steps-item-process">
                <div className="rc-steps-item-icon">
                  <span className="rc-steps-icon">{level}</span>
                </div>
              </div>
            ),
            link: {
              pathname: "/catalog/track",
              query: { ...Router.query, id: doc.id },
            },
          });
        });
        this.setState({ ...this.state, trackList: list });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  loadCurrentTrack() {
    firestoreClient
      .collection("runners")
      .doc(Router.query.runnerId)
      .collection("tracks")
      .doc(Router.query.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          this.setState({
            id: Router.query.id,
            trackId: Router.query.id,
            runnerId: Router.query.runnerId,
            ...data,
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  loadRunners(pathwayId) {
    firestoreClient
      .collection("runners")
      .where("pathwayId", "==", pathwayId)
      .orderBy("level")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            title: doc.data().name,
            subtitle: doc.data().description,
          });
        });
        console.log(list);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    Router.events.on("routeChangeComplete", () => {
      this.loadCurrentTrack();
    });
    const { asideToggle } = this.props;
    const { trackId, runnerId, trackList } = this.state;
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
              <Portlet>
                <Portlet.Header>
                  <Portlet.Title style={{whiteSpace: "none"}}>
                    <Header.Holder mobile>
                      <Button icon variant="flat-primary" className="mr-2" onClick={asideToggle}>
                        <FontAwesomeIcon icon={SolidIcon.faBars} />
                      </Button>
                      {this.state.name}
                    </Header.Holder>
                    <Header.Holder desktop>{this.state.name}</Header.Holder>
                  </Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>{this.state.description}</p>
                  <hr />
                  <div className="content-track">
                    <TrackContent {...this.state} />
                  </div>
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
    { pageChangeHeaderTitle, breadcrumbChange, activityChange, asideToggle },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withLayout(TrackPage, "public"));
