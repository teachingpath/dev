import { Row, Col, Badge, Button, Portlet, Dropdown, Container } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class PortletBasePage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Portlet")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Portlet" },
      { text: "Base", link: "/portlet/base" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Portlet | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header>
                  <Portlet.Title>Basic</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Bordered</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </Portlet.Body>
                <Portlet.Footer bordered>
                  <Button variant="primary">Submit</Button>{" "}
                  <Button variant="outline-secondary">Cancel</Button>
                </Portlet.Footer>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet scroll>
                <Portlet.Header bordered>
                  <Portlet.Title>Scrollable</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <h5>Scroll me</h5>
                  <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                    vestibulum at eros.
                  </p>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                  <p>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
                    vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla.
                  </p>
                  <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                    vestibulum at eros.
                  </p>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                  <p>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
                    vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla.
                  </p>
                  <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                    vestibulum at eros.
                  </p>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                  <p>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
                    vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla.
                  </p>
                  <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                    vestibulum at eros.
                  </p>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                  <p>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
                    vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla.
                  </p>
                  <p className="mb-0">
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                    vestibulum at eros.
                  </p>
                </Portlet.Body>
                <Portlet.Footer bordered>
                  <Button variant="primary">Submit</Button>{" "}
                  <Button variant="outline-secondary">Cancel</Button>
                </Portlet.Footer>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Icon>
                    <FontAwesomeIcon icon={SolidIcon.faCalendarAlt} />
                  </Portlet.Icon>
                  <Portlet.Title>Extended header</Portlet.Title>
                  <Portlet.Addon>
                    <Badge pill variant="primary">
                      9+
                    </Badge>
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </Portlet.Body>
                <Portlet.Footer bordered>
                  <Button variant="primary">Submit</Button>{" "}
                  <Button variant="outline-secondary">Cancel</Button>
                </Portlet.Footer>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Icon>
                    <FontAwesomeIcon icon={SolidIcon.faCog} />
                  </Portlet.Icon>
                  <Portlet.Title>More portlet</Portlet.Title>
                  <Portlet.Addon>
                    <Badge pill variant="primary">
                      9+
                    </Badge>
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </Portlet.Body>
                <Portlet.Footer bordered>
                  <Button variant="primary">Submit</Button>{" "}
                  <Button variant="outline-secondary">Cancel</Button>
                </Portlet.Footer>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Icon>
                    <FontAwesomeIcon icon={SolidIcon.faMapMarkerAlt} />
                  </Portlet.Icon>
                  <Portlet.Title>Dropdown</Portlet.Title>
                  <Portlet.Addon>
                    {/* BEGIN Dropdown */}
                    <Dropdown.Uncontrolled>
                      <Dropdown.Toggle icon variant="text-secondary">
                        <FontAwesomeIcon icon={SolidIcon.faEllipsisV} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu right animated>
                        <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faRocket} />}>
                          Action
                        </Dropdown.Item>
                        <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faComments} />}>
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faPaperPlane} />}>
                          Something else here
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Uncontrolled>
                    {/* END Dropdown */}
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </Portlet.Body>
                <Portlet.Footer bordered>
                  <Button variant="primary">Submit</Button>{" "}
                  <Button variant="outline-secondary">Cancel</Button>
                </Portlet.Footer>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header>
                  <Portlet.Title>Footer</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </Portlet.Body>
                <Portlet.Footer>
                  <Button variant="primary">Submit</Button>{" "}
                  <Button variant="outline-secondary">Cancel</Button>
                </Portlet.Footer>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header>
                  <Portlet.Title>Footer alignments</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header>
                      <Portlet.Title>Left</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      </p>
                    </Portlet.Body>
                    <Portlet.Footer bordered align="left">
                      <Button variant="primary">Submit</Button>{" "}
                      <Button variant="outline-secondary">Cancel</Button>
                    </Portlet.Footer>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header>
                      <Portlet.Title>Center</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      </p>
                    </Portlet.Body>
                    <Portlet.Footer bordered align="center">
                      <Button variant="primary">Submit</Button>{" "}
                      <Button variant="outline-secondary">Cancel</Button>
                    </Portlet.Footer>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Header>
                      <Portlet.Title>Right</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      </p>
                    </Portlet.Body>
                    <Portlet.Footer bordered align="right">
                      <Button variant="primary">Submit</Button>{" "}
                      <Button variant="outline-secondary">Cancel</Button>
                    </Portlet.Footer>
                  </Portlet>
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header>
                  <Portlet.Title>Nested</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Without footer</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Header bordered>
                      <Portlet.Title>With footer</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </Portlet.Body>
                    <Portlet.Footer bordered>
                      <Button variant="primary">Submit</Button>{" "}
                      <Button variant="outline-secondary">Cancel</Button>
                    </Portlet.Footer>
                  </Portlet>
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet variant="primary">
                <Portlet.Header>
                  <Portlet.Icon>
                    <FontAwesomeIcon icon={SolidIcon.faRocket} />
                  </Portlet.Icon>
                  <Portlet.Title>Portlet color</Portlet.Title>
                  <Portlet.Addon>
                    <Badge pill variant="warning">
                      9+
                    </Badge>
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </Portlet.Body>
                <Portlet.Footer>
                  <Button variant="success">Submit</Button>{" "}
                  <Button variant="text-light">Cancel</Button>
                </Portlet.Footer>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet variant="success">
                <Portlet.Header>
                  <Portlet.Icon>
                    <FontAwesomeIcon icon={SolidIcon.faRocket} />
                  </Portlet.Icon>
                  <Portlet.Title>More portlet color</Portlet.Title>
                  <Portlet.Addon>
                    <Badge pill variant="danger">
                      9+
                    </Badge>
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </Portlet.Body>
                <Portlet.Footer>
                  <Button variant="primary">Submit</Button>{" "}
                  <Button variant="text-light">Cancel</Button>
                </Portlet.Footer>
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(PortletBasePage)))
