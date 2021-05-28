import { Row, Col, Badge, Button, Portlet, Container, DemoWrapper } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class BadgePage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Badge")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Badge", link: "/elements/base/badge" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Badge | Panely</title>
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
                  <Row>
                    <Col md="6">
                      {/* BEGIN Portlet */}
                      <Portlet>
                        <Portlet.Header bordered>
                          <Portlet.Title>Solid</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          <p>
                            Use <code>variant</code> property to apply contextual colors
                          </p>
                          {/* BEGIN Badges */}
                          <DemoWrapper>
                            <Badge variant="primary">Primary</Badge>{" "}
                            <Badge variant="secondary">Secondary</Badge>{" "}
                            <Badge variant="success">Success</Badge>{" "}
                            <Badge variant="info">Info</Badge>{" "}
                            <Badge variant="warning">Warning</Badge>{" "}
                            <Badge variant="danger">Danger</Badge>{" "}
                            <Badge variant="dark">Dark</Badge>{" "}
                            <Badge variant="light">Light</Badge>
                          </DemoWrapper>
                          {/* END Badges */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Outline</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          <p>
                            Fill <code>variant</code> property with <code>outline-(color)</code> to
                            apply these variants
                          </p>
                          {/* BEGIN Badges */}
                          <DemoWrapper>
                            <Badge variant="outline-primary">Primary</Badge>{" "}
                            <Badge variant="outline-secondary">Secondary</Badge>{" "}
                            <Badge variant="outline-success">Success</Badge>{" "}
                            <Badge variant="outline-info">Info</Badge>{" "}
                            <Badge variant="outline-warning">Warning</Badge>{" "}
                            <Badge variant="outline-danger">Danger</Badge>{" "}
                            <Badge variant="outline-dark">Dark</Badge>{" "}
                            <Badge variant="outline-light">Light</Badge>
                          </DemoWrapper>
                          {/* END Badges */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="6">
                      {/* BEGIN Portlet */}
                      <Portlet>
                        <Portlet.Header bordered>
                          <Portlet.Title>Label</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          <p>
                            Fill <code>variant</code> property with <code>label-(color)</code> to
                            apply these variants
                          </p>
                          {/* BEGIN Badges */}
                          <DemoWrapper>
                            <Badge variant="label-primary">Primary</Badge>{" "}
                            <Badge variant="label-secondary">Secondary</Badge>{" "}
                            <Badge variant="label-success">Success</Badge>{" "}
                            <Badge variant="label-info">Info</Badge>{" "}
                            <Badge variant="label-warning">Warning</Badge>{" "}
                            <Badge variant="label-danger">Danger</Badge>{" "}
                            <Badge variant="label-dark">Dark</Badge>{" "}
                            <Badge variant="label-light">Light</Badge>
                          </DemoWrapper>
                          {/* END Badges */}
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
                            Fill <code>variant</code> property with <code>text-(color)</code> to
                            apply these variants
                          </p>
                          {/* BEGIN Badges */}
                          <DemoWrapper>
                            <Badge variant="text-primary">Primary</Badge>{" "}
                            <Badge variant="text-secondary">Secondary</Badge>{" "}
                            <Badge variant="text-success">Success</Badge>{" "}
                            <Badge variant="text-info">Info</Badge>{" "}
                            <Badge variant="text-warning">Warning</Badge>{" "}
                            <Badge variant="text-danger">Danger</Badge>{" "}
                            <Badge variant="text-dark">Dark</Badge>{" "}
                            <Badge variant="text-light">Light</Badge>
                          </DemoWrapper>
                          {/* END Badges */}
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
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Sizing</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Change your badges size by setting <code>size</code> property with{" "}
                    <code>lg|xl</code> values.
                  </p>
                  {/* BEGIN Badges */}
                  <DemoWrapper>
                    <Badge variant="primary">Primary</Badge>{" "}
                    <Badge variant="secondary">Secondary</Badge>{" "}
                    <Badge variant="success">Success</Badge>{" "}
                    <Badge variant="info">Info</Badge>{" "}
                    <Badge variant="warning">Warning</Badge>{" "}
                    <Badge variant="danger">Danger</Badge>
                  </DemoWrapper>
                  {/* END Badges */}
                  <div className="m-4" />
                  {/* BEGIN Badges */}
                  <DemoWrapper>
                    <Badge variant="primary" size="lg">
                      Primary
                    </Badge>{" "}
                    <Badge variant="secondary" size="lg">
                      Secondary
                    </Badge>{" "}
                    <Badge variant="success" size="lg">
                      Success
                    </Badge>{" "}
                    <Badge variant="info" size="lg">
                      Info
                    </Badge>{" "}
                    <Badge variant="warning" size="lg">
                      Warning
                    </Badge>{" "}
                    <Badge variant="danger" size="lg">
                      Danger
                    </Badge>
                  </DemoWrapper>
                  {/* END Badges */}
                  <div className="m-4" />
                  {/* BEGIN Badges */}
                  <DemoWrapper>
                    <Badge variant="primary" size="xl">
                      Primary
                    </Badge>{" "}
                    <Badge variant="secondary" size="xl">
                      Secondary
                    </Badge>{" "}
                    <Badge variant="success" size="xl">
                      Success
                    </Badge>{" "}
                    <Badge variant="info" size="xl">
                      Info
                    </Badge>{" "}
                    <Badge variant="warning" size="xl">
                      Warning
                    </Badge>{" "}
                    <Badge variant="danger" size="xl">
                      Danger
                    </Badge>
                  </DemoWrapper>
                  {/* END Badges */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Shaped badges</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Make your badge into a circle or square shape by setting <code>shape</code>{" "}
                    property with <code>circle|square</code> values.
                  </p>
                  <Row>
                    <Col md="6">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Circle</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN Badges */}
                          <DemoWrapper>
                            <Badge variant="primary" shape="circle">
                              A
                            </Badge>{" "}
                            <Badge variant="outline-secondary" size="lg" shape="circle">
                              B
                            </Badge>{" "}
                            <Badge variant="label-success" size="xl" shape="circle">
                              C
                            </Badge>{" "}
                            <Badge variant="warning" shape="circle">
                              D
                            </Badge>{" "}
                            <Badge variant="outline-danger" size="lg" shape="circle">
                              E
                            </Badge>{" "}
                            <Badge variant="label-dark" size="xl" shape="circle">
                              F
                            </Badge>
                          </DemoWrapper>
                          {/* END Badges */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="6">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Square</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN Badges */}
                          <DemoWrapper>
                            <Badge variant="primary" shape="square">
                              A
                            </Badge>{" "}
                            <Badge variant="outline-secondary" size="lg" shape="square">
                              B
                            </Badge>{" "}
                            <Badge variant="label-success" size="xl" shape="square">
                              C
                            </Badge>{" "}
                            <Badge variant="warning" shape="square">
                              D
                            </Badge>{" "}
                            <Badge variant="outline-danger" size="lg" shape="square">
                              E
                            </Badge>{" "}
                            <Badge variant="label-dark" size="xl" shape="square">
                              F
                            </Badge>
                          </DemoWrapper>
                          {/* END Badges */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                  </Row>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Links</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    If you add <code>href</code> property to the badge elements quickly provide{" "}
                    <em>actionable</em> badges with hover and focus states. Badge element will
                    transform as <code>{"<a>"}</code> tag
                  </p>
                  {/* BEGIN Badges */}
                  <DemoWrapper>
                    <Badge href="#" variant="primary">
                      Primary
                    </Badge>{" "}
                    <Badge href="#" variant="outline-secondary">
                      Secondary
                    </Badge>{" "}
                    <Badge href="#" variant="label-success">
                      Success
                    </Badge>{" "}
                    <Badge href="#" variant="label-info">
                      Info
                    </Badge>{" "}
                    <Badge href="#" variant="outline-warning">
                      Warning
                    </Badge>{" "}
                    <Badge href="#" variant="text-danger">
                      Danger
                    </Badge>{" "}
                    <Badge href="#" variant="text-dark">
                      Dark
                    </Badge>{" "}
                    <Badge href="#" variant="light">
                      Light
                    </Badge>
                  </DemoWrapper>
                  {/* END Badges */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Pill badges</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add <code>pill</code> prooperty to make badge element more rounded.
                  </p>
                  {/* BEGIN Badges */}
                  <DemoWrapper>
                    <Badge pill variant="primary">
                      Primary
                    </Badge>{" "}
                    <Badge pill variant="secondary">
                      Secondary
                    </Badge>{" "}
                    <Badge pill variant="success">
                      Success
                    </Badge>{" "}
                    <Badge pill variant="info">
                      Info
                    </Badge>{" "}
                    <Badge pill variant="warning">
                      Warning
                    </Badge>{" "}
                    <Badge pill variant="danger">
                      Danger
                    </Badge>{" "}
                    <Badge pill variant="dark">
                      Dark
                    </Badge>{" "}
                    <Badge pill variant="light">
                      Light
                    </Badge>
                  </DemoWrapper>
                  {/* END Badges */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Examples</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Row>
                    <Col md="6">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Header with badge</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          <h5 className="mb-0">
                            Heading <Badge variant="primary">badge</Badge>
                          </h5>
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="6">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Badge inside button</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          <Button variant="primary">
                            Notification <Badge variant="secondary">+ 10</Badge>
                          </Button>
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
        </Container>
      </React.Fragment>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(BadgePage)))
