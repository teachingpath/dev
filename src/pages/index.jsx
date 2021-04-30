import { Row, Col, Container } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import InfoSyncCarousel from "components/widgets/InfoSyncCarousel";
import Activities from "components/widgets/Activities";
import Pathways from "components/widgets/Pathways";
import Journeys from "../components/widgets/JourneyList";
import BadgetList from "../components/widgets/BadgetList"
import InfoPanel from "components/widgets/InfoPanel";
import Head from "next/head";

class DashboardPage extends React.Component {
  componentDidMount() {
    this.props.pageChangeHeaderTitle("Control Panel");
    this.props.breadcrumbChange([{ text: "Home", link: "/" }]);
  }

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | Teaching Path</title>
        </Head>
        <Container fluid>
          {user?.profile === "coach" && (
            <>
              <Row>
                <Col xs="12">
                  <InfoPanel />
                </Col>
              </Row>
              <Row portletFill="xl">
                <Col xl="8">
                  <Row portletFill="md">
                    <Col md="6">
                      <Pathways {...this.props} />
                      <Activities {...this.props} />
                    </Col>
                    <Col md="6">
                      <InfoSyncCarousel {...this.props} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}
          {user?.profile === "trainee" && (
            <Row portletFill="xl">
               <Col md="6">
               <Journeys {...this.props}/>
              </Col>
              <Col md="6">
                <BadgetList/>
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
)(withAuth(withLayout(DashboardPage)));
