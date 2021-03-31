import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Portlet,
  Container,
  FloatLabel,
  InputGroup,
  CustomInput
} from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class FormLayoutPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Form Layout")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Form" },
      { text: "Layout", link: "/form/layout" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Form Layout | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Basic layout</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form */}
                  <Form>
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <Label for="emailExample1">Email address</Label>
                      <Input
                        type="email"
                        id="emailExample1"
                        placeholder="Please insert your email"
                      />
                      <Form.Text>We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <Label for="passwordExample1">Password</Label>
                      <Input
                        type="password"
                        id="passwordExample1"
                        placeholder="Please provide your password"
                      />
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <CustomInput
                        type="checkbox"
                        id="checkboxExample1"
                        label="Check this checkbox"
                      />
                    </Form.Group>
                    {/* END Form Group */}
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Form>
                  {/* END Form */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Horizontal form</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form */}
                  <Form>
                    {/* BEGIN Form Group */}
                    <Form.Group row>
                      <Label for="emailExample2" sm="2">
                        Email
                      </Label>
                      <Col sm="10">
                        <Input
                          type="email"
                          id="emailExample2"
                          placeholder="Please insert your email"
                        />
                      </Col>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group row>
                      <Label for="passwordExample2" sm="2">
                        Password
                      </Label>
                      <Col sm="10">
                        <Input
                          type="password"
                          id="passwordExample2"
                          placeholder="Please provide your password"
                        />
                      </Col>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <Row>
                        <Label sm="2" className="pt-0">
                          Gender
                        </Label>
                        <Col sm="10">
                          {/* BEGIN Form Group */}
                          <Form.Group className="mb-0">
                            <CustomInput
                              type="radio"
                              name="radiosExample2"
                              id="radio1Example2"
                              label="Male"
                            />
                            <CustomInput
                              type="radio"
                              name="radiosExample2"
                              id="radio2Example2"
                              label="Female"
                            />
                          </Form.Group>
                          {/* END Form Group */}
                        </Col>
                      </Row>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group row>
                      <Col sm="2">Check</Col>
                      <Col sm="10">
                        {/* BEGIN Form Group */}
                        <Form.Group>
                          <CustomInput
                            type="checkbox"
                            id="checkboxExample2"
                            label="Accepts agreements and terms"
                          />
                        </Form.Group>
                        {/* END Form Group */}
                      </Col>
                    </Form.Group>
                    {/* END Form Group */}
                    <Button type="submit" variant="primary">
                      Sign in
                    </Button>
                  </Form>
                  {/* END Form */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Centered horizontal form</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form */}
                  <Form>
                    {/* BEGIN Form Group */}
                    <Form.Group row>
                      <Label for="emailExample3" sm={{ size: 3, offset: 1 }} className="text-right">
                        Email
                      </Label>
                      <Col sm="6">
                        <Input
                          type="email"
                          id="emailExample3"
                          placeholder="Please insert your email"
                        />
                      </Col>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group row>
                      <Label
                        for="passwordExample3"
                        sm={{ size: 3, offset: 1 }}
                        className="text-right"
                      >
                        Password
                      </Label>
                      <Col sm="6">
                        <Input
                          type="password"
                          id="passwordExample3"
                          placeholder="Please provide your password"
                        />
                      </Col>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <Row>
                        <Label sm={{ size: 3, offset: 1 }} className="text-right pt-0">
                          Gender
                        </Label>
                        <Col sm="6">
                          {/* BEGIN Form Group */}
                          <Form.Group className="mb-0">
                            <CustomInput
                              type="radio"
                              name="radiosExample3"
                              id="radio1Example3"
                              label="Male"
                            />
                            <CustomInput
                              type="radio"
                              name="radiosExample3"
                              id="radio2Example3"
                              label="Female"
                            />
                          </Form.Group>
                          {/* END Form Group */}
                        </Col>
                      </Row>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group row>
                      <Col sm={{ size: 3, offset: 1 }} className="text-right">
                        Agreements
                      </Col>
                      <Col sm="6">
                        {/* BEGIN Form Group */}
                        <Form.Group className="mb-0">
                          <CustomInput
                            type="checkbox"
                            id="checkboxExample3"
                            label="Agree to terms and conditions"
                          />
                        </Form.Group>
                        {/* END Form Group */}
                      </Col>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group className="text-center mb-0">
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form.Group>
                    {/* END Form Group */}
                  </Form>
                  {/* END Form */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>One more complex layout</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form */}
                  <Form>
                    {/* BEGIN Form Group */}
                    <Form.Group row>
                      <Col md="4" className="mb-3">
                        <Label for="firstNameExample4">First name</Label>
                        <Input type="text" id="firstNameExample4" defaultValue="Mark" />
                      </Col>
                      <Col md="4" className="mb-3">
                        <Label for="lastNameExample4">Last name</Label>
                        <Input type="text" id="lastNameExample4" defaultValue="Otto" />
                      </Col>
                      <Col md="4" className="mb-3">
                        <Label for="userNameExample4">Username</Label>
                        {/* BEGIN Input Group */}
                        <InputGroup>
                          <InputGroup.Addon addonType="prepend">
                            <InputGroup.Text>@</InputGroup.Text>
                          </InputGroup.Addon>
                          <Input type="text" id="userNameExample4" defaultValue="Mark Otto" />
                        </InputGroup>
                        {/* END Input Group */}
                      </Col>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group row>
                      <Col md="6" className="mb-3">
                        <Label for="cityExample4">City</Label>
                        <Input
                          type="text"
                          id="cityExample4"
                          placeholder="The city where you living"
                        />
                      </Col>
                      <Col md="3" className="mb-3">
                        <Label for="stateExample4">State</Label>
                        <CustomInput type="select" id="stateExample4">
                          <option value="">Choose...</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </CustomInput>
                      </Col>
                      <Col md="3" className="mb-3">
                        <Label for="zipExample4">Zip</Label>
                        <Input type="text" id="zipExample4" placeholder="Post code" />
                      </Col>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <CustomInput
                        type="checkbox"
                        id="agreementExample4"
                        label="Agree to terms and conditions"
                      />
                    </Form.Group>
                    {/* END Form Group */}
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Form>
                  {/* END Form */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Section layout</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form */}
                  <Form>
                    <h5 className="mb-4">Customer info</h5>
                    {/* BEGIN Form Group */}
                    <Form.Group row>
                      <Label sm="2">Name</Label>
                      <Col sm="10">
                        {/* BEGIN Input Group */}
                        <InputGroup>
                          <Input type="text" placeholder="First name" />
                          <Input type="text" placeholder="Last name" />
                        </InputGroup>
                        {/* END Input Group */}
                      </Col>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group row>
                      <Label for="addressExample5" sm="2">
                        Address
                      </Label>
                      <Col sm="10">
                        {/* BEGIN Input Group */}
                        <InputGroup icon>
                          <Input type="text" id="addressExample5" placeholder="Your address here" />
                          <InputGroup.Addon addonType="append">
                            <FontAwesomeIcon icon={SolidIcon.faMapMarkerAlt} />
                          </InputGroup.Addon>
                        </InputGroup>
                        {/* END Input Group */}
                      </Col>
                    </Form.Group>
                    {/* END Form Group */}
                    <h5 className="my-4">Customer account</h5>
                    {/* BEGIN Form Group */}
                    <Form.Group row>
                      <Label for="emailExample5" sm="2">
                        Email
                      </Label>
                      <Col sm="10">
                        <Input
                          type="email"
                          id="emailExample5"
                          placeholder="Please insert your email"
                        />
                      </Col>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group row>
                      <Label for="passwordExample5" sm="2">
                        Password
                      </Label>
                      <Col sm="10">
                        <Input
                          type="password"
                          id="passwordExample5"
                          placeholder="Please insert your password"
                        />
                      </Col>
                    </Form.Group>
                    {/* END Form Group */}
                    <Button type="submit" variant="primary">
                      Sign in
                    </Button>
                  </Form>
                  {/* END Form */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Basic layout with floating label</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form */}
                  <Form>
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      {/* BEGIN Float Label */}
                      <FloatLabel>
                        <Input
                          type="email"
                          id="emailExample6"
                          placeholder="Please insert your email"
                        />
                        <Label for="emailExample6">Email</Label>
                      </FloatLabel>
                      {/* END Float Label */}
                      <Form.Text>We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      {/* BEGIN Float Label */}
                      <FloatLabel>
                        <Input
                          type="password"
                          id="passwordExample6"
                          placeholder="Please insert your password"
                        />
                        <Label for="passwordExample6">Password</Label>
                      </FloatLabel>
                      {/* END Float Label */}
                    </Form.Group>
                    {/* END Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <CustomInput
                        type="checkbox"
                        id="checkboxExample6"
                        label="Check this checkbox"
                      />
                    </Form.Group>
                    {/* END Form Group */}
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Form>
                  {/* END Form */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Inline form</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form */}
                  <Form>
                    <Row form className="align-items-center">
                      <Col xs="4">
                        <Input type="text" placeholder="Jane Doe" />
                      </Col>
                      <Col xs="5">
                        {/* BEGIN Input Group */}
                        <InputGroup>
                          <InputGroup.Addon addonType="prepend">
                            <InputGroup.Text>@</InputGroup.Text>
                          </InputGroup.Addon>
                          <Input type="text" placeholder="Username" />
                        </InputGroup>
                        {/* BEGIN Input Group */}
                      </Col>
                      <Col>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  {/* END Form */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Other inline form</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form */}
                  <Form inline>
                    <Label className="my-1 mr-2" for="selectExample7">
                      Preference
                    </Label>
                    <CustomInput type="select" className="my-1 mr-sm-2" id="selectExample7">
                      <option value="">Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </CustomInput>
                    <CustomInput
                      type="checkbox"
                      id="checkboxExample7"
                      label="Remember my preference"
                    />
                    <Button type="submit" variant="primary" className="my-1 ml-2">
                      Submit
                    </Button>
                  </Form>
                  {/* END Form */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>One more inline form</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form */}
                  <Form inline>
                    <Form.Group>
                      <Label for="passwordExample8">Password</Label>
                      <Input
                        type="password"
                        id="passwordExample8"
                        placeholder="Please provide your password"
                        className="mx-sm-3"
                      />
                      <Form.Text inline>Must be 8-20 characters long.</Form.Text>
                    </Form.Group>
                  </Form>
                  {/* END Form */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Complex layout</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form */}
                  <Form>
                    <Row form>
                      <Col md="6">
                        {/* BEGIN Form Group */}
                        <Form.Group>
                          <Label for="emailExample9">Email</Label>
                          <Input
                            type="email"
                            id="emailExample9"
                            placeholder="Please insert your email"
                          />
                        </Form.Group>
                        {/* BEGIN Form Group */}
                      </Col>
                      <Col md="6">
                        {/* BEGIN Form Group */}
                        <Form.Group>
                          <Label for="passwordExample9">Password</Label>
                          <Input
                            type="password"
                            id="passwordExample9"
                            placeholder="Please insert your password"
                          />
                        </Form.Group>
                        {/* BEGIN Form Group */}
                      </Col>
                    </Row>
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <Label for="address1Example9">Address</Label>
                      <Input type="text" id="address1Example9" placeholder="1234 Main St" />
                    </Form.Group>
                    {/* BEGIN Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <Label for="address2Example9">Address 2</Label>
                      <Input
                        type="text"
                        id="address2Example9"
                        placeholder="Apartment, studio, or floor"
                      />
                    </Form.Group>
                    {/* BEGIN Form Group */}
                    <Row form>
                      <Col md="6">
                        {/* BEGIN Form Group */}
                        <Form.Group>
                          <Label for="cityExample9">City</Label>
                          <Input
                            type="text"
                            id="cityExample9"
                            placeholder="The city where you living"
                          />
                        </Form.Group>
                        {/* BEGIN Form Group */}
                      </Col>
                      <Col md="4">
                        {/* BEGIN Form Group */}
                        <Form.Group>
                          <Label for="stateExample9">State</Label>
                          <Input type="select" id="stateExample9">
                            <option value="">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Input>
                        </Form.Group>
                        {/* BEGIN Form Group */}
                      </Col>
                      <Col md="2">
                        {/* BEGIN Form Group */}
                        <Form.Group>
                          <Label for="zipExample9">Zip</Label>
                          <Input type="text" id="zipExample9" placeholder="Post code" />
                        </Form.Group>
                        {/* BEGIN Form Group */}
                      </Col>
                    </Row>
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <CustomInput type="checkbox" id="checkboxExample9" label="Check me out" />
                    </Form.Group>
                    {/* BEGIN Form Group */}
                    <Button type="submit" variant="primary">
                      Sign in
                    </Button>
                  </Form>
                  {/* END Form */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Complex layout with floating label</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form */}
                  <Form>
                    <Row form>
                      <Col md="6">
                        {/* BEGIN Form Group */}
                        <Form.Group>
                          <FloatLabel>
                            <Input
                              type="email"
                              id="emailExample10"
                              placeholder="Insert your email"
                            />
                            <Label for="emailExample10">Email</Label>
                          </FloatLabel>
                        </Form.Group>
                        {/* BEGIN Form Group */}
                      </Col>
                      <Col md="6">
                        {/* BEGIN Form Group */}
                        <Form.Group>
                          <FloatLabel>
                            <Input
                              type="password"
                              id="passwordExample10"
                              placeholder="Insert your password"
                            />
                            <Label for="passwordExample10">Password</Label>
                          </FloatLabel>
                        </Form.Group>
                        {/* BEGIN Form Group */}
                      </Col>
                    </Row>
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <FloatLabel>
                        <Input type="text" id="address1Example10" placeholder="1234 Main St" />
                        <Label for="address1Example10">Address</Label>
                      </FloatLabel>
                    </Form.Group>
                    {/* BEGIN Form Group */}
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <FloatLabel>
                        <Input
                          type="text"
                          id="address2Example10"
                          placeholder="Apartment, studio, or floor"
                        />
                        <Label for="address2Example10">Address 2</Label>
                      </FloatLabel>
                    </Form.Group>
                    {/* BEGIN Form Group */}
                    <Row form>
                      <Col md="6">
                        {/* BEGIN Form Group */}
                        <Form.Group>
                          <FloatLabel>
                            <Input type="text" id="cityExample10" placeholder="Insert your city" />
                            <Label for="cityExample10">City</Label>
                          </FloatLabel>
                        </Form.Group>
                        {/* BEGIN Form Group */}
                      </Col>
                      <Col md="4">
                        {/* BEGIN Form Group */}
                        <Form.Group>
                          <FloatLabel>
                            <Input type="select" id="stateExample10">
                              <option value="">Choose...</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </Input>
                            <Label for="stateExample10">State</Label>
                          </FloatLabel>
                        </Form.Group>
                        {/* BEGIN Form Group */}
                      </Col>
                      <Col md="2">
                        {/* BEGIN Form Group */}
                        <Form.Group>
                          <FloatLabel>
                            <Input type="text" id="zipExample10" placeholder="123456" />
                            <Label for="zipExample10">Zip</Label>
                          </FloatLabel>
                        </Form.Group>
                        {/* BEGIN Form Group */}
                      </Col>
                    </Row>
                    {/* BEGIN Form Group */}
                    <Form.Group>
                      <CustomInput type="checkbox" id="checkboxExample10" label="Check me out" />
                    </Form.Group>
                    {/* BEGIN Form Group */}
                    <Button type="submit" variant="primary">
                      Sign in
                    </Button>
                  </Form>
                  {/* END Form */}
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(FormLayoutPage)))
