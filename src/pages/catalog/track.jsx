import { Row, Col, Portlet, Container, Spinner } from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TrackContent from "components/widgets/TrackContent";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import Router from "next/router";

class TrackPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { trackId: null, runnerId: null };
  }

  componentDidMount() {
    if (!Router.query.id) {
      Router.push("/catalog");
    }
    this.props.pageChangeHeaderTitle("Pathway");

    if (Router.query.journeyId) {
      this.props.breadcrumbChange([
        { text: "Catalog", link: "/catalog" },
        {
          text: "My Journey",
          link: "/catalog/journey?id=" + Router.query.journeyId,
        },
        { text: "Track" },
      ]);
    } else if (Router.query.pathwayId) {
      this.props.breadcrumbChange([
        { text: "Catalog", link: "/catalog" },
        {
          text: "Pathway",
          link: "/catalog/pathway?id=" + Router.query.pathwayId,
        },
        { text: "Track" },
      ]);
    } else {
      this.props.breadcrumbChange([
        { text: "Catalog", link: "/catalog" },
        { text: "Track" },
      ]);
    }

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

  render() {
    const { trackId, runnerId } = this.state;
    if (trackId === null || runnerId == null) {
      return <Spinner>Loading</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Track | {this.state.name}</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="12">
              <Portlet>
                <Portlet.Header>
                  <Portlet.Title>{this.state.name}</Portlet.Title>
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
    { pageChangeHeaderTitle, breadcrumbChange, activityChange },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withLayout(TrackPage, "public"));
