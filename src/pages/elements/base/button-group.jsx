import {
  Row,
  Col,
  Input,
  Button,
  Portlet,
  Dropdown,
  Container,
  InputGroup,
  ButtonGroup,
  ButtonToolbar,
} from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class ButtonGroupPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Button Group")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Button Group", link: "/elements/base/button-group" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Button Group | Panely</title>
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
                    Wrap a series of <code>Button</code> elements in <code>ButtonGroup</code>{" "}
                    element.
                  </p>
                  {/* BEGIN Button Group */}
                  <ButtonGroup>
                    <Button>Left</Button>
                    <Button>Middle</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                  {/* END Button Group */}
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
                    Instead of applying button sizing properties to every button in a group, just
                    set <code>variant</code> with <code>sm|lg</code> to each{" "}
                    <code>ButtonGroup</code>, including each one when nesting multiple groups.
                  </p>
                  {/* BEGIN Button Group */}
                  <ButtonGroup size="lg" className="mb-2">
                    <Button>Left</Button>
                    <Button>Middle</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                  {/* END Button Group */}
                  <br />
                  {/* BEGIN Button Group */}
                  <ButtonGroup className="mb-2">
                    <Button>Left</Button>
                    <Button>Middle</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                  {/* END Button Group */}
                  <br />
                  {/* BEGIN Button Group */}
                  <ButtonGroup size="sm">
                    <Button>Left</Button>
                    <Button>Middle</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                  {/* END Button Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Split button</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Create split button dropdowns with virtually the same markup as single button
                    dropdowns, but with the addition of <code>split</code> property for proper
                    spacing around the dropdown caret.
                  </p>
                  {/* BEGIN Button Group */}
                  <Dropdown.Uncontrolled group className="mr-2 mb-2">
                    <Button>Dropdown</Button>
                    <Dropdown.Toggle split />
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">Action</Dropdown.Item>
                      <Dropdown.Item href="#">Another action</Dropdown.Item>
                      <Dropdown.Item href="#">Something else here</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#">Separated lin</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Uncontrolled>
                  {/* END Button Group */}
                  {/* BEGIN Button Group */}
                  <Dropdown.Uncontrolled group direction="up" className="mr-2 mb-2">
                    <Button>Dropdown</Button>
                    <Dropdown.Toggle split />
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">Action</Dropdown.Item>
                      <Dropdown.Item href="#">Another action</Dropdown.Item>
                      <Dropdown.Item href="#">Something else here</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#">Separated lin</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Uncontrolled>
                  {/* END Button Group */}
                  {/* BEGIN Button Group */}
                  <Dropdown.Uncontrolled group direction="right" className="mr-2 mb-2">
                    <Button>Dropright</Button>
                    <Dropdown.Toggle split />
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">Action</Dropdown.Item>
                      <Dropdown.Item href="#">Another action</Dropdown.Item>
                      <Dropdown.Item href="#">Something else here</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#">Separated lin</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Uncontrolled>
                  {/* END Button Group */}
                  {/* BEGIN Button Group */}
                  <ButtonGroup className="mb-2">
                    <Dropdown.Uncontrolled group direction="left">
                      <Dropdown.Toggle split />
                      <Dropdown.Menu>
                        <Dropdown.Item href="#">Action</Dropdown.Item>
                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Separated lin</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Uncontrolled>
                    <Button>Dropleft</Button>
                  </ButtonGroup>
                  {/* END Button Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Vertical</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>Make a set of buttons appear vertically stacked rather than horizontally</p>
                  {/* BEGIN Button Group */}
                  <ButtonGroup vertical className="mr-2">
                    <Button>Button</Button>
                    <Button>Button</Button>
                    <Button>Button</Button>
                    <Button>Button</Button>
                    <Button>Button</Button>
                    <Button>Button</Button>
                  </ButtonGroup>
                  {/* END Button Group */}
                  {/* BEGIN Button Group */}
                  <ButtonGroup vertical>
                    <Button>Button</Button>
                    <Button>Button</Button>
                    <Dropdown.Uncontrolled group>
                      <Dropdown.Toggle>Dropdown</Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#">Link</Dropdown.Item>
                        <Dropdown.Item href="#">Link</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Uncontrolled>
                    <Button>Button</Button>
                    <Button>Button</Button>
                    <Button>Button</Button>
                  </ButtonGroup>
                  {/* END Button Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Toolbar</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Combine sets of button groups into button toolbars for more complex components.
                    Use utility classes as needed to space out groups, buttons, and more.
                  </p>
                  {/* BEGIN Button Toolbar */}
                  <ButtonToolbar className="mb-2">
                    <ButtonGroup className="mr-2">
                      <Button>1</Button>
                      <Button>2</Button>
                      <Button>3</Button>
                      <Button>4</Button>
                    </ButtonGroup>
                    <ButtonGroup className="mr-2">
                      <Button>5</Button>
                      <Button>6</Button>
                      <Button>7</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button>8</Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                  {/* END Button Toolbar */}
                  {/* BEGIN Button Toolbar */}
                  <ButtonToolbar>
                    <ButtonGroup className="mr-2 mb-2 mb-sm-0">
                      <Button>1</Button>
                      <Button>2</Button>
                      <Button>3</Button>
                      <Button>4</Button>
                    </ButtonGroup>
                    <InputGroup>
                      <InputGroup.Addon addonType="prepend">
                        <InputGroup.Text>@</InputGroup.Text>
                      </InputGroup.Addon>
                      <Input type="text" placeholder="Input group example" />
                    </InputGroup>
                  </ButtonToolbar>
                  {/* END Button Toolbar */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Nesting</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add <code>group</code> property to the dropdown element when you want dropdown
                    menus mixed with a series of buttons.
                  </p>
                  {/* BEGIN Button Group */}
                  <ButtonGroup>
                    <Button>1</Button>
                    <Button>2</Button>
                    <Dropdown.Uncontrolled group>
                      <Dropdown.Toggle caret>Dropdown</Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="3">Link</Dropdown.Item>
                        <Dropdown.Item href="3">Link</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Uncontrolled>
                  </ButtonGroup>
                  {/* END Button Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Radio and Checkbox</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Do more with buttons. Control button states or create groups of butons for more
                    components like toolbars.
                  </p>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Radio</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <ButtonGroupRadio />
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Header bordered>
                      <Portlet.Title>Checkbox</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <ButtonGroupCheckbox />
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
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

// Radio button group example
class ButtonGroupRadio extends React.Component {
  // Initial active button
  state = { activeButton: 1 }

  // Handle button click
  handleClick = id => {
    this.setState({ activeButton: id })
  }

  render() {
    const { activeButton } = this.state

    return (
      <ButtonGroup>
        <Button
          active={activeButton === 1}
          onClick={ref => this.handleClick(1)}
          variant="flat-primary"
        >
          Radio
        </Button>
        <Button
          active={activeButton === 2}
          onClick={ref => this.handleClick(2)}
          variant="flat-primary"
        >
          Radio
        </Button>
        <Button
          active={activeButton === 3}
          onClick={ref => this.handleClick(3)}
          variant="flat-primary"
        >
          Radio
        </Button>
      </ButtonGroup>
    )
  }
}

// Checkbox button group example
class ButtonGroupCheckbox extends React.Component {
  // Default states
  state = {
    1: true,
    2: false,
    3: false
  }

  // Handle button click
  handleClick = id => {
    this.setState({ [id]: !this.state[id] })
  }

  render() {
    return (
      <ButtonGroup>
        <Button active={this.state[1]} onClick={ref => this.handleClick(1)} variant="flat-primary">
          Checkbox
        </Button>
        <Button active={this.state[2]} onClick={ref => this.handleClick(2)} variant="flat-primary">
          Checkbox
        </Button>
        <Button active={this.state[3]} onClick={ref => this.handleClick(3)} variant="flat-primary">
          Checkbox
        </Button>
      </ButtonGroup>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(ButtonGroupPage)))
