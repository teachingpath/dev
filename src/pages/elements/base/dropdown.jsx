import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Portlet,
  Dropdown,
  Container,
} from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class DropdownPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Dropdown")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Dropdown", link: "/elements/base/dropdown" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Dropdown | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Dropdown examples</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Basic demo
                    </Label>
                    <Col sm="8" lg="9">
                      <DropdownControlled className="d-inline mr-2" />
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled className="d-inline">
                        <Dropdown.Toggle caret>Uncontrolled</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#">Action</Dropdown.Item>
                          <Dropdown.Item href="#">Another action</Dropdown.Item>
                          <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Animated dropdown
                    </Label>
                    <Col sm="8" lg="9">
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled>
                        <Dropdown.Toggle caret>Click me</Dropdown.Toggle>
                        <Dropdown.Menu animated>
                          <Dropdown.Item href="#">Action</Dropdown.Item>
                          <Dropdown.Item href="#">Another action</Dropdown.Item>
                          <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      <p className="mt-2 mb-0">
                        Extend <code>Dropdown.Menu</code> with <code>animated</code> to apply
                        animation when dropdown opened
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Icons
                    </Label>
                    <Col sm="8" lg="9">
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled>
                        <Dropdown.Toggle caret>Click me</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            icon={<FontAwesomeIcon icon={SolidIcon.faRocket} />}
                            href="#"
                          >
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item
                            icon={<FontAwesomeIcon icon={SolidIcon.faComments} />}
                            href="#"
                          >
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item
                            icon={<FontAwesomeIcon icon={SolidIcon.faPaperPlane} />}
                            href="#"
                          >
                            Something else here
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      <p className="mt-2 mb-0">
                        Use <code>icon</code> property with an icon inside to add an icon before the
                        content
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Bullet
                    </Label>
                    <Col sm="8" lg="9">
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled>
                        <Dropdown.Toggle caret>Click me</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item bullet href="#">
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item bullet href="#">
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item bullet href="#">
                            Something else here
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      <p className="mt-2 mb-0">
                        You can add circle bullet by using <code>bullet</code> property in{" "}
                        <code>Dropdown.Item</code>
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Header
                    </Label>
                    <Col sm="8" lg="9">
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled className="d-inline mr-2">
                        <Dropdown.Toggle caret>Normal header</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Header>Header</Dropdown.Header>
                          <Dropdown.Item
                            icon={<FontAwesomeIcon icon={SolidIcon.faRocket} />}
                            href="#"
                          >
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item
                            icon={<FontAwesomeIcon icon={SolidIcon.faComments} />}
                            href="#"
                          >
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item
                            icon={<FontAwesomeIcon icon={SolidIcon.faPaperPlane} />}
                            href="#"
                          >
                            Something else here
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled className="d-inline">
                        <Dropdown.Toggle caret>Large header</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Header size="lg">Header</Dropdown.Header>
                          <Dropdown.Item
                            icon={<FontAwesomeIcon icon={SolidIcon.faRocket} />}
                            href="#"
                          >
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item
                            icon={<FontAwesomeIcon icon={SolidIcon.faComments} />}
                            href="#"
                          >
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item
                            icon={<FontAwesomeIcon icon={SolidIcon.faPaperPlane} />}
                            href="#"
                          >
                            Something else here
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      <p className="mt-2 mb-0">
                        Insert header to a dropdown menu with <code>Dropdown.Header</code>. If you
                        want to make dropdown header larger, you must extend the component with{" "}
                        <code>size</code> property
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Divider
                    </Label>
                    <Col sm="8" lg="9">
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled>
                        <Dropdown.Toggle caret>Click me</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Header>Header</Dropdown.Header>
                          <Dropdown.Item
                            icon={<FontAwesomeIcon icon={SolidIcon.faRocket} />}
                            href="#"
                          >
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item
                            icon={<FontAwesomeIcon icon={SolidIcon.faComments} />}
                            href="#"
                          >
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            icon={<FontAwesomeIcon icon={SolidIcon.faPaperPlane} />}
                            href="#"
                          >
                            Something else here
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      <p className="mt-2 mb-0">
                        Dividing your dropdown items with <code>Dropdown.Divider</code> component
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Orientation
                    </Label>
                    <Col sm="8" lg="9">
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled direction="up" className="d-inline mr-2">
                        <Dropdown.Toggle caret>Dropup</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#">Action</Dropdown.Item>
                          <Dropdown.Item href="#">Another action</Dropdown.Item>
                          <Dropdown.Item href="#">omething else here</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled direction="right" className="d-inline mr-2">
                        <Dropdown.Toggle caret>Dropright</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#">Action</Dropdown.Item>
                          <Dropdown.Item href="#">Another action</Dropdown.Item>
                          <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled direction="left" className="d-inline">
                        <Dropdown.Toggle caret>Dropleft</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#">Action</Dropdown.Item>
                          <Dropdown.Item href="#">Another action</Dropdown.Item>
                          <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      <p className="mt-2 mb-0">
                        Change dropdown menu orientation by applying <code>direction</code> with{" "}
                        <code>left|right|down|up</code> to <code>Dropdown</code> components
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Menu alignment
                    </Label>
                    <Col sm="8" lg="9">
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled className="d-inline mr-2">
                        <Dropdown.Toggle caret>Right</Dropdown.Toggle>
                        <Dropdown.Menu right>
                          <Dropdown.Item href="#">Action</Dropdown.Item>
                          <Dropdown.Item href="#">Another action</Dropdown.Item>
                          <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled className="d-inline mr-2">
                        <Dropdown.Toggle caret>Left</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#">Action</Dropdown.Item>
                          <Dropdown.Item href="#">Another action</Dropdown.Item>
                          <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      <p className="mt-2 mb-0">
                        Apply <code>right</code> property to the <code>Dropdown.Menu</code> to
                        change alignment
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Text
                    </Label>
                    <Col sm="8" lg="9">
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled>
                        <Dropdown.Toggle caret>Click me</Dropdown.Toggle>
                        <Dropdown.Menu className="p-4 text-muted">
                          <p>Some example text that's free-flowing within the dropdown menu.</p>
                          <p className="mb-0">And this is more example text.</p>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      <p className="mt-2 mb-0">You can insert any elements into dropdown menu</p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Submenu
                    </Label>
                    <Col sm="8" lg="9">
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled>
                        <Dropdown.Toggle caret>Click me</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#">Action</Dropdown.Item>
                          <Dropdown.Item href="#">Another action</Dropdown.Item>
                          {/* BEGIN Dropdown Submenu */}
                          <Dropdown.Submenu>
                            <Dropdown.Item tag="button">Submenu</Dropdown.Item>
                            <Dropdown.SubmenuMenu>
                              <Dropdown.Item href="#">Item 1</Dropdown.Item>
                              <Dropdown.Item href="#">Item 2</Dropdown.Item>
                              <Dropdown.Item href="#">Item 3</Dropdown.Item>
                            </Dropdown.SubmenuMenu>
                          </Dropdown.Submenu>
                          {/* END Dropdown Submenu */}
                          {/* BEGIN Dropdown Submenu */}
                          <Dropdown.Submenu>
                            <Dropdown.Item tag="button">Another submenu</Dropdown.Item>
                            <Dropdown.SubmenuMenu>
                              <Dropdown.Item href="#">Item 1</Dropdown.Item>
                              <Dropdown.Item href="#">Item 2</Dropdown.Item>
                              <Dropdown.Item href="#">Item 3</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item href="#">Item 4</Dropdown.Item>
                              <Dropdown.Item href="#">Item 5</Dropdown.Item>
                            </Dropdown.SubmenuMenu>
                          </Dropdown.Submenu>
                          {/* END Dropdown Submenu */}
                          <Dropdown.Divider />
                          <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row className="mb-0">
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Grid
                    </Label>
                    <Col sm="8" lg="9">
                      {/* BEGIN Dropdown */}
                      <Dropdown.Uncontrolled>
                        <Dropdown.Toggle caret>Click me</Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Row>
                            <Dropdown.Col>
                              <Dropdown.Item href="#">Action</Dropdown.Item>
                              <Dropdown.Item href="#">Another action</Dropdown.Item>
                              <Dropdown.Item href="#">Something else here</Dropdown.Item>
                            </Dropdown.Col>
                            <Dropdown.Col>
                              <Dropdown.Item
                                icon={<FontAwesomeIcon icon={SolidIcon.faRocket} />}
                                href="#"
                              >
                                Action
                              </Dropdown.Item>
                              <Dropdown.Item
                                icon={<FontAwesomeIcon icon={SolidIcon.faComments} />}
                                href="#"
                              >
                                Another action
                              </Dropdown.Item>
                              <Dropdown.Item
                                icon={<FontAwesomeIcon icon={SolidIcon.faPaperPlane} />}
                                href="#"
                              >
                                Something else here
                              </Dropdown.Item>
                            </Dropdown.Col>
                            <Dropdown.Col>
                              <Dropdown.Header>Header</Dropdown.Header>
                              <Dropdown.Item bullet href="#">
                                Another action
                              </Dropdown.Item>
                              <Dropdown.Item bullet href="#">
                                Something else here
                              </Dropdown.Item>
                            </Dropdown.Col>
                          </Dropdown.Row>
                        </Dropdown.Menu>
                      </Dropdown.Uncontrolled>
                      {/* END Dropdown */}
                      <p className="mb-0 mt-2">
                        Combine <code>Dropdown.Row</code> and <code>Dropdown.Col</code> to make the
                        grid
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
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

// Controlled dropdown example
class DropdownControlled extends React.Component {
  // Default states
  state = { isOpen: false }

  // Handle dropdown toggle event
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <Dropdown isOpen={this.state.isOpen} toggle={this.toggle} {...this.props}>
        <Dropdown.Toggle caret>Controlled</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(DropdownPage)))
