import { Row, Col, Alert, Portlet, Container } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class AlertPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Alert")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Alert", link: "/elements/base/alert" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Alert | Panely</title>
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
                    <strong>Alerts</strong> are available for any length of text, as well as an
                    optional dismiss button. For proper styling, use one of the eight{" "}
                    <strong>required</strong> contextual classes
                  </p>
                  <Row>
                    <Col md="4">
                      {/* BEGIN Portlet */}
                      <Portlet>
                        <Portlet.Header bordered>
                          <Portlet.Title>Solid</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          <p>
                            Use <code>variant</code> property to apply contextual colors
                          </p>
                          {/* BEGIN Alerts */}
                          <Alert variant="primary">Primary</Alert>
                          <Alert variant="secondary">Secondary</Alert>
                          <Alert variant="info">Info</Alert>
                          <Alert variant="warning">Warning</Alert>
                          <Alert variant="danger">Danger</Alert>
                          <Alert variant="success">Success</Alert>
                          <Alert variant="dark">Dark</Alert>
                          <Alert variant="light" className="mb-0">Light</Alert>
                          {/* END Alerts */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="4">
                      {/* BEGIN Portlet */}
                      <Portlet>
                        <Portlet.Header bordered>
                          <Portlet.Title>Solid</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          <p>
                            Fill <code>variant</code> property with <code>outline-(color)</code> to
                            apply these variants
                          </p>
                          {/* BEGIN Alerts */}
                          <Alert variant="outline-primary">Primary</Alert>
                          <Alert variant="outline-secondary">Secondary</Alert>
                          <Alert variant="outline-info">Info</Alert>
                          <Alert variant="outline-warning">Warning</Alert>
                          <Alert variant="outline-danger">Danger</Alert>
                          <Alert variant="outline-success">Success</Alert>
                          <Alert variant="outline-dark">Dark</Alert>
                          <Alert variant="outline-light" className="mb-0">Light</Alert>
                          {/* END Alerts */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="4">
                      {/* BEGIN Portlet */}
                      <Portlet>
                        <Portlet.Header bordered>
                          <Portlet.Title>Solid</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          <p>
                            Fill <code>variant</code> property with <code>label-(color)</code> to
                            apply these variants
                          </p>
                          {/* BEGIN Alerts */}
                          <Alert variant="label-primary">Primary</Alert>
                          <Alert variant="label-secondary">Secondary</Alert>
                          <Alert variant="label-info">Info</Alert>
                          <Alert variant="label-warning">Warning</Alert>
                          <Alert variant="label-danger">Danger</Alert>
                          <Alert variant="label-success">Success</Alert>
                          <Alert variant="label-dark">Dark</Alert>
                          <Alert variant="label-light" className="mb-0">Light</Alert>
                          {/* END Alerts */}
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
                  <Portlet.Title>Links</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Use the <code>Alert.Link</code> component to quickly provide matching colored
                    links within any alert.
                  </p>
                  {/* BEGIN Alerts */}
                  <Alert variant="primary">
                    A simple alert with <Alert.Link href="#">an example link</Alert.Link>.
                    Give it a click if you like.
                  </Alert>
                  <Alert variant="outline-secondary">
                    A simple alert with <Alert.Link href="#">an example link</Alert.Link>.
                    Give it a click if you like.
                  </Alert>
                  <Alert variant="label-success" className="mb-0">
                    A simple alert with <Alert.Link href="#">an example link</Alert.Link>.
                    Give it a click if you like.
                  </Alert>
                  {/* END Alerts */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Additional content</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Alerts can also contain additional HTML elements like headings, paragraphs and
                    dividers.
                  </p>
                  {/* BEGIN Alerts */}
                  <Alert variant="success">
                    <Alert.Header>Well done!</Alert.Header>
                    <p className="mb-0">
                      Aww yeah, you successfully read this important alert message. This example
                      text is going to run a bit longer so that you can see how spacing within an
                      alert works with this kind of content.
                    </p>
                  </Alert>
                  <Alert variant="outline-success" className="mb-0">
                    <Alert.Header>Well done!</Alert.Header>
                    <p>
                      Aww yeah, you successfully read this important alert message. This example
                      text is going to run a bit longer so that you can see how spacing within an
                      alert works with this kind of content.
                    </p>
                    <hr />
                    <p className="mb-0">
                      Whenever you need to, be sure to use margin utilities to keep things nice and
                      tidy.
                    </p>
                  </Alert>
                  {/* END Alerts */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Icon</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    If you want to put icon into alert element, you can use <code>icon</code>{" "}
                    property and fill it with your icon.
                  </p>
                  {/* BEGIN Alerts */}
                  <Alert variant="primary" icon={<FontAwesomeIcon icon={SolidIcon.faArchive} />}>
                    A simple primary alert with <Alert.Link href="#">an example link</Alert.Link>.
                    Give it a click if you like.
                  </Alert>
                  <Alert
                    variant="outline-secondary"
                    icon={<FontAwesomeIcon icon={SolidIcon.faWrench} />}
                  >
                    A simple primary alert with <Alert.Link href="#">an example link</Alert.Link>.
                    Give it a click if you like.
                  </Alert>
                  <Alert variant="label-success" icon={<FontAwesomeIcon icon={SolidIcon.faStar} />}>
                    A simple primary alert with <Alert.Link href="#">an example link</Alert.Link>.
                    Give it a click if you like.
                  </Alert>
                  {/* END Alerts */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Dismissible alert</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    It’s possible to dismiss any alert inline. For the most basic use-case an
                    uncontrolled component can provide the functionality wanted without the need to
                    manage/control the state of the component. <code>Alert.Uncontrolled</code> does
                    not require <code>isOpen</code> nor <code>toggle</code> props to work.
                  </p>
                  {/* BEGIN Alerts */}
                  <AlertControlled />
                  <Alert.Uncontrolled fade variant="outline-warning">
                    Holy guacamole! You should check in on some of those fields below.
                  </Alert.Uncontrolled>
                  <Alert.Uncontrolled
                    fade
                    variant="label-secondary"
                    className="mb-0"
                    icon={<FontAwesomeIcon icon={SolidIcon.faCog} />}
                  >
                    <Alert.Header>Well done!</Alert.Header>
                    <p>
                      Aww yeah, you successfully read this important alert message. This example
                      text is going to run a bit longer so that you can see how spacing within an
                      alert works with this kind of content.
                    </p>
                    <hr />
                    <p className="mb-0">
                      Whenever you need to, be sure to use margin utilities to keep things nice and
                      tidy.
                    </p>
                  </Alert.Uncontrolled>
                  {/* END Alerts */}
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

// Controlled Alert example
class AlertControlled extends React.Component {
  // Default state
  state = { isOpen: true }

  // Handle dismiss button on alert elements
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <Alert
        isOpen={this.state.isOpen}
        toggle={this.toggle}
        variant="success"
        icon={<FontAwesomeIcon icon={SolidIcon.faStar} />}
        fade
      >
        Holy guacamole! You should check in on some of those fields below.
      </Alert>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(AlertPage)))
