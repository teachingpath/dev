import {
  Container,
  Portlet,
  RichList,
} from "@panely/components";
import {
  firestoreClient,
} from "components/firebase/firebaseClient";
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
import Link from "next/link";
import Spinner from "@panely/components/Spinner";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Badge from "@panely/components/Badge";

class RunnerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      list: props.data || [],
      estimation: 0,
      id: null,
    };
  }

  // Handle toggling tab
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id });
    }
  };

  componentDidMount() {
    firestoreClient
      .collection("runners")
      .doc(this.props.id)
      .get()
      .then(async (doc) => {
        const runner = doc.data();
        const data = await firestoreClient
          .collection("runners")
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
                type: doc.data().type,
              });
            });
            return list;
          });
        const estimation = data.map((el) => el.time).reduce((a, b) => a + b);
        this.setState({
          ...runner,
          runnerId: doc.id,
          list: data,
          estimation: this.state.estimation + estimation,
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    const { list, runnerId, name, description } = this.state;
    return (
      <React.Fragment>
        <h2>{name}</h2>
        <h6>{description}</h6>

        <p>
          Estimated time approximately:{" "}
          <strong>
            {Math.floor(this.state.estimation / 7)}{" "}
            {this.state.estimation >= 7 ? "d" : "h"}
          </strong>
        </p>
        {list && list.length === 0 ? (
          <Spinner />
        ) : (
          <Portlet className="mb-2">
            {/* BEGIN Rich List */}
            <Portlet.Header bordered>
              <Portlet.Title>Tracks</Portlet.Title>
              <Portlet.Addon>
                Estimation: {list.map((t) => t.time).reduce((a, b) => a + b)} h
              </Portlet.Addon>
            </Portlet.Header>

            <RichList flush>
              {list.map((data, index) => {
                const { subtitle, title, time, type, id } = data;
                const titleLink = (
                  <Link
                    href={"/catalog/track?id=" + id + "&runnerId=" + runnerId}
                  >
                    {index + 1 + ". " + title}
                  </Link>
                );
                return (
                  <RichList.Item key={index}>
                    <RichList.Content>
                      <RichList.Title children={titleLink} />
                      <RichList.Subtitle children={subtitle} />
                    </RichList.Content>
                    <RichList.Addon addonType="append">
                      <Badge className="mr-2">{type}</Badge>
                      {time.toString().padStart(2, "0")} h
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
        )}
      </React.Fragment>
    );
  }
}

class RunnerGeneralPage extends React.Component {
  state = { id: null };
  componentDidMount() {
    this.props.pageChangeHeaderTitle("Pathways");
    this.props.breadcrumbChange([
      { text: "Catalog", link: "/catalog" },
      { text: "Runner" },
    ]);
    if (!Router.query.id) {
      Router.push("/catalog");
    } else {
      this.setState({ id: Router.query.id });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Runner | Teaching Path</title>
        </Head>
        <Container fluid>
            {this.state.id && <RunnerList id={this.state.id} />}
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
)(withLayout(RunnerGeneralPage, "public"));
