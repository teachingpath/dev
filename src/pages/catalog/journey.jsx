import { Col, Container, Row, Widget1 } from "@panely/components";
import { firebaseClient } from "components/firebase/firebaseClient";
import {
  activityChange,
  breadcrumbChange,
  pageChangeHeaderTitle,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import withAuth from "components/firebase/firebaseWithAuth";
import Router from "next/router";
import BadgeList from "../../components/widgets/BadgeList";
import React from "react";
import Badge from "@panely/components/Badge";
import ActivitiesComponent from "components/widgets/ActivitiesGroup";
import Teacher from "components/widgets/Teacher";
import StatusProgress from "components/widgets/StatusProgress";
import RunnersExecutor from "components/widgets/RunnersExecutor";
import { getJourney } from "consumer/journey";

class JourneyGeneralPage extends React.Component {
  state = { name: "Loading", trophy: {}, progress: 0, badges: [] };

  componentDidMount() {
    if (!Router.query.id) {
      Router.push("/catalog");
    }
    this.props.pageChangeHeaderTitle("Pathways");
    this.props.breadcrumbChange([
      { text: "Catalog", link: "/catalog" },
      { text: "My Journey" },
    ]);

    getJourney(
      Router.query.id,
      (data) => {
        data.runners = data.breadcrumbs;
        this.setState(data);
        this.props.breadcrumbChange([
          { text: "Catalog", link: "/catalog" },
          { text: "Pathway", link: "/catalog/pathway?id=" + data.pathwayId },
          { text: "My Journey" },
        ]);
      },
      () => {}
    );
  }

  render() {
    const { name, trophy, progress, group } = this.state;
    const user = firebaseClient.auth().currentUser;
    const isFinish = progress >= 100;
    return (
      <React.Fragment>
        <Head>
          <title>Journey | Teaching Path</title>
        </Head>
        <Container fluid>
          <Row portletFill="xl">
            <Col xl="12">
              <Widget1 fluid>
                <Widget1.Display
                  top
                  size="lg"
                  className={
                    isFinish
                      ? "bg-success text-white mb-5"
                      : "bg-info text-white mb-5"
                  }
                >
                  {this.state?.id && (
                    <StatusProgress
                      progress={this.state.progress.toFixed(2)}
                      journeyId={this.state.id}
                      runners={this.state?.runners}
                      pathwayId={this.state.pathwayId}
                    />
                  )}

                  <Widget1.Dialog>
                    <Widget1.DialogContent>
                      <h1
                        className="display-5"
                        children={name?.toUpperCase()}
                      />
                      <h5>
                        Your Group: <Badge>{group}</Badge>
                      </h5>
                    </Widget1.DialogContent>
                  </Widget1.Dialog>
                  {Object.keys(trophy).length > 0 && (
                    <Widget1.Offset>
                      <img
                        src={trophy?.image}
                        alt="loading"
                        className="bg-yellow p-2 border mx-auto d-block mg-thumbnail avatar-circle"
                      />
                      <h4
                        className={
                          (isFinish ? "text-black " : "text-muted") +
                          " mx-auto d-block text-center "
                        }
                      >
                        {trophy?.name}
                      </h4>
                      <small
                        className={" mx-auto d-block text-center text-muted"}
                      >
                        {isFinish ? trophy?.description : ""}
                      </small>
                    </Widget1.Offset>
                  )}
                </Widget1.Display>
                <Widget1.Body style={{ marginTop: "70px" }}>
                  <Row>
                    <Col md="6">
                      {this.state?.runners && (
                        <RunnersExecutor
                          current={this.state.current}
                          runners={this.state.runners}
                          journeyId={this.state.id}
                          group={this.state.group}
                          pathwayId={this.state.pathwayId}
                          activityChange={this.props.activityChange}
                          onComplete={(data) => {
                            this.setState({
                              ...this.state,
                              id: null
                            });
                            this.props.activityChange({
                              type: "complete_track",
                              msn: 'Track "' + data.title + '" completed.',
                              msnForGroup:
                                "<i>" +
                                user.displayName +
                                '</i> has completed track <b>"' +
                                data.title +
                                '"</b>',
                              group: group,
                            });
                            this.componentDidMount();
                          }}
                        />
                      )}
                    </Col>
                    <Col md="6">
                      {this.state?.id && (
                        <ActivitiesComponent group={this.state?.group} />
                      )}
                    </Col>
                    <Col md="12">
                      {this.state?.id && (
                        <BadgeList journeyId={this.state?.id} />
                      )}
                    </Col>
                    <Col md="6">
                      {this.state?.id && (
                        <Teacher leaderId={this.state?.leaderId} />
                      )}
                    </Col>
                  </Row>
                </Widget1.Body>
              </Widget1>
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
)(withAuth(withLayout(JourneyGeneralPage, "public")));
