import { Row, Col, Form, Label, Modal, Input, Button, Portlet, Container } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class ModalPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Modal")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Modal", link: "/elements/base/modal" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Modal | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Modal examples</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Basic demo
                    </Label>
                    <Col sm="8" lg="9">
                      <Modal1 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Without footer
                    </Label>
                    <Col sm="8" lg="9">
                      <Modal2 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Bordered header and footer
                    </Label>
                    <Col sm="8" lg="9">
                      <Modal3 />
                      <p className="mb-0 mt-2">
                        Add <code>bordered</code> property to modal header or footer elements for
                        bordered styles
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Static backdrop
                    </Label>
                    <Col sm="8" lg="9">
                      <Modal4 />
                      <p className="mb-0 mt-2">
                        Disable backdrop behavior (don't close modal when backdrop clicked)
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Scrolling modal
                    </Label>
                    <Col sm="8" lg="9">
                      <Modal5 />
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Fixed scrollable content
                    </Label>
                    <Col sm="8" lg="9">
                      <Modal6 />
                      <p className="mb-0 mt-2">
                        Apply <code>scrollable</code> property to make modal body fixed and
                        scrollable
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row>
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Vertically centered
                    </Label>
                    <Col sm="8" lg="9">
                      <Modal7 />
                      <p className="mb-0 mt-2">
                        Make your modal align center to page by applying <code>centered</code>{" "}
                        property
                      </p>
                    </Col>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group row className="mb-0">
                    <Label sm="4" lg="3" className="text-muted text-sm-right">
                      Form in modal
                    </Label>
                    <Col sm="8" lg="9">
                      <Modal8 />
                      <p className="mb-0 mt-2">You can insert any elements to modal body</p>
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

class Modal1 extends React.Component {
  // Default state
  state = { isOpen: false }

  // Handle modal toggle event
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle}>Click me</Button>
        {/* BEGIN Modal */}
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <Modal.Header toggle={this.toggle}>Basic</Modal.Header>
          <Modal.Body>
            <p className="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate fugit eveniet
              sed, ipsum rem quasi quisquam recusandae nesciunt deleniti iste sit repellat rerum
              amet. Neque debitis iste, quos repudiandae ut!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="mr-2">
              Submit
            </Button>
            <Button variant="outline-danger">Cancel</Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </React.Fragment>
    )
  }
}

class Modal2 extends React.Component {
  // Default state
  state = { isOpen: false }

  // Handle modal toggle event
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle}>Click me</Button>
        {/* BEGIN Modal */}
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <Modal.Header toggle={this.toggle}>Without footer</Modal.Header>
          <Modal.Body>
            <p className="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate fugit eveniet
              sed, ipsum rem quasi quisquam recusandae nesciunt deleniti iste sit repellat rerum
              amet. Neque debitis iste, quos repudiandae ut!
            </p>
          </Modal.Body>
        </Modal>
        {/* END Modal */}
      </React.Fragment>
    )
  }
}

class Modal3 extends React.Component {
  // Default state
  state = { isOpen: false }

  // Handle modal toggle event
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle}>Click me</Button>
        {/* BEGIN Modal */}
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <Modal.Header bordered toggle={this.toggle}>
            Bordered
          </Modal.Header>
          <Modal.Body>
            <p className="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate fugit eveniet
              sed, ipsum rem quasi quisquam recusandae nesciunt deleniti iste sit repellat rerum
              amet. Neque debitis iste, quos repudiandae ut!
            </p>
          </Modal.Body>
          <Modal.Footer bordered>
            <Button variant="primary" className="mr-2">
              Submit
            </Button>
            <Button variant="outline-danger">Cancel</Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </React.Fragment>
    )
  }
}

class Modal4 extends React.Component {
  // Default state
  state = { isOpen: false }

  // Handle modal toggle event
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle}>Click me</Button>
        {/* BEGIN Modal */}
        <Modal isOpen={this.state.isOpen} backdrop="static" toggle={this.toggle}>
          <Modal.Header toggle={this.toggle}>Static backdrop</Modal.Header>
          <Modal.Body>
            <p className="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate fugit eveniet
              sed, ipsum rem quasi quisquam recusandae nesciunt deleniti iste sit repellat rerum
              amet. Neque debitis iste, quos repudiandae ut!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="mr-2">
              Submit
            </Button>
            <Button variant="outline-danger">Cancel</Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </React.Fragment>
    )
  }
}

class Modal5 extends React.Component {
  // Default state
  state = { isOpen: false }

  // Handle modal toggle event
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle}>Click me</Button>
        {/* BEGIN Modal */}
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <Modal.Header toggle={this.toggle}>Scrollable</Modal.Header>
          <Modal.Body>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </p>
            <p className="mb-0">
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="mr-2">
              Submit
            </Button>
            <Button variant="outline-danger">Cancel</Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </React.Fragment>
    )
  }
}

class Modal6 extends React.Component {
  // Default state
  state = { isOpen: false }

  // Handle modal toggle event
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle}>Click me</Button>
        {/* BEGIN Modal */}
        <Modal scrollable isOpen={this.state.isOpen} toggle={this.toggle}>
          <Modal.Header toggle={this.toggle}>Fixed scrollable content</Modal.Header>
          <Modal.Body>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </p>
            <p className="mb-0">
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="mr-2">
              Submit
            </Button>
            <Button variant="outline-danger">Cancel</Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </React.Fragment>
    )
  }
}

class Modal7 extends React.Component {
  // Default state
  state = { isOpen: false }

  // Handle modal toggle event
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle}>Click me</Button>
        {/* BEGIN Modal */}
        <Modal centered isOpen={this.state.isOpen} toggle={this.toggle}>
          <Modal.Header toggle={this.toggle}>Vertical centered</Modal.Header>
          <Modal.Body>
            <p className="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate fugit eveniet
              sed, ipsum rem quasi quisquam recusandae nesciunt deleniti iste sit repellat rerum
              amet. Neque debitis iste, quos repudiandae ut!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="mr-2">
              Submit
            </Button>
            <Button variant="outline-danger">Cancel</Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </React.Fragment>
    )
  }
}

class Modal8 extends React.Component {
  // Default state
  state = { isOpen: false }

  // Handle modal toggle event
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle}>Click me</Button>
        {/* BEGIN Modal */}
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <Modal.Header toggle={this.toggle}>Form</Modal.Header>
          <Modal.Body>
            {/* BEGIN Form Group */}
            <Form.Group>
              <Label for="email1">Email form</Label>
              <Input type="email" id="email1" />
              <Form.Text>Please submit your email</Form.Text>
            </Form.Group>
            {/* END Form Group */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="mr-2">
              Submit
            </Button>
            <Button variant="outline-danger">Reset</Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </React.Fragment>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(ModalPage)))
