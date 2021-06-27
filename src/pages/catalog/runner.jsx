import {
  Container,
  Portlet,
  RichList,
  Card,
  Row,
  Col,
} from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import { Widget1 } from "@panely/components";
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
import { timeConvert, timePowerTen } from "components/helpers/time";
import PathwayResume from "components/widgets/PathwayResume";

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
    const { list, runnerId, pathwayId, name, description } = this.state;
    return (
      <React.Fragment>
        <Widget1>
          <Widget1.Display top size="sm" className="bg-primary text-white">
            <Widget1.Body>
              <h1 className="display-3" children={name} />
            </Widget1.Body>
            <Widget1.Body>{description}</Widget1.Body>
          </Widget1.Display>
        </Widget1>
        {list && list.length === 0 ? (
          <Spinner />
        ) : (
          <Portlet className="mb-2">
            <Portlet.Header bordered>
              <Portlet.Icon>
                <FontAwesomeIcon icon={SolidIcon.faRoad} />
              </Portlet.Icon>
              <Portlet.Title>Tracks</Portlet.Title>
              <Portlet.Addon>
                Estimation:{" "}
                <strong>
                {timeConvert(
                  timePowerTen(
                    list.map((t) => t.time).reduce((a, b) => a + b, 0)
                  )
                )}
                </strong>
               
              </Portlet.Addon>
            </Portlet.Header>

            <RichList flush>
              {list.map((data, index) => {
                const { subtitle, title, time, type, id } = data;
                const titleLink = (
                  <Link
                    href={
                      "/catalog/track?id=" +
                      id +
                      "&runnerId=" +
                      runnerId +
                      "&pathwayId=" +
                      pathwayId
                    }
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
                      {timeConvert(timePowerTen(time))}
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
      this.setState({ id: Router.query.id, pathwayId: Router.query.pathwayId });
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
          {this.state.pathwayId && <PathwayResume pathwayId={this.state.pathwayId} />}
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
