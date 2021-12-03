import {
  Col,
  Container,
  Row,
  Widget1,
  Badge,
  AvatarGroup,
} from "@panely/components";
import {
  activityChange,
  breadcrumbChange,
  pageChangeHeaderTitle,
  pageShowAlert,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import withAuth from "components/firebase/firebaseWithAuth";
import Router from "next/router";
import BadgeList from "components/widgets/BadgeList";
import React from "react";
import ActivitiesComponent from "components/widgets/ActivitiesGroup";
import Teacher from "components/widgets/Teacher";
import StatusProgress from "components/widgets/StatusProgress";
import RunnersExecutor from "components/widgets/RunnersExecutor";
import { getJourney } from "consumer/journey";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "@panely/components/Spinner";
import {
  activityMapper,
  createSlug,
  linkGroup,
  linkTrack,
} from "components/helpers/mapper";
import DisplayTrophy from "components/widgets/DisplayTrophy";
import TraineeGroup from "components/widgets/TraineeGroup";

class JourneyGeneralPage extends React.Component {
  state = { name: "Cargando...", trophy: {}, progress: 0, badges: [] };
  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
  }

  componentDidMount() {
    if (!Router.query.id) {
      Router.push("/catalog");
    }
    this.props.pageChangeHeaderTitle("Pathways");
    this.props.breadcrumbChange([
      { text: "Catálogo", link: "/catalog" },
      { text: "Journey" },
    ]);

    getJourney(
      Router.query.id,
      (data) => {
        data.runners = data.breadcrumbs;
        localStorage.setItem("group", data.group);
        localStorage.setItem("pathwayId", data.pathwayId);
        localStorage.setItem("journeyId", data.id);
        this.setState(data);
        this.props.breadcrumbChange([
          { text: "Catálogo", link: "/catalog" },
          { text: "Pathway", link: "/catalog/pathway?id=" + data.pathwayId },
          { text: "Journey" },
        ]);
      },
      () => {
        this.props.pageShowAlert("No se pudo obtener el juorney", "error");
      }
    );
  }

  onComplete(data) {
    this.props.activityChange(
      activityMapper(
        "complete_track",
        linkTrack(
          data.id,
          data.runnerId,
          data.title,
          "La lección __LINK__ está competado."
        ),
        linkGroup(
          this.state.id,
          this.props.user,
          linkTrack(
            data.id,
            data.runnerId,
            data.title,
            "ha completado La lección: __LINK__"
          )
        ),
        this.state?.group,
        5
      )
    );
    this.setState({
      ...this.state,
      id: null,
    });
    this.componentDidMount();
  }

  render() {
    const { name, trophy, progress, group, groupName, isFollowUp } = this.state;
    const user = this.props.user;
    const isFinish = progress >= 100;
    if (!user) {
      return <Spinner>Cargando...</Spinner>;
    }

    return (
      <React.Fragment>
        <Head>
          <title>Journey | Teaching Path</title>
        </Head>

        <Container fluid>
        <Row portletFill="xl" style={{margin: "-15px"}}>
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
                  <TitlePathway group={groupName} name={name} level={this.state.level} />
                  <DisplayTrophy isFinish={isFinish} trophy={trophy} />
                </Widget1.Display>
                <Widget1.Body style={{ marginTop: "70px" }}>
                  <Row>
                    <Col md="8">
                      {this.state?.runners && (
                        <RunnersExecutor
                          user={user}
                          current={this.state.current}
                          runners={this.state.runners}
                          journeyId={this.state.id}
                          group={this.state.group}
                          pathwayId={this.state.pathwayId}
                          activityChange={this.props.activityChange}
                          onComplete={this.onComplete}
                        />
                      )}
                    </Col>
                    {this.state?.id && (
                      <>
                        <Col md="4">
                          <TraineeGroup
                            pathwayId={this.state?.pathwayId}
                            group={groupName}
                          />
                          <ActivitiesComponent
                            group={this.state?.group}
                            pathwayId={this.state?.pathwayId}
                          />
                        </Col>
                        <Col md="12">
                          <BadgeList journeyId={this.state?.id} />
                        </Col>
                        <Col md="6">
                          <Teacher leaderId={this.state?.leaderId} />
                        </Col>
                      </>
                    )}
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

const TitlePathway = ({ name, group, level }) => {
  return (
    <Widget1.Dialog>
      <Widget1.DialogContent>
        <h1 className="display-5" children={name?.toUpperCase()} />
        <h5>
          <Badge title="tu sala o grupo" variant="outline-light">
           <FontAwesomeIcon className="mr-2" icon={SolidIcon.faUsers} />
            {group ? group?.replace(createSlug(name) + "-", "") : "--"}
          </Badge>
          <Badge variant="outline-light" className="ml-1">
            <FontAwesomeIcon className="mr-2" icon={SolidIcon.faHiking} />
            {
              {
                beginner: "Nivel: Principiante",
                middle: "Nivel: Intermedio",
                advanced: "Nivel: Avanzado",
              }[level]
            }
          </Badge>
        </h5>
      </Widget1.DialogContent>
    </Widget1.Dialog>
  );
};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange, pageShowAlert },
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
