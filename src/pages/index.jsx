import { Row, Col, Container } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
  cleanPathway
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import InfoSyncCarousel from "components/widgets/InfoSyncCarousel";
import Activities from "components/widgets/Activities";
import Pathways from "components/widgets/PathwayList";
import Journeys from "../components/widgets/JourneyList";
import BadgeList from "../components/widgets/BadgeList";
import InfoPanel from "components/widgets/InfoPanel";
import Head from "next/head";
import TrophtyListComponent from "components/widgets/TrophyList";
import BadgeAllListComponent from "components/widgets/BadgetAllList";

class DashboardPage extends React.Component {

  componentDidMount() {
    this.props.pageChangeHeaderTitle("Mi Tablero");
    this.props.breadcrumbChange([{ text: "Home", link: "/" }]);
  }

  render() {
    const { isCoach, isTrainee } = this.props;
    
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | Teaching Path</title>
        </Head>
        <Container fluid >
          {isCoach === true && (
            <>
              <Row>
                <Col xs="12"  className="bloq-description">
                  <InfoPanel {...this.props} />
                </Col>
              </Row>
              <Row portletFill="xl" >
                <Col xl="8">
                  <Row portletFill="md">
                    <Col md="6" >
                      <Pathways {...this.props} />

                      <Activities {...this.props} />
                    </Col>
                    <Col md="6">
                      <BadgeAllListComponent />
                      <InfoSyncCarousel {...this.props} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}
          {isTrainee && (
            <Row portletFill="xl">
              <Col md="6">
                <Journeys {...this.props} />
              </Col>
              <Col md="6">
                <TrophtyListComponent />
                <BadgeList />
              </Col>
              <Col md="12">
                <Activities {...this.props} />
              </Col>
            </Row>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange, cleanPathway },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isCoach: state.user?.profile === "coach",
    isTrainee: state.user?.profile === "trainee"
  };
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withAuth(withLayout(DashboardPage)));
