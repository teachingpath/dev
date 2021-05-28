import { Row, Col, Nav, Badge, Caret, Portlet, Dropdown, Container } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"
import Link from "next/link"

class NavPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Nav")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Nav", link: "/elements/base/nav" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Navigation | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Basic</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    The base <code>Nav</code> component is built with flexbox and provide a strong
                    foundation for building all types of navigation components. It includes some
                    style overrides (for working with lists), some link padding for larger hit
                    areas, and basic disabled styling.
                  </p>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Default</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>This is basic example for nav components</p>
                      {/* BEGIN Nav */}
                      <Nav>
                        <Nav.Item href="#" active>Active</Nav.Item>
                        <Nav.Item href="#">Link</Nav.Item>
                        {/* BEGIN Dropdown */}
                        <Dropdown.Uncontrolled nav>
                          <Dropdown.Toggle nav caret>
                            Dropdown
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another Action</Dropdown.Item>
                            <Dropdown.Item>Something else here</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown.Uncontrolled>
                        {/* END Dropdown */}
                        <Nav.Item href="#" disabled>Disabled</Nav.Item>
                      </Nav>
                      {/* END Nav */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Pill</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        Take that same HTML, but add <code>pills</code> property
                      </p>
                      {/* BEGIN Nav */}
                      <Nav pills>
                        <Nav.Item href="#" active>Active</Nav.Item>
                        <Nav.Item href="#">Link</Nav.Item>
                        {/* BEGIN Dropdown */}
                        <Dropdown.Uncontrolled nav>
                          <Dropdown.Toggle nav caret>
                            Dropdown
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another Action</Dropdown.Item>
                            <Dropdown.Item>Something else here</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown.Uncontrolled>
                        {/* END Dropdown */}
                        <Nav.Item href="#" disabled>Disabled</Nav.Item>
                      </Nav>
                      {/* END Nav */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Tab</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        Takes the basic nav from above and adds the <code>tabs</code> property to
                        generate a tabbed interface.
                      </p>
                      {/* BEGIN Nav */}
                      <Nav tabs>
                        <Nav.Item href="#" active>Active</Nav.Item>
                        <Nav.Item href="#">Link</Nav.Item>
                        {/* BEGIN Dropdown */}
                        <Dropdown.Uncontrolled nav>
                          <Dropdown.Toggle nav caret>
                            Dropdown
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another Action</Dropdown.Item>
                            <Dropdown.Item>Something else here</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown.Uncontrolled>
                        {/* END Dropdown */}
                        <Nav.Item href="#" disabled>Disabled</Nav.Item>
                      </Nav>
                      {/* END Nav */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Header bordered>
                      <Portlet.Title>Line</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        Take that same HTML, but use <code>lines</code> property
                      </p>
                      {/* BEGIN Nav */}
                      <Nav lines>
                        <Nav.Item href="#" active>Active</Nav.Item>
                        <Nav.Item href="#">Link</Nav.Item>
                        {/* BEGIN Dropdown */}
                        <Dropdown.Uncontrolled nav>
                          <Dropdown.Toggle nav caret>
                            Dropdown
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another Action</Dropdown.Item>
                            <Dropdown.Item>Something else here</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown.Uncontrolled>
                        {/* END Dropdown */}
                        <Nav.Item href="#" disabled>Disabled</Nav.Item>
                      </Nav>
                      {/* END Nav */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Additional elements</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    You can combine other elements such as{" "}
                    <Link href="/elements/base/badge">badge</Link>, icon or caret to separate nav
                    items, we provide <code>Nav.Addon</code> for wrapping those elements.
                  </p>
                  {/* BEGIN Nav */}
                  <Nav pills vertical>
                    <Nav.Item href="#">
                      <Nav.Content>Link</Nav.Content>
                      <Nav.Addon addonType="append">
                        <Caret />
                      </Nav.Addon>
                    </Nav.Item>
                    <Nav.Item href="#" active>
                      <Nav.Addon addonType="prepend">
                        <Nav.Icon>
                          <FontAwesomeIcon icon={SolidIcon.faArchive} />
                        </Nav.Icon>
                      </Nav.Addon>
                      <Nav.Content>Link</Nav.Content>
                    </Nav.Item>
                    <Nav.Item href="#">
                      <Nav.Addon addonType="prepend">
                        <Nav.Icon>
                          <FontAwesomeIcon icon={SolidIcon.faCog} />
                        </Nav.Icon>
                      </Nav.Addon>
                      <Nav.Content>Link</Nav.Content>
                      <Nav.Addon addonType="append">
                        <Caret />
                      </Nav.Addon>
                    </Nav.Item>
                    <Nav.Item href="#" disabled>
                      <Nav.Addon addonType="prepend">
                        <Nav.Icon>
                          <FontAwesomeIcon icon={SolidIcon.faPaperPlane} />
                        </Nav.Icon>
                      </Nav.Addon>
                      <Nav.Content>Link</Nav.Content>
                      <Nav.Addon addonType="append">
                        <Badge pill variant="warning">
                          2
                        </Badge>
                      </Nav.Addon>
                    </Nav.Item>
                  </Nav>
                  {/* END Nav */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Sizing</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add <code>size</code> property and fill it with <code>lg|sm</code> to make
                    navigations are larger or smaller
                  </p>
                  {/* BEGIN Nav */}
                  <Nav pills size="sm" className="mb-3">
                    <Nav.Item href="#" active>Active</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#" disabled>Disabled</Nav.Item>
                  </Nav>
                  {/* END Nav */}
                  {/* BEGIN Nav */}
                  <Nav pills className="mb-3">
                    <Nav.Item href="#" active>Active</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#" disabled>Disabled</Nav.Item>
                  </Nav>
                  {/* END Nav */}
                  {/* BEGIN Nav */}
                  <Nav pills size="lg">
                    <Nav.Item href="#" active>Active</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#" disabled>Disabled</Nav.Item>
                  </Nav>
                  {/* END Nav */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Vertical</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add <code>vertical</code> property to <code>Nav</code> elements for applying
                    vertical appearance, but this feature is not supported for tabs interface.
                  </p>
                  <Row>
                    <Col sm="6">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-sm-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Pill</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN Nav */}
                          <Nav pills vertical>
                            <Nav.Item href="#" active>Active</Nav.Item>
                            <Nav.Item href="#">Link</Nav.Item>
                            <Nav.Item href="#">Link</Nav.Item>
                            <Nav.Item href="#" disabled>Disabled</Nav.Item>
                          </Nav>
                          {/* END Nav */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col sm="6">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Line</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN Nav */}
                          <Nav lines vertical>
                            <Nav.Item href="#" active>Active</Nav.Item>
                            <Nav.Item href="#">Link</Nav.Item>
                            <Nav.Item href="#">Link</Nav.Item>
                            <Nav.Item href="#" disabled>Disabled</Nav.Item>
                          </Nav>
                          {/* END Nav */}
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
                  <Portlet.Title>Alignment</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Change the horizontal alignment of your nav with <code>horizontal</code>{" "}
                    property with <code>start|center|end</code>. By default, navs are left-aligned,
                    but you can easily change them to center or right aligned.
                  </p>
                  {/* BEGIN Nav */}
                  <Nav horizontal="start" className="mb-3">
                    <Nav.Item href="#" active>Active</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#" disabled>Disabled</Nav.Item>
                  </Nav>
                  {/* END Nav */}
                  {/* BEGIN Nav */}
                  <Nav horizontal="center" className="mb-3">
                    <Nav.Item href="#" active>Active</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#" disabled>Disabled</Nav.Item>
                  </Nav>
                  {/* END Nav */}
                  {/* BEGIN Nav */}
                  <Nav horizontal="end">
                    <Nav.Item href="#" active>Active</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#" disabled>Disabled</Nav.Item>
                  </Nav>
                  {/* END Nav */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Fill and justify</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Force your <code>Nav</code>'s contents to extend the full available width. To
                    proportionately fill all available space with your <code>Nav.Item</code>s, use{" "}
                    <code>fill</code> property. For equal-width elements, use <code>justified</code>{" "}
                    property. All horizontal space will be occupied by nav links.
                  </p>
                  {/* BEGIN Nav */}
                  <Nav pills fill className="mb-3">
                    <Nav.Item href="#" active>Active</Nav.Item>
                    <Nav.Item href="#">Longer link</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#" disabled>Disabled</Nav.Item>
                  </Nav>
                  {/* END Nav */}
                  {/* BEGIN Nav */}
                  <Nav pills justified>
                    <Nav.Item href="#" active>Active</Nav.Item>
                    <Nav.Item href="#">Longer link</Nav.Item>
                    <Nav.Item href="#">Link</Nav.Item>
                    <Nav.Item href="#" disabled>Disabled</Nav.Item>
                  </Nav>
                  {/* END Nav */}
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(NavPage)))
