import { Row, Col, Button, Marker, Portlet, Container, DemoWrapper } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class MarkerPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Marker")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Marker", link: "/elements/base/marker" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Marker | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Basic</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    <strong>Marker</strong> is component that you can use for marking something with
                    shape and color, you can combine it with many components. Marker by default has
                    3 different shapes, like the example below. Change marker color by applying{" "}
                    <code>variant</code> property
                  </p>
                  <Row>
                    <Col md="4">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Dot</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          <p>
                            Apply <code>type="dot"</code> property for this shape
                          </p>
                          {/* BEGIN Markers */}
                          <DemoWrapper>
                            <Marker type="dot" variant="primary" />{" "}
                            <Marker type="dot" variant="secondary" />{" "}
                            <Marker type="dot" variant="info" />{" "}
                            <Marker type="dot" variant="success" />{" "}
                            <Marker type="dot" variant="warning" />{" "}
                            <Marker type="dot" variant="danger" />{" "}
                            <Marker type="dot" variant="dark" />{" "}
                            <Marker type="dot" variant="light" />
                          </DemoWrapper>
                          {/* END Markers */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="4">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Circle</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          <p>
                            Apply <code>type="circle"</code> property for this shape
                          </p>
                          {/* BEGIN Markers */}
                          <DemoWrapper>
                            <Marker type="circle" variant="primary" />{" "}
                            <Marker type="circle" variant="secondary" />{" "}
                            <Marker type="circle" variant="info" />{" "}
                            <Marker type="circle" variant="success" />{" "}
                            <Marker type="circle" variant="warning" />{" "}
                            <Marker type="circle" variant="danger" />{" "}
                            <Marker type="circle" variant="dark" />{" "}
                            <Marker type="circle" variant="light" />
                          </DemoWrapper>
                          {/* END Markers */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="4">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Pill</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          <p>
                            Apply <code>type="pill"</code> property for this shape
                          </p>
                          {/* BEGIN Markers */}
                          <DemoWrapper>
                            <Marker type="pill" variant="primary" />{" "}
                            <Marker type="pill" variant="secondary" />{" "}
                            <Marker type="pill" variant="info" />{" "}
                            <Marker type="pill" variant="success" />{" "}
                            <Marker type="pill" variant="warning" />{" "}
                            <Marker type="pill" variant="danger" />{" "}
                            <Marker type="pill" variant="dark" />{" "}
                            <Marker type="pill" variant="light" />
                          </DemoWrapper>
                          {/* END Markers */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                  </Row>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
          </Row>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet className="mb-md-0">
                <Portlet.Header bordered>
                  <Portlet.Title>Sizing</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Change marker size to smaller or larger by setting <code>size</code> property
                    with <code>sm|lg</code>
                  </p>
                  {/* BEGIN Markers */}
                  <DemoWrapper>
                    <Marker type="dot" variant="primary" size="sm" />{" "}
                    <Marker type="dot" variant="success" />{" "}
                    <Marker type="dot" variant="danger" size="lg" />{" "}
                    <Marker type="circle" variant="primary" size="sm" />{" "}
                    <Marker type="circle" variant="success" />{" "}
                    <Marker type="circle" variant="danger" size="lg" />{" "}
                    <Marker type="pill" variant="primary" size="sm" />{" "}
                    <Marker type="pill" variant="success" />{" "}
                    <Marker type="pill" variant="danger" size="lg" />
                  </DemoWrapper>
                  {/* END Markers */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet className="mb-md-0">
                <Portlet.Header bordered>
                  <Portlet.Title>Usage</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>You can use marker element together with several elements.</p>
                  {/* BEGIN Buttons */}
                  <Button variant="primary">
                    Button
                    <Button.Marker>
                      <Marker type="dot" variant="success" />
                    </Button.Marker>
                  </Button>{" "}
                  <Button icon variant="primary">
                    <FontAwesomeIcon icon={SolidIcon.faStar} />
                    <Button.Marker>
                      <Marker type="dot" variant="success" />
                    </Button.Marker>
                  </Button>
                  {/* END Buttons */}
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(MarkerPage)))
