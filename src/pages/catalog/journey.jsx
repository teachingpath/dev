import {
  Row,
  Col,
  Container,
  Nav,
  Tab,
  Portlet,
  RichList,
  Dropdown,
  Widget1,
  Card,
  Widget2,
  Progress,
  Collapse,
  Accordion,
} from "@panely/components";
import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import withAuth from "components/firebase/firebaseWithAuth";
import Router from "next/router";
import Steps from "rc-steps";

class JourneyGeneralPage extends React.Component {
  componentDidMount() {
    if (!Router.query.id) {
      Router.push("/catalog");
    }
    this.props.pageChangeHeaderTitle("Pathway");
    this.props.breadcrumbChange([
      { text: "Catalog", link: "/catalog" },
      { text: "My Journey" },
    ]);

    firestoreClient
      .collection("journeys")
      .doc(Router.query.id)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          const data = {
            ...doc.data(),
            id: Router.query.id,
          };
          const runners = await this.loadRunners(data.pathwayId);
          data.runners = runners;
          this.setState(data);
          this.props.breadcrumbChange([
            { text: "Catalog", link: "/catalog" },
            { text: "Pathway", link: "/catalog/pathway?id=" + data.pathwayId },
            { text: "My Journey" },
          ]);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  loadRunners(pathwayId) {
    return firestoreClient
      .collection("runners")
      .where("pathwayId", "==", pathwayId)
      .orderBy("level")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        return list;
      });
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | Teaching Path</title>
        </Head>
        <Container fluid>
          <Row portletFill="xl">
            <Col md="6">
              {this.state?.id && (
                <StatusProgress
                  progress={this.state.progress}
                  journeyId={this.state.id}
                />
              )}
            </Col>
            <Col md="6">
              {this.state?.runners && <Runners runners={this.state.runners} />}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

class Runners extends React.Component {
  state = { activeCard: 0 };

  toggle = (id) => {
    if (this.state.activeCard === id) {
      this.setState({ activeCard: null });
    } else {
      this.setState({ activeCard: id });
    }
  };

  render() {
    const { activeCard } = this.state;
    const { runners } = this.props;

    return (
      <Accordion {...this.props}>
        {runners.map((item, index) => {
          return (
            <Card>
              <Card.Header
                collapsed={!(activeCard === index)}
                onClick={() => this.toggle(index)}
              >
                <Card.Title>{item.name.toUpperCase()}</Card.Title>
              </Card.Header>
              <Collapse isOpen={activeCard === index}>
                <Card.Body>{item.description}</Card.Body>
                <Card.Body>
                  <Tracks runnerId={item.id} />
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
  state = { current: null, tracks: [] };

  componentDidMount() {
    firestoreClient
      .collection("runners")
      .doc(this.props.runnerId)
      .collection("tracks")
      .orderBy("level")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.setState({
          ...this.state,
          tracks: list,
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
  render() {
    const { current, tracks } = this.state;

    return (
      <Steps current={current} direction="vertical">
        {tracks.map((item) => {
          return (
            <Steps.Step title={item.name} description={item.description} />
          );
        })}
      </Steps>
    );
  }
}

const StatusProgress = ({ progress, journeyId }) => {
  return (
    <Widget1.Group>
      <Widget1.Title>
        <h4>Progress</h4>
        <Progress striped value={progress} className="mr-5 w-80">
          {progress}%
        </Progress>
      </Widget1.Title>
      <Widget1.Addon>
        {/* BEGIN Dropdown */}
        <Dropdown.Uncontrolled>
          <Dropdown.Toggle caret children="Option" />
          <Dropdown.Menu right animated>
            <Dropdown.Item
              icon={<FontAwesomeIcon icon={SolidIcon.faBackward} />}
            >
              Reset
            </Dropdown.Item>
            <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faShare} />}>
              Share
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Uncontrolled>
        {/* END Dropdown */}
      </Widget1.Addon>
    </Widget1.Group>
  );
};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(JourneyGeneralPage, "public")));
