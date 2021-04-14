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
import Carusel from "components/widgets/Widget36";
import Activities from "components/widgets/Widget13";
import Pathways from "components/widgets/Widget14";
import Widget27 from "components/widgets/Widget27";
import Widget33 from "components/widgets/Widget33";
import Head from "next/head";

class DashboardPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Pathway");
    // Set breadcrumb data
    this.props.breadcrumbChange([{ text: "Pathway", link: "/" }]);
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | Teaching Path</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              <Widget33 />
            </Col>
          </Row>
          <Row></Row>
          <Row portletFill="xl">
            <Col xl="8">
              <Row portletFill="md">
                <Col md="6">
                  <Pathways {...this.props} />
                  <Activities {...this.props} />
                </Col>
                <Col md="6">
                  <Carusel {...this.props} />
                </Col>
              </Row>
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
)(withAuth(withLayout(DashboardPage)));
