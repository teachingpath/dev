import { Col, Container, Row, Widget1, Badge } from "@panely/components";
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
import ActivitiesComponent from "components/widgets/ActivitiesGroup";
import Teacher from "components/widgets/Teacher";
import StatusProgress from "components/widgets/StatusProgress";
import RunnersExecutor from "components/widgets/RunnersExecutor";
import { getJourney } from "consumer/journey";
import Spinner from "../../../docs/template/src/modules/components/Spinner";

class JourneyGeneralPage extends React.Component {
  state = { name: "Cargando...", trophy: {}, progress: 0, badges: [] };

  componentDidMount() {
    if (!Router.query.id) {
      Router.push("/catalog");
    }
    this.props.pageChangeHeaderTitle("Pathways");
    this.props.breadcrumbChange([
      { text: "Catálogo", link: "/catalog" },
      { text: "Mi Journey" },
    ]);

    getJourney(
      Router.query.id,
      (data) => {
        data.runners = data.breadcrumbs;
        this.setState(data);
        this.props.breadcrumbChange([
          { text: "Catálogo", link: "/catalog" },
          { text: "Pathway", link: "/catalog/pathway?id=" + data.pathwayId },
          { text: "Mi Journey" },
        ]);
      },
      () => {}
    );
  }

  render() {
    const { name, trophy, progress, group } = this.state;
    const user = this.props.user;
    const isFinish = progress >= 100;
    return (
      <React.Fragment>
        <Head>
          <title>Journey | Teaching Path</title>
        </Head>
        {!user ? (
          <Spinner></Spinner>
        ) : (
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
                          <i className="fas fa-users"></i>{" "}
                          <Badge title="tu sala o grupo">{group}</Badge>
                        </h5>
                      </Widget1.DialogContent>
                    </Widget1.Dialog>
                    {Object.keys(trophy).length > 0 && (
                      <Widget1.Offset>
                        <img
                          src={trophy?.image}
                          alt="loading"
                          style={{ width: "140px" }}
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
                            user={user}
                            current={this.state.current}
                            runners={this.state.runners}
                            journeyId={this.state.id}
                            group={this.state.group}
                            pathwayId={this.state.pathwayId}
                            activityChange={this.props.activityChange}
                            onComplete={(data) => {
                              const linkResume = this.state.id
                                ? '<i><a href="/pathway/resume?id=' +
                                  this.state.id +
                                  '">' +
                                  user.displayName +
                                  "</a></i>"
                                : "<i>" + user.displayName + "</i>";
                              this.props.activityChange({
                                type: "complete_track",
                                msn:
                                  'El Track "' +
                                  data.title +
                                  '" está completo.',
                                msnForGroup:
                                  linkResume +
                                  ' ha completado el track <b>"' +
                                  data.title +
                                  '"</b>',
                                group: group,
                              });
                              this.setState({
                                ...this.state,
                                id: null,
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
        )}
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

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withAuth(withLayout(JourneyGeneralPage)));
