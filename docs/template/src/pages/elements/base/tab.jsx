import { Row, Col, Nav, Tab, Card, Portlet, ListGroup, Container } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class TabPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Tab")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Tab", link: "/elements/base/tab" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Tab | Panely</title>
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
                    <Col md="4">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Body>
                          <BasicTab lines />
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="4">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Body>
                          <BasicTab pills />
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="4">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-0">
                        <Portlet.Body>
                          <BasicTab tabs />
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                  </Row>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>List group tab</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Row>
                    <Col md="6">
                      {/* BEGIN Portlet */}
                      <Portlet>
                        <Portlet.Body>
                          <ListGroupTab bordered />
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Body>
                          <ListGroupTab bordered />
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="6">
                      {/* BEGIN Portlet */}
                      <Portlet>
                        <Portlet.Body>
                          <ListGroupTab flush />
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-0">
                        <Portlet.Body>
                          <ListGroupTab bordered deck />
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                  </Row>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Portlet tab</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Row>
                    <Col md="4">
                      <PortletTab
                        portletProps={{ className: "mb-md-0" }}
                        navProps={{ lines: true, portlet: true }}
                      />
                    </Col>
                    <Col md="4">
                      <PortletTab
                        portletProps={{ className: "mb-md-0" }}
                        navProps={{ pills: true, portlet: true }}
                      />
                    </Col>
                    <Col md="4">
                      <PortletTab
                        portletProps={{ className: "mb-0" }}
                        navProps={{ tabs: true, portlet: true }}
                      />
                    </Col>
                  </Row>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Card tab</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Row>
                    <Col md="4" className="mb-3 mb-md-0">
                      <CardTab lines card />
                    </Col>
                    <Col md="4" className="mb-3 mb-md-0">
                      <CardTab pills card />
                    </Col>
                    <Col md="4">
                      <CardTab tabs card />
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

class BasicTab extends React.Component {
  // Default active tab id
  state = { activeTab: 1 }

  // Handle toggling tab
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="mb-3">
          {/* BEGIN Nav */}
          <Nav {...this.props}>
            <Nav.Item active={this.state.activeTab === 1} onClick={() => this.toggle(1)}>
              Home
            </Nav.Item>
            <Nav.Item active={this.state.activeTab === 2} onClick={() => this.toggle(2)}>
              Profile
            </Nav.Item>
            <Nav.Item active={this.state.activeTab === 3} onClick={() => this.toggle(3)}>
              Contact
            </Nav.Item>
          </Nav>
          {/* END Nav */}
        </div>
        {/* BEGIN Tab */}
        <Tab activeTab={this.state.activeTab}>
          <Tab.Pane tabId={1}>
            <p className="mb-0">
              It has survived not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
              release of Letraset sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Tab.Pane>
          <Tab.Pane tabId={2}>
            <p className="mb-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged
            </p>
          </Tab.Pane>
          <Tab.Pane tabId={3}>
            <p className="mb-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containLorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Tab.Pane>
        </Tab>
        {/* END Tab */}
      </React.Fragment>
    )
  }
}

class ListGroupTab extends React.Component {
  // Default active tab id
  state = { activeTab: 1 }

  // Handle toggling tab
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    return (
      <Row>
        <Col xs="4">
          {/* BEGIN List Group */}
          <ListGroup action {...this.props}>
            <ListGroup.Item active={this.state.activeTab === 1} onClick={() => this.toggle(1)}>
              Home
            </ListGroup.Item>
            <ListGroup.Item active={this.state.activeTab === 2} onClick={() => this.toggle(2)}>
              Profile
            </ListGroup.Item>
            <ListGroup.Item active={this.state.activeTab === 3} onClick={() => this.toggle(3)}>
              Contact
            </ListGroup.Item>
          </ListGroup>
          {/* END List Group */}
        </Col>
        <Col xs="8">
          {/* BEGIN Tab */}
          <Tab activeTab={this.state.activeTab}>
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
        </Col>
      </Row>
    )
  }
}

class PortletTab extends React.Component {
  // Default active tab id
  state = { activeTab: 1 }

  // Handle toggling tab
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    return (
      <Portlet {...this.props.portletProps}>
        <Portlet.Header bordered>
          <Portlet.Title>Portlet</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Nav */}
            <Nav {...this.props.navProps}>
              <Nav.Item active={this.state.activeTab === 1} onClick={() => this.toggle(1)}>
                Home
              </Nav.Item>
              <Nav.Item active={this.state.activeTab === 2} onClick={() => this.toggle(2)}>
                Profile
              </Nav.Item>
              <Nav.Item active={this.state.activeTab === 3} onClick={() => this.toggle(3)}>
                Contact
              </Nav.Item>
            </Nav>
            {/* END Nav */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Tab */}
          <Tab activeTab={this.state.activeTab}>
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

class CardTab extends React.Component {
  // Default active tab id
  state = { activeTab: 1 }

  // Handle toggling tab
  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    return (
      <Card>
        <Card.Header>
          {/* BEGIN Nav */}
          <Nav {...this.props}>
            <Nav.Item active={this.state.activeTab === 1} onClick={() => this.toggle(1)}>
              Home
            </Nav.Item>
            <Nav.Item active={this.state.activeTab === 2} onClick={() => this.toggle(2)}>
              Profile
            </Nav.Item>
            <Nav.Item active={this.state.activeTab === 3} onClick={() => this.toggle(3)}>
              Contact
            </Nav.Item>
          </Nav>
          {/* END Nav */}
        </Card.Header>
        <Card.Body>
          {/* BEGIN Tab */}
          <Tab activeTab={this.state.activeTab}>
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
        </Card.Body>
      </Card>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(TabPage)))
