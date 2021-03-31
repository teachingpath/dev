import { Row, Col, Form, Label, Button, Tooltip, Portlet, Container, DemoWrapper } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class TooltipPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Tooltip")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Tooltip", link: "/elements/base/tooltip" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Tooltip | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Tooltip examples</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Basic tooltip
                    </Label>
                    <Col sm="8" lg="9">
                      <DemoWrapper>
                        <TooltipControlled />
                        <Button id="tooltip2" className="ml-2">Uncontrolled</Button>
                        <Tooltip.Uncontrolled target="tooltip2">Tooltip content</Tooltip.Uncontrolled>
                      </DemoWrapper>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Placements
                    </Label>
                    <Col sm="8" lg="9">
                      <DemoWrapper>
                        <Button id="tooltip3">Top</Button>{" "}
                        <Button id="tooltip4">Bottom</Button>{" "}
                        <Button id="tooltip5">Right</Button>{" "}
                        <Button id="tooltip6">Left</Button>
                        <Tooltip.Uncontrolled placement="top" target="tooltip3">
                          Top
                        </Tooltip.Uncontrolled>
                        <Tooltip.Uncontrolled placement="bottom" target="tooltip4">
                          Bottom
                        </Tooltip.Uncontrolled>
                        <Tooltip.Uncontrolled placement="right" target="tooltip5">
                          Right
                        </Tooltip.Uncontrolled>
                        <Tooltip.Uncontrolled placement="left" target="tooltip6">
                          Left
                        </Tooltip.Uncontrolled>
                      </DemoWrapper>
                      <p className="mb-0 mt-2">
                        Set <code>placement</code> property with <code>top|bottom|right|left</code>{" "}
                        to change tooltip placement
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      HTML Content
                    </Label>
                    <Col sm="8" lg="9">
                      <Button id="tooltip7">Hover me</Button>
                      <Tooltip.Uncontrolled target="tooltip7">
                        content <b>bold</b> and <em>italic</em>
                      </Tooltip.Uncontrolled>
                      <p className="mb-0 mt-2">You can put HTML content inside tooltip elements</p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row className="mb-0">
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Trigger on click
                    </Label>
                    <Col sm="8" lg="9">
                      <Button id="tooltip8">Click me</Button>
                      <Tooltip.Uncontrolled trigger="click" target="tooltip8">
                        Tooltip content
                      </Tooltip.Uncontrolled>
                      <p className="mb-0 mt-2">Change tooltip trigger to focus</p>
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

// Controlled tooltip example
class TooltipControlled extends React.Component {
  // Default states
  state = { isOpen: false }

  // Handle tooltip toggle event
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <React.Fragment>
        <Button id="tooltip1">Controlled</Button>
        <Tooltip target="tooltip1" isOpen={this.state.isOpen} toggle={this.toggle}>
          Tooltip content
        </Tooltip>
      </React.Fragment>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(TooltipPage)))
