import { Row, Col, Nav, Tab, Button, Portlet, Dropdown, Container } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class PortletTabPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Portlet Tab")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Portlet" },
      { text: "Tab", link: "/portlet/tab" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Portlet Tab | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="4">
              <PortletTab1 />
            </Col>
            <Col md="4">
              <PortletTab2 />
            </Col>
            <Col md="4">
              <PortletTab3 />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <PortletTab4 />
              <PortletTab5 />
            </Col>
            <Col md="6">
              <PortletTab6 />
              <PortletTab7 />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

class PortletTab1 extends React.Component {
  // Default active tab id
  state = { activeTab: 1 }

  // Handle toggle tab event
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    const { activeTab } = this.state

    return (
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Title>Line</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Nav */}
            <Nav lines portlet>
              <Nav.Item active={activeTab === 1} onClick={() => this.toggle(1)}>
                Home
              </Nav.Item>
              <Nav.Item active={activeTab === 2} onClick={() => this.toggle(2)}>
                Profile
              </Nav.Item>
              <Nav.Item active={activeTab === 3} onClick={() => this.toggle(3)}>
                Contact
              </Nav.Item>
            </Nav>
            {/* END Nav */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Tab */}
          <Tab activeTab={activeTab}>
            <Tab.Pane tabId={1}>
              <p className="mb-0">
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={2}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={3}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containLorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </Tab.Pane>
          </Tab>
          {/* END Tab */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

class PortletTab2 extends React.Component {
  // Default active tab id
  state = { activeTab: 1 }

  // Handle toggle tab event
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    const { activeTab } = this.state

    return (
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Title>Pill</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Nav */}
            <Nav pills portlet>
              <Nav.Item active={activeTab === 1} onClick={() => this.toggle(1)}>
                Home
              </Nav.Item>
              <Nav.Item active={activeTab === 2} onClick={() => this.toggle(2)}>
                Profile
              </Nav.Item>
              <Nav.Item active={activeTab === 3} onClick={() => this.toggle(3)}>
                Contact
              </Nav.Item>
            </Nav>
            {/* END Nav */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Tab */}
          <Tab activeTab={activeTab}>
            <Tab.Pane tabId={1}>
              <p className="mb-0">
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={2}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={3}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containLorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </Tab.Pane>
          </Tab>
          {/* END Tab */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

class PortletTab3 extends React.Component {
  // Default active tab id
  state = { activeTab: 1 }

  // Handle toggle tab event
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    const { activeTab } = this.state

    return (
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Title>Tab</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Nav */}
            <Nav tabs portlet>
              <Nav.Item active={activeTab === 1} onClick={() => this.toggle(1)}>
                Home
              </Nav.Item>
              <Nav.Item active={activeTab === 2} onClick={() => this.toggle(2)}>
                Profile
              </Nav.Item>
              <Nav.Item active={activeTab === 3} onClick={() => this.toggle(3)}>
                Contact
              </Nav.Item>
            </Nav>
            {/* END Nav */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Tab */}
          <Tab activeTab={activeTab}>
            <Tab.Pane tabId={1}>
              <p className="mb-0">
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={2}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={3}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containLorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </Tab.Pane>
          </Tab>
          {/* END Tab */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

class PortletTab4 extends React.Component {
  // Default active tab id
  state = { activeTab: 1 }

  // Handle toggle tab event
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    const { activeTab } = this.state

    return (
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faMapMarkerAlt} />
          </Portlet.Icon>
          <Portlet.Title>Icon</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Nav */}
            <Nav lines portlet>
              <Nav.Item active={activeTab === 1} onClick={() => this.toggle(1)}>
                Home
              </Nav.Item>
              <Nav.Item active={activeTab === 2} onClick={() => this.toggle(2)}>
                Profile
              </Nav.Item>
              <Nav.Item active={activeTab === 3} onClick={() => this.toggle(3)}>
                Contact
              </Nav.Item>
            </Nav>
            {/* END Nav */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Tab */}
          <Tab activeTab={activeTab}>
            <Tab.Pane tabId={1}>
              <p className="mb-0">
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={2}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={3}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containLorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </Tab.Pane>
          </Tab>
          {/* END Tab */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

class PortletTab5 extends React.Component {
  // Default active tab id
  state = { activeTab: 1 }

  // Handle toggle tab event
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    const { activeTab } = this.state

    return (
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Title>Dropdown</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Nav */}
            <Nav pills portlet>
              <Nav.Item active={activeTab === 1} onClick={() => this.toggle(1)}>
                Home
              </Nav.Item>
              <Nav.Item active={activeTab === 2} onClick={() => this.toggle(2)}>
                Profile
              </Nav.Item>
              {/* BEGIN Dropdown */}
              <Dropdown.Uncontrolled nav>
                <Dropdown.Toggle nav caret>
                  Dropdown
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Action</Dropdown.Item>
                  <Dropdown.Item>Another Action</Dropdown.Item>
                  <Dropdown.Item>Something else here</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Separated link</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Uncontrolled>
              {/* END Dropdown */}
              <Nav.Item active={activeTab === 3} onClick={() => this.toggle(3)}>
                Contact
              </Nav.Item>
            </Nav>
            {/* END Nav */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Tab */}
          <Tab activeTab={activeTab}>
            <Tab.Pane tabId={1}>
              <p className="mb-0">
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={2}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={3}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containLorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </Tab.Pane>
          </Tab>
          {/* END Tab */}
        </Portlet.Body>
        <Portlet.Footer bordered align="right">
          <Button variant="primary">Submit</Button>{" "}
          <Button variant="outline-secondary">Cancel</Button>
        </Portlet.Footer>
      </Portlet>
    )
  }
}

class PortletTab6 extends React.Component {
  // Default active tab id
  state = { activeTab: 1 }

  // Handle toggle tab event
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    const { activeTab } = this.state

    return (
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faLayerGroup} />
          </Portlet.Icon>
          <Portlet.Title>Footer</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Nav */}
            <Nav pills portlet>
              <Nav.Item active={activeTab === 1} onClick={() => this.toggle(1)}>
                Home
              </Nav.Item>
              <Nav.Item active={activeTab === 2} onClick={() => this.toggle(2)}>
                Profile
              </Nav.Item>
              <Nav.Item active={activeTab === 3} onClick={() => this.toggle(3)}>
                Contact
              </Nav.Item>
            </Nav>
            {/* END Nav */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Tab */}
          <Tab activeTab={activeTab}>
            <Tab.Pane tabId={1}>
              <p className="mb-0">
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={2}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={3}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containLorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </Tab.Pane>
          </Tab>
          {/* END Tab */}
        </Portlet.Body>
        <Portlet.Footer bordered align="right">
          <Button variant="primary">Submit</Button>{" "}
          <Button variant="outline-secondary">Cancel</Button>
        </Portlet.Footer>
      </Portlet>
    )
  }
}

class PortletTab7 extends React.Component {
  // Default active tab id
  state = { activeTab: 1 }

  // Handle toggle tab event
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    const { activeTab } = this.state

    return (
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Addon>
            {/* BEGIN Nav */}
            <Nav lines portlet>
              <Nav.Item active={activeTab === 1} onClick={() => this.toggle(1)}>
                Home
              </Nav.Item>
              <Nav.Item active={activeTab === 2} onClick={() => this.toggle(2)}>
                Profile
              </Nav.Item>
              <Nav.Item active={activeTab === 3} onClick={() => this.toggle(3)}>
                Contact
              </Nav.Item>
            </Nav>
            {/* END Nav */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Tab */}
          <Tab activeTab={activeTab}>
            <Tab.Pane tabId={1}>
              <p className="mb-0">
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={2}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </Tab.Pane>
            <Tab.Pane tabId={3}>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containLorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </Tab.Pane>
          </Tab>
          {/* END Tab */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(PortletTabPage)))
