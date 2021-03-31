import { Row, Col, Container } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Widget1 from "components/widgets/Widget1"
import Widget2 from "components/widgets/Widget2"
import Widget3 from "components/widgets/Widget3"
import Widget4 from "components/widgets/Widget4"
import Widget5 from "components/widgets/Widget5"
import Widget6 from "components/widgets/Widget6"
import Widget7 from "components/widgets/Widget7"
import Widget8 from "components/widgets/Widget8"
import Widget9 from "components/widgets/Widget9"
import Widget10 from "components/widgets/Widget10"
import Widget11 from "components/widgets/Widget11"
import Widget12 from "components/widgets/Widget12"
import Widget13 from "components/widgets/Widget13"
import Widget14 from "components/widgets/Widget14"
import Widget15 from "components/widgets/Widget15"
import Widget16 from "components/widgets/Widget16"
import Widget17 from "components/widgets/Widget17"
import Widget18 from "components/widgets/Widget18"
import Widget19 from "components/widgets/Widget19"
import Widget20 from "components/widgets/Widget20"
import Widget21 from "components/widgets/Widget21"
import Head from "next/head"

class WidgetsGeneralPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("General Widget")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Widgets" },
      { text: "General", link: "/widgets/general" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>General Widget | Panely</title>
        </Head>
        <Container fluid>
          <Row portletFill="xl">
            <Col xl="4">
              <Widget1 />
            </Col>
            <Col xl="4">
              <Widget2 />
            </Col>
            <Col xl="4">
              <Widget3 />
            </Col>
          </Row>
          <Row>
            <Col xl="8">
              <Widget4 />
              <Widget5 />
              <Row portletFill="md">
                <Col md="6">
                  <Widget12 />
                  <Widget13 />
                  <Row portletFill="sm">
                    <Col sm="6">
                      <Widget16 />
                      <Widget17 />
                    </Col>
                    <Col sm="6">
                      <Widget18 />
                      <Widget19 />
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <Widget14 />
                  <Widget15 />
                  <Row portletFill="sm">
                    <Col sm="6">
                      <Widget20 />
                    </Col>
                    <Col sm="6">
                      <Widget21 />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xl="4">
              <Row portletFill="md">
                <Col md="6" xl="12">
                  <Widget6 />
                  <Widget7 />
                  <Widget8 />
                </Col>
                <Col md="6" xl="12">
                  <Widget9 />
                  <Widget10 />
                  <Widget11 />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(WidgetsGeneralPage)))
