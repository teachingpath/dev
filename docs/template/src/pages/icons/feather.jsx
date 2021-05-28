import { Row, Col, Portlet, Container, Widget14 } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as FeatherIcon from "react-feather"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class FeatherPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Feather")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Icon" },
      { text: "Feather", link: "/icons/feather" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Feather | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Feather</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    <strong>Feather icons</strong> are simply beautiful open source icons that you
                    can use for your website. Check{" "}
                    <a href="http://feathericons.com" target="_blank">
                      Feather's homepage
                    </a>{" "}
                    for more information.
                  </p>
                  <hr />
                  <Row>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.AlertCircle />}>alert-circle</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.AlignCenter />}>align-center</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.AlignJustify />}>align-justify</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Anchor />}>anchor</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Archive />}>archive</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.ArrowDown />}>arrow-down</Widget14>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.ArrowUp />}>arrow-up</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.ArrowLeft />}>arrow-left</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.ArrowRight />}>arrow-right</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.AtSign />}>at-sign</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.BarChart />}>bar-chart</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Battery />}>battery</Widget14>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Clock />}>clock</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Cloud />}>cloud</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Code />}>code</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Columns />}>columns</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Copy />}>copy</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.CheckSquare />}>check-square</Widget14>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Bell />}>bell</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Book />}>book</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Bookmark />}>bookmark</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Camera />}>camera</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Cast />}>cast</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Clipboard />}>clipboard</Widget14>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.CreditCard />}>credit-card</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Crop />}>crop</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Database />}>database</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.DollarSign />}>dollar-sign</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Download />}>download</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Edit />}>edit</Widget14>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Eye />}>eye</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Grid />}>grid</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Hash />}>hash</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Headphones />}>headphones</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Home />}>home</Widget14>
                    </Col>
                    <Col md="2">
                      <Widget14 icon={<FeatherIcon.Image />}>image</Widget14>
                    </Col>
                  </Row>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(FeatherPage)))
