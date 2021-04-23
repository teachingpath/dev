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
  Progress,
} from "@panely/components";
import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import Router from "next/router";
import Button from "@panely/components/Button";

class PathwayComponent extends React.Component {
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
    const { name, id } = this.state;

    return (
      <Widget1>
        <Widget1.Display top size="lg" className="bg-dark text-white">
          {id && (
            <Status
              pathwayId={id}
              {...this.state}
              runnersRef={this.runnersRef}
            />
          )}
          <Widget1.Dialog>
            <Widget1.DialogContent>
              <h1 className="display-3" children={name} />
            </Widget1.DialogContent>
          </Widget1.Dialog>
          <Widget1.Offset>
            <img
              src={this.state?.trophy?.image}
              alt="trophy"
              className="mx-auto d-block mg-thumbnail avatar-circle"
            />
          </Widget1.Offset>
        </Widget1.Display>
        <Widget1.Body className="pt-5">
          <h3>Runners</h3>
          {id && <RunnerTab ref={this.runnersRef} pathwayId={this.state.id} />}
        </Widget1.Body>
      </Widget1>
    );
  }
}

class Status extends React.Component {
  state = {
    journeyId: null,
  };
  componentDidMount() {
    const { pathwayId } = this.props;
    const user = firebaseClient.auth().currentUser;
    if (user) {
      firestoreClient
        .collection("journeys")
        .where("userId", "==", user.uid)
        .where("pathwayId", "==", pathwayId)
        .limit(1)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const queryDocumentSnapshot = querySnapshot.docs[0];
            this.setState({
              journeyId: queryDocumentSnapshot.id,
              ...queryDocumentSnapshot.data(),
            });
          } else {
            console.log("No such journeys!");
          }
        })
        .catch((error) => {
          console.log("Error getting journeys: ", error);
        });
    }
  }

  onCreateJourney(pathwayId) {
    const user = firebaseClient.auth().currentUser;
    const tabs = this.props.runnersRef.current.state.tabs;

    const breadcrumbs = tabs.map(async (data, runnerIndex) => {
      const quiz = await firestoreClient
        .collection("runners")
        .doc(data.id)
        .collection("questions")
        .get()
        .then((querySnapshot) => {
          const questions = [];
          querySnapshot.forEach((doc) => {
            questions.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return questions;
        });

      return {
        id: data.id,
        name: data.title,
        description: data.subtitle,
        current: runnerIndex === 0 ? 0 : null,
        quiz: quiz,
        tracks: data.data.map((item, trackIndex) => {
          return {
            ...item,
            time: item.time * 3600000,
            status: runnerIndex === 0 && trackIndex === 0 ? "process" : "wait",
          };
        }),
      };
    });
    return Promise.all(breadcrumbs).then((dataResolved) => {
      return firestoreClient
        .collection("journeys")
        .add({
          progress: 1,
          pathwayId: pathwayId,
          userId: user.uid,
          date: new Date(),
          current: 0,
          breadcrumbs: dataResolved,
        })
        .then((doc) => {
          Router.push({
            pathname: "/catalog/journey",
            query: {
              id: doc.id,
            },
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    });
  }

  render() {
    const user = firebaseClient.auth().currentUser;
    const { pathwayId } = this.props;

    const Start = () => {
      return (
        <Button
          className="w-25"
          onClick={() => this.onCreateJourney(pathwayId)}
        >
          Start Pathway
        </Button>
      );
    };

    if (!user) {
      return <Login />;
    }

    return this.state.journeyId ? (
      <StatusProgress
        progress={this.state.progress}
        journeyId={this.state.journeyId}
      />
    ) : (
      <Start />
    );
  }
}

class RunnerTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tabs: props.data || [],
    };
  }

  // Handle toggling tab
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id });
    }
  };

  componentDidMount() {
    const db = firestoreClient.collection("runners");
    db.where("pathwayId", "==", this.props.pathwayId)
      .orderBy("level")
      .get()
      .then((querySnapshot) => {
        const list = this.state.tabs;
        querySnapshot.forEach(async (doc) => {
          const data = await db
            .doc(doc.id)
            .collection("tracks")
            .orderBy("level")
            .get()
            .then((querySnapshot) => {
              const list = [];
              querySnapshot.forEach((doc) => {
                list.push({
                  id: doc.id,
                  title: doc.data().name,
                  subtitle: doc.data().description,
                  time: doc.data().timeLimit,
                });
              });
              return list;
            });

          list.push({
            id: doc.id,
            title: doc.data().name,
            subtitle: doc.data().description,
            data: data,
          });
          this.setState({
            ...this.state,
            tabs: list,
          });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    return (
      <React.Fragment>
        {/* BEGIN Nav */}
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
                </Portlet.Header>

                <RichList flush>
                  {tab.data.map((data, index) => {
                    const { subtitle, title, time } = data;

                    return (
                      <RichList.Item key={index}>
                        <RichList.Content>
                          <RichList.Title children={index + 1 + ". " + title} />
                          <RichList.Subtitle children={subtitle} />
                        </RichList.Content>
                        <RichList.Addon addonType="append">
                          {time.toString().padStart(2, "0")}:00 h
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
            <Col xl="4">
              <PathwayComponent />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const StatusProgress = ({ progress, journeyId }) => {
  return (
    <Widget1.Group>
      <Widget1.Title>
        <h4>Progress</h4>
        <Progress striped variant="dark" value={progress} className="mr-5 w-50">
          {progress}%
        </Progress>
      </Widget1.Title>
      <Widget1.Addon>
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
          Go to journey
        </Button>
        {/* BEGIN Dropdown */}

        {/* END Dropdown */}
      </Widget1.Addon>
    </Widget1.Group>
  );
};

const Login = () => {
  return (
    <Button
      className="w-25"
      onClick={() => {
        Router.push({
          pathname: "/login",
          query: {
            redirect: window.location.href,
          },
        });
      }}
    >
      Start Pathway
    </Button>
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
)(withLayout(PathwayGeneralPage, "public"));