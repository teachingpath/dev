import { Row, Col, Button, Marker, Portlet, Container, DemoWrapper } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import * as FeatherIcon from "react-feather"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"
import Link from "next/link"

class ButtonPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Button")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Button", link: "/elements/base/button" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Button | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Variants</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Solid</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        These is a standard button variant, you can use it by setting{" "}
                        <code>variant</code> property with contextual color
                      </p>
                      {/* BEGIN Buttons */}
                      <DemoWrapper>
                        <Button variant="primary">Primary</Button>{" "}
                        <Button variant="secondary">Secondary</Button>{" "}
                        <Button variant="success">Success</Button>{" "}
                        <Button variant="warning">Warning</Button>{" "}
                        <Button variant="danger">Danger</Button>{" "}
                        <Button variant="info">Info</Button>{" "}
                        <Button variant="dark">Dark</Button>{" "}
                        <Button variant="light">Light</Button>
                      </DemoWrapper>
                      {/* END Buttons */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Outline</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        Replace the default <code>variant</code> property value with{" "}
                        <code>outline-(color)</code> to apply these variants
                      </p>
                      {/* BEGIN Buttons */}
                      <DemoWrapper>
                        <Button variant="outline-primary">Primary</Button>{" "}
                        <Button variant="outline-secondary">Secondary</Button>{" "}
                        <Button variant="outline-success">Success</Button>{" "}
                        <Button variant="outline-warning">Warning</Button>{" "}
                        <Button variant="outline-danger">Danger</Button>{" "}
                        <Button variant="outline-info">Info</Button>{" "}
                        <Button variant="outline-dark">Dark</Button>{" "}
                        <Button variant="outline-light">Light</Button>
                      </DemoWrapper>
                      {/* END Buttons */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Flat</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        Replace the default <code>variant</code> property value with{" "}
                        <code>flat-(color)</code> to apply these variants
                      </p>
                      {/* BEGIN Buttons */}
                      <DemoWrapper>
                        <Button variant="flat-primary">Primary</Button>{" "}
                        <Button variant="flat-secondary">Secondary</Button>{" "}
                        <Button variant="flat-success">Success</Button>{" "}
                        <Button variant="flat-warning">Warning</Button>{" "}
                        <Button variant="flat-danger">Danger</Button>{" "}
                        <Button variant="flat-info">Info</Button>{" "}
                        <Button variant="flat-dark">Dark</Button>{" "}
                        <Button variant="flat-light">Light</Button>
                      </DemoWrapper>
                      {/* END Buttons */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Label</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        Replace the default <code>variant</code> property value with{" "}
                        <code>label-(color)</code> to apply these variants
                      </p>
                      {/* BEGIN Buttons */}
                      <DemoWrapper>
                        <Button variant="label-primary">Primary</Button>{" "}
                        <Button variant="label-secondary">Secondary</Button>{" "}
                        <Button variant="label-success">Success</Button>{" "}
                        <Button variant="label-warning">Warning</Button>{" "}
                        <Button variant="label-danger">Danger</Button>{" "}
                        <Button variant="label-info">Info</Button>{" "}
                        <Button variant="label-dark">Dark</Button>{" "}
                        <Button variant="label-light">Light</Button>
                      </DemoWrapper>
                      {/* END Buttons */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Header bordered>
                      <Portlet.Title>Text</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        Replace the default <code>variant</code> property value with{" "}
                        <code>text-(color)</code> to apply these variants
                      </p>
                      {/* BEGIN Buttons */}
                      <DemoWrapper>
                        <Button variant="text-primary">Primary</Button>{" "}
                        <Button variant="text-secondary">Secondary</Button>{" "}
                        <Button variant="text-success">Success</Button>{" "}
                        <Button variant="text-warning">Warning</Button>{" "}
                        <Button variant="text-danger">Danger</Button>{" "}
                        <Button variant="text-info">Info</Button>{" "}
                        <Button variant="text-dark">Dark</Button>{" "}
                        <Button variant="text-light">Light</Button>
                      </DemoWrapper>
                      {/* END Buttons */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
          </Row>
          <Row>
            <Col md="7">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Pill buttons</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Extend button element with <code>pill</code> property to make the button more
                    rounded.
                  </p>
                  {/* BEGIN Buttons */}
                  <DemoWrapper>
                    <Button pill variant="label-primary">Primary</Button>{" "}
                    <Button pill variant="label-secondary">Secondary</Button>{" "}
                    <Button pill variant="outline-success">Success</Button>{" "}
                    <Button pill variant="outline-warning">Warning</Button>{" "}
                    <Button pill variant="flat-danger">Danger</Button>{" "}
                    <Button pill variant="flat-info">Info</Button>{" "}
                    <Button pill variant="dark">Dark</Button>{" "}
                    <Button pill variant="light">Light</Button>
                  </DemoWrapper>
                  {/* END Buttons */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Sizing</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Make your button larger or smaller by setting <code>size</code> property with{" "}
                    <code>sm|lg</code> to button.
                  </p>
                  {/* BEGIN Buttons */}
                  <DemoWrapper>
                    <Button variant="primary" size="sm">Smaller</Button>{" "}
                    <Button variant="secondary">Default</Button>{" "}
                    <Button variant="success" size="lg">Larger</Button>{" "}
                    <Button icon variant="warning" size="sm">
                      <FontAwesomeIcon icon={SolidIcon.faStar} />
                    </Button>{" "}
                    <Button icon variant="danger">
                      <FontAwesomeIcon icon={SolidIcon.faCog} />
                    </Button>{" "}
                    <Button icon variant="info" size="lg">
                      <FontAwesomeIcon icon={SolidIcon.faWrench} />
                    </Button>{" "}
                    <Button icon circle variant="warning" size="sm">
                      <FontAwesomeIcon icon={SolidIcon.faStar} />
                    </Button>{" "}
                    <Button icon circle variant="danger">
                      <FontAwesomeIcon icon={SolidIcon.faCog} />
                    </Button>{" "}
                    <Button icon circle variant="info" size="lg">
                      <FontAwesomeIcon icon={SolidIcon.faWrench} />
                    </Button>{" "}
                    <Button pill variant="dark" size="sm">Smaller</Button>{" "}
                    <Button pill variant="success">Default</Button>{" "}
                    <Button pill variant="info" size="lg">Larger</Button>
                  </DemoWrapper>
                  {/* END Buttons */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Taller, wider and block</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    You can't use the properties below together with <code>icon</code> property
                  </p>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Wide</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        Fill <code>width</code> property with <code>wide|wider|widest</code> to make
                        your button wider
                      </p>
                      {/* BEGIN Buttons */}
                      <DemoWrapper>
                        <Button variant="primary" width="wide">Wide</Button>{" "}
                        <Button variant="primary" width="wider">Wider</Button>{" "}
                        <Button variant="primary" width="widest">Widest</Button>
                      </DemoWrapper>
                      {/* END Buttons */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Tall</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        Fill <code>height</code> property with <code>tall|taller|tallest</code> to
                        make your button taller
                      </p>
                      {/* BEGIN Buttons */}
                      <DemoWrapper>
                        <Button variant="primary" height="tall">Tall</Button>{" "}
                        <Button variant="primary" height="taller">Taller</Button>{" "}
                        <Button variant="primary" height="tallest">Tallest</Button>
                      </DemoWrapper>
                      {/* END Buttons */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Header bordered>
                      <Portlet.Title>Block</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        Add <code>block</code> property for full width button style.
                      </p>
                      {/* BEGIN Buttons */}
                      <Button block variant="primary">Block</Button>{" "}
                      <Button block variant="label-primary">Block</Button>
                      {/* END Buttons */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="5">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header>
                  <Portlet.Title>Button icon</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Square buttons</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        If you need square button with an icon inside, you can use <code>icon</code>{" "}
                        property.
                      </p>
                      {/* BEGIN Buttons */}
                      <DemoWrapper>
                        <Button icon variant="secondary">
                          <FeatherIcon.Anchor />
                        </Button>{" "}
                        <Button icon variant="outline-success">
                          <FeatherIcon.Archive />
                        </Button>{" "}
                        <Button icon variant="outline-warning">
                          <FeatherIcon.Camera />
                        </Button>{" "}
                        <Button icon variant="outline-info">
                          <FeatherIcon.Eye />
                        </Button>{" "}
                        <Button icon variant="primary">
                          <FontAwesomeIcon icon={SolidIcon.faTimes} />
                        </Button>{" "}
                        <Button icon variant="label-danger">
                          <FontAwesomeIcon icon={SolidIcon.faWrench} />
                        </Button>{" "}
                        <Button icon variant="label-info">
                          <FontAwesomeIcon icon={SolidIcon.faCog} />
                        </Button>{" "}
                        <Button icon variant="flat-primary">
                          <FontAwesomeIcon icon={SolidIcon.faBars} />
                        </Button>
                      </DemoWrapper>
                      {/* END Buttons */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Circle buttons</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        Make your icon buttons circular by extending button element with{" "}
                        <code>circle</code> property.
                      </p>
                      {/* BEGIN Buttons */}
                      <DemoWrapper>
                        <Button icon circle variant="secondary">
                          <FeatherIcon.Anchor />
                        </Button>{" "}
                        <Button icon circle variant="outline-success">
                          <FeatherIcon.Archive />
                        </Button>{" "}
                        <Button icon circle variant="outline-warning">
                          <FeatherIcon.Camera />
                        </Button>{" "}
                        <Button icon circle variant="outline-info">
                          <FeatherIcon.Eye />
                        </Button>{" "}
                        <Button icon circle variant="primary">
                          <FontAwesomeIcon icon={SolidIcon.faTimes} />
                        </Button>{" "}
                        <Button icon circle variant="label-danger">
                          <FontAwesomeIcon icon={SolidIcon.faWrench} />
                        </Button>{" "}
                        <Button icon circle variant="label-info">
                          <FontAwesomeIcon icon={SolidIcon.faCog} />
                        </Button>{" "}
                        <Button icon circle variant="flat-primary">
                          <FontAwesomeIcon icon={SolidIcon.faBars} />
                        </Button>
                      </DemoWrapper>
                      {/* END Buttons */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Icon with text</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        If you want to use icon with text, you don't need to apply <code>icon</code>{" "}
                        property
                      </p>
                      {/* BEGIN Buttons */}
                      <DemoWrapper>
                        <Button variant="primary">
                          <FeatherIcon.Eye className="mr-2" /> Button
                        </Button>{" "}
                        <Button variant="label-info">
                          Button <FeatherIcon.Camera className="ml-2" />
                        </Button>{" "}
                        <Button variant="outline-danger">
                          <FontAwesomeIcon icon={SolidIcon.faCog} className="mr-2" /> Button
                        </Button>{" "}
                        <Button variant="flat-success">
                          Button <FontAwesomeIcon icon={SolidIcon.faCheck} className="ml-2" />
                        </Button>
                      </DemoWrapper>
                      {/* END Buttons */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>States</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add <code>active</code> or <code>disabled</code> properties for the active or
                    inactive button appearance.
                  </p>
                  {/* BEGIN Buttons */}
                  <Button variant="primary" active>Active</Button>{" "}
                  <Button variant="primary" disabled>Disabled</Button>
                  {/* END Buttons */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Addon</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    You can add a counter or marker to button by adding <code>Button.Marker</code>{" "}
                    and <code>Button.Counter</code> element and combine with{" "}
                    <Link href="/elements/base/badge">badge</Link> or{" "}
                    <Link href="/elements/base/marker">marker</Link> component.
                  </p>
                  {/* BEGIN Buttons */}
                  <DemoWrapper>
                    <Button variant="primary">
                      Button
                      <Button.Marker>
                        <Button.Counter variant="secondary">12</Button.Counter>
                      </Button.Marker>
                    </Button>{" "}
                    <Button variant="primary">
                      Button
                      <Button.Marker>
                        <Button.Counter pill variant="secondary">12</Button.Counter>
                      </Button.Marker>
                    </Button>{" "}
                    <Button variant="primary">
                      Button
                      <Button.Marker>
                        <Marker variant="dot" variant="success" />
                      </Button.Marker>
                    </Button>{" "}
                    <Button icon variant="primary">
                      <FontAwesomeIcon icon={SolidIcon.faCog} />
                      <Button.Marker>
                        <Button.Counter variant="secondary">12</Button.Counter>
                      </Button.Marker>
                    </Button>{" "}
                    <Button icon variant="primary">
                      <FontAwesomeIcon icon={SolidIcon.faStar} />
                      <Button.Marker>
                        <Button.Counter pill variant="secondary">12</Button.Counter>
                      </Button.Marker>
                    </Button>{" "}
                    <Button icon variant="primary">
                      <FontAwesomeIcon icon={SolidIcon.faWrench} />
                      <Button.Marker>
                        <Marker variant="dot" variant="success" />
                      </Button.Marker>
                    </Button>
                  </DemoWrapper>
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(ButtonPage)))
