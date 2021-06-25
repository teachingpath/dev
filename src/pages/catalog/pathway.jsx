import {
  Row,
  Col,
  Container,
  Nav,
  Tab,
  Portlet,
  RichList,
  Widget1,
  Widget2,
  Card,
} from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import Router from "next/router";
import Spinner from "@panely/components/Spinner";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Badge from "@panely/components/Badge";
import {
  timeConvert,
  timePowerTen,
  timeShortPowerTen,
} from "components/helpers/time";
import { getRunners } from "consumer/runner";
import { getTracks } from "consumer/track";
import StartPathway from "components/widgets/StartPathway";

class PathwayPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Loading",
      id: null,
    };
    this.runnersRef = React.createRef();
  }

  componentDidMount() {
    if (!Router.query.id) {
      Router.push("/catalog");
    }

    firestoreClient
      .collection("pathways")
      .doc(Router.query.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({
            ...doc.data(),
            id: Router.query.id,
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
    const { name, id, leaderId } = this.state;
    return (
      <Widget1>
        <Widget1.Display top size="lg" className="bg-dark text-white">
          {id && (
            <StartPathway
              pathwayId={id}
              {...this.state}
              activityChange={this.props.activityChange}
              runnersRef={this.runnersRef}
            />
          )}
          <Widget1.Dialog>
            <Widget1.DialogContent>
              <h1 className="display-5" children={name.toUpperCase()} />
            </Widget1.DialogContent>
          </Widget1.Dialog>
          <Widget1.Offset>
            {!this.state?.trophy?.image && <Spinner />}
            {this.state?.trophy?.image && (
              <img
                src={this.state?.trophy?.image}
                alt="trophy"
                className="bg-yellow p-2 border mx-auto d-block mg-thumbnail avatar-circle"
              />
            )}
          </Widget1.Offset>
        </Widget1.Display>
        <Widget1.Body className="pt-5">
          <Portlet className="mt-4">
            <Portlet.Header>
              <Portlet.Icon>
                <FontAwesomeIcon icon={SolidIcon.faRoute} />
              </Portlet.Icon>
              <Portlet.Title>Runners</Portlet.Title>
            </Portlet.Header>
            <Portlet.Body>
              {id && (
                <RunnerTab ref={this.runnersRef} pathwayId={this.state.id} />
              )}
            </Portlet.Body>
            <Portlet.Footer>
              <Col md="6">{leaderId && <Teacher leaderId={leaderId} />}</Col>
            </Portlet.Footer>
          </Portlet>
        </Widget1.Body>
      </Widget1>
    );
  }
}

class RunnerTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tabs: props.data || [],
      estimation: 0,
    };
  }

  // Handle toggling tab
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id });
    }
  };

  componentDidMount() {
    const list = this.state.tabs;
    getRunners(
      this.props.pathwayId,
      async (runners) => {
        runners.list.forEach(async (runner) => {
          const tracks = await getTracks(runner.id);
          const listMapped = tracks.map((doc) => ({
            id: doc.id,
            title: doc.name,
            subtitle: doc.description,
            time: doc.timeLimit,
            type: doc.type,
          }));

          list.push({
            id: runner.id,
            pathwayId: this.props.pathwayId,
            title: runner.name,
            subtitle: runner.description,
            feedback: runner.feedback,
            badget: runner.badget,
            data: listMapped,
          });
          const estimation = listMapped
            .map((el) => el.time)
            .reduce((a, b) => a + b, 0);

          this.setState({
            ...this.state,
            tabs: list,
            estimation: this.state.estimation + estimation,
          });
        });
      },
      () => {}
    );
  }

  render() {
    return (
      <React.Fragment>
        {/* BEGIN Nav */}
        <p>
          Estimated time approximately:{" "}
          <strong>{timeConvert(timePowerTen(this.state.estimation))}</strong>
        </p>
        {this.state.tabs.length === 0 && <Spinner />}
        <Widget2 justified size="lg" className="mb-4">
          {this.state.tabs.map((data, index) => (
            <Nav.Item
              key={index}
              active={this.state.activeTab === index}
              onClick={() => this.toggle(index)}
              children={data.title.toUpperCase()}
              title={data.subtitle}
            />
          ))}
        </Widget2>
        <Tab activeTab={this.state.activeTab}>
          {this.state.tabs.map((tab, index) => (
            <Tab.Pane key={index} tabId={index}>
              {/* BEGIN Portlet */}
              <Portlet className="mb-0">
                {/* BEGIN Rich List */}
                <Portlet.Header bordered>
                  <Portlet.Title>Tracks</Portlet.Title>
                  <Portlet.Addon>
                    Estimation:{" "}
                    {timeConvert(
                      timePowerTen(
                        tab.data.map((t) => t.time).reduce((a, b) => a + b, 0)
                      )
                    )}
                  </Portlet.Addon>
                </Portlet.Header>

                <RichList flush>
                  {tab.data.map((data, index) => {
                    const { subtitle, title, time, type, id } = data;
                    const titleLink = index + 1 + ". " + title;
                    return (
                      <RichList.Item key={index}>
                        <RichList.Content>
                          <RichList.Title children={titleLink} />
                          <RichList.Subtitle children={subtitle} />
                        </RichList.Content>
                        <RichList.Addon addonType="append">
                          <Badge className="mr-2">{type}</Badge>
                          {timeShortPowerTen(time)}
                          <FontAwesomeIcon
                            className={"ml-2"}
                            icon={SolidIcon.faStopwatch}
                          />
                        </RichList.Addon>
                      </RichList.Item>
                    );
                  })}
                </RichList>
                {/* END Rich List */}
              </Portlet>
              {/* END Portlet */}
            </Tab.Pane>
          ))}
        </Tab>
      </React.Fragment>
    );
  }
}

class PathwayGeneralPage extends React.Component {
  componentDidMount() {
    this.props.pageChangeHeaderTitle("Pathway");
    this.props.breadcrumbChange([
      { text: "Catalog", link: "/catalog" },
      { text: "Pathway" },
    ]);
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | Teaching Path</title>
        </Head>
        <Container fluid>
          <Row portletFill="xl">
            <Col xl="12">
              <PathwayPage activityChange={this.props.activityChange} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

class Teacher extends React.Component {
  state = { data: {} };
  componentDidMount() {
    firestoreClient
      .collection("users")
      .doc(this.props.leaderId)
      .get()
      .then((doc) => {
        this.setState({ data: doc.data() });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
  render() {
    const { data } = this.state;
    return (
      <Card>
        <Row noGutters>
          <Col md="4">
            <Card.Img
              className="avatar-circle p-3"
              src={data?.image || "/images/avatar/blank.webp"}
              alt="Profile Image"
            />
          </Col>
          <Col md="8">
            <Card.Body>
              <Card.Title>
                Coach: {data?.firstName} {data?.lastName}
              </Card.Title>
              <Card.Text>
                <small className="text-muted">{data?.specialty}</small>
              </Card.Text>
              <Card.Text>{data?.bio}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
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
)(withLayout(PathwayGeneralPage, "public"));
