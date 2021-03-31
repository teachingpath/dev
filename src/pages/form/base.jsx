import { Container, Row, Col, Form, Label, Input, Button, Portlet } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class FormBasePage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Base Form")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Form" },
      { text: "Base", link: "/form/base" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Base Form | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Base</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>Use <code>Input</code> component to make the most forms. Included are styles for general appearance, focus state, sizing, and more.</p>
                  <hr />
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <Label for="emailBase">Email address</Label>
                    <Input type="email" id="emailBase" placeholder="name@example.com" />
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <Label for="selectBase">Example select</Label>
                    <Input type="select" id="selectBase">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <Label for="multipleSelectBase">Example multiple select</Label>
                    <Input type="select" id="multipleSelectBase" multiple>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <Label for="textareaBase">Example textarea</Label>
                    <Input type="textarea" id="textareaBase" rows="3" />
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <Label for="fileBase">Example file input</Label>
                    <Input type="file" id="fileBase" />
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group className="mb-0">
                    <Label for="rangeBase">Example range input</Label>
                    <Input type="range" id="rangeBase" />
                  </Form.Group>
                  {/* END Form Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Readonly</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>Add the <code>readOnly</code> boolean property on an input to prevent modification of the input’s value. Read-only inputs appear darker (just like disabled inputs), but retain the standard cursor.</p>
                  <hr />
                  {/* BEGIN Form Group */}
                  <Form.Group className="mb-0">
                    <Input type="text" placeholder="Readonly input here..." readOnly />
                  </Form.Group>
                  {/* END Form Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Readonly plain text</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>If you want to have <code>{"<Input readOnly>"}</code> elements in your form styled as plain text, add the <code>plainText</code> property to remove the default form field styling and preserve the correct margin and padding.</p>
                  <hr />
                  {/* BEGIN Form Group */}
                  <Form.Group className="mb-0">
                    <Input type="text" defaultValue="email@example.com" readOnly plainText />
                  </Form.Group>
                  {/* END Form Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Disabled state</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>Add the <code>disabled</code> boolean property on an input to prevent user interactions and make it appear darker.</p>
                  <hr />
                  {/* BEGIN Form Group */}
                  <Form.Group className="mb-0">
                    <Label for="disabledTextInput">Disabled input</Label>
                    <Input
                      type="text"
                      id="disabledTextInput"
                      placeholder="Disabled input"
                      disabled
                    />
                  </Form.Group>
                  {/* END Form Group */}
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
                  <p>Set heights using <code>size</code> property with <code>sm|lg</code> values.</p>
                  <hr />
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <Input type="text" size="lg" placeholder="Large input" />
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <Input type="text" placeholder="Default input" />
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <Input type="text" size="sm" placeholder="Small input" />
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <Input type="select" size="lg">
                      <option>Large select</option>
                    </Input>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <Input type="select">
                      <option>Default select</option>
                    </Input>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group className="mb-0">
                    <Input type="select" size="sm">
                      <option>Small select</option>
                    </Input>
                  </Form.Group>
                  {/* END Form Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header>
                  <Portlet.Title>Checkbox and Radio</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Default</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>By default, any number of checkboxes and radios that are immediate sibling will be vertically stacked and appropriately spaced with <code>{"<Form.Group check>"}</code>.</p>
                      <hr />
                      {/* BEGIN Form Group */}
                      <Form.Group check>
                        <Input type="checkbox" defaultValue="check1" id="checkboxBase1" />
                        <Label check for="checkboxBase1">
                          Default checkbox
                        </Label>
                      </Form.Group>
                      {/* END Form Group */}
                      {/* BEGIN Form Group */}
                      <Form.Group check>
                        <Input type="checkbox" defaultValue="check2" id="checkboxBase2" disabled />
                        <Label check for="checkboxBase2">
                          Disabled checkbox
                        </Label>
                      </Form.Group>
                      {/* END Form Group */}
                      {/* BEGIN Form Group */}
                      <Form.Group check>
                        <Input type="radio" defaultValue="option1" id="radioBase1" />
                        <Label check for="radioBase1">
                          Default radio
                        </Label>
                      </Form.Group>
                      {/* END Form Group */}
                      {/* BEGIN Form Group */}
                      <Form.Group check>
                        <Input type="radio" defaultValue="option2" id="radioBase2" />
                        <Label check for="radioBase2">
                          Second default radio
                        </Label>
                      </Form.Group>
                      {/* END Form Group */}
                      {/* BEGIN Form Group */}
                      <Form.Group check className="mb-0">
                        <Input type="radio" defaultValue="option3" id="radioBase3" />
                        <Label check for="radioBase3">
                          Disabled radio
                        </Label>
                      </Form.Group>
                      {/* END Form Group */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Without labels</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>Add <code>.position-static</code> to inputs within <code>{"<Form.Group check>"}</code> that don’t have any label text. Remember to still provide some form of label for assistive technologies.</p>
                      <hr />
                      {/* BEGIN Form Group */}
                      <Form.Group check>
                        <Input
                          type="checkbox"
                          className="position-static"
                          defaultValue="check1"
                          id="checkboxBlank"
                        />
                      </Form.Group>
                      {/* END Form Group */}
                      {/* BEGIN Form Group */}
                      <Form.Group check>
                        <Input
                          type="radio"
                          className="position-static"
                          name="blankRadio"
                          defaultValue="option1"
                          id="RadioBlank1"
                        />
                      </Form.Group>
                      {/* END Form Group */}
                      {/* BEGIN Form Group */}
                      <Form.Group check className="mb-0">
                        <Input
                          type="radio"
                          className="position-static"
                          name="blankRadio"
                          defaultValue="option2"
                          id="RadioBlank2"
                        />
                      </Form.Group>
                      {/* END Form Group */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Header bordered>
                      <Portlet.Title>Inline</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>Group checkboxes or radios on the same horizontal row by adding <code>inline</code> property to any <code>{"<Form.Group check>"}</code>.</p>
                      <hr />
                      {/* BEGIN Form Group */}
                      <Form.Group check inline>
                        <Input type="checkbox" defaultValue="option1" id="checkboxInline1" />
                        <Label check for="checkboxInline1">1</Label>
                      </Form.Group>
                      {/* END Form Group */}
                      {/* BEGIN Form Group */}
                      <Form.Group check inline>
                        <Input type="checkbox" defaultValue="option2" id="checkboxInline2" />
                        <Label check for="checkboxInline2">2</Label>
                      </Form.Group>
                      {/* END Form Group */}
                      {/* BEGIN Form Group */}
                      <Form.Group check inline className="mb-0">
                        <Input type="checkbox" defaultValue="option3" id="checkboxInline3" disabled />
                        <Label check for="checkboxInline3">3 (disabled)</Label>
                      </Form.Group>
                      {/* END Form Group */}
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

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(FormBasePage)))
