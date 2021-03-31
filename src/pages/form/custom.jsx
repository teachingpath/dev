import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Portlet,
  Container,
  FloatLabel,
  CustomInput
} from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class FormCustomPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Custom Form")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Form" },
      { text: "Custom", link: "/form/custom" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Custom Form | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Custom select</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Use <code>{'<CustomInput type="select">'}</code> to trigger the custom styles.
                    Cannot modify the <code>{"<option>"}</code>s due to browser limitations.
                  </p>
                  <p>
                    You may also choose from small and large custom selects to match our similarly
                    sized text inputs.
                  </p>
                  <hr />
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <CustomInput id="customSelect1" type="select" size="sm">
                      <option selected>Small</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </CustomInput>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <CustomInput id="customSelect2" type="select">
                      <option selected>Default</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </CustomInput>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group className="mb-0">
                    <CustomInput id="customSelect3" type="select" size="lg">
                      <option selected>Large</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </CustomInput>
                  </Form.Group>
                  {/* END Form Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Float label</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Put <code>Input</code> and <code>Label</code> components into{" "}
                    <code>FloatLabel</code> component. The label element will float above the
                    placeholder and when the cursor focuses on input, the label will be floating to
                    the top of input element.
                  </p>
                  <hr />
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <FloatLabel>
                      <Input type="email" id="floatLabelEmail" placeholder="Email form" />
                      <Label for="floatLabelEmail">Email</Label>
                    </FloatLabel>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <FloatLabel>
                      <Input type="password" id="floatLabelPassword" placeholder="Password form" />
                      <Label for="floatLabelPassword">Password</Label>
                    </FloatLabel>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <FloatLabel>
                      <Input
                        type="textarea"
                        id="floatLabelTextarea"
                        rows="5"
                        placeholder="Insert your text"
                      />
                      <Label for="floatLabelTextarea">Textarea</Label>
                    </FloatLabel>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group className="mb-0">
                    <FloatLabel>
                      <CustomInput type="select" id="floatLabelSelect">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </CustomInput>
                      <Label for="floatLabelSelect">Select</Label>
                    </FloatLabel>
                  </Form.Group>
                  {/* END Form Group */}
                  <hr />
                  <p>
                    To change input element size, you can set <code>size</code> property.
                  </p>
                  <hr />
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <FloatLabel size="lg">
                      <Input
                        type="text"
                        size="lg"
                        id="floatLabelLarge"
                        placeholder=".form-control-lg"
                      />
                      <Label for="floatLabelLarge">Large</Label>
                    </FloatLabel>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <FloatLabel>
                      <Input type="text" id="floatLabelNormal" placeholder="no modifier" />
                      <Label for="floatLabelNormal">Normal</Label>
                    </FloatLabel>
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group className="mb-0">
                    <FloatLabel size="sm">
                      <Input
                        type="text"
                        size="sm"
                        id="floatLabelSmall"
                        placeholder=".form-control-sm"
                      />
                      <Label for="floatLabelSmall">Small</Label>
                    </FloatLabel>
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
                  <Portlet.Title>Custom checkboxes and radios</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Custom checkboxes and radios can also be disabled. Add the <code>disabled</code>{" "}
                    boolean property to the component and the custom indicator and label description
                    will be automatically styled.
                  </p>
                  <hr />
                  {/* BEGIN Form Group */}
                  <Form.Group>
                    <CustomInput
                      type="checkbox"
                      id="customCheckbox1"
                      label="Default checkbox"
                    />
                    <CustomInput
                      type="checkbox"
                      id="customCheckbox2"
                      label="Disabled checkbox"
                      disabled
                    />
                    <CustomInput
                      type="radio"
                      name="customRadios"
                      id="customRadio1"
                      label="Default radio"
                    />
                    <CustomInput
                      type="radio"
                      name="customRadios"
                      id="customRadio2"
                      label="Second radio"
                    />
                    <CustomInput
                      type="radio"
                      name="customRadios"
                      id="customRadio3"
                      label="Disabled radio"
                      disabled
                    />
                  </Form.Group>
                  {/* END Form Group */}
                  {/* BEGIN Form Group */}
                  <Form.Group className="mb-0">
                    <CustomInput
                      type="checkbox"
                      size="sm"
                      id="customCheckboxSmall"
                      label="Small checkbox"
                    />
                    <CustomInput
                      type="checkbox"
                      id="customCheckboxNormal"
                      label="Default checkbox"
                    />
                    <CustomInput
                      type="checkbox"
                      size="lg"
                      id="customCheckboxLarge"
                      label="Large checkbox"
                    />
                    <CustomInput
                      type="radio"
                      size="sm"
                      id="customRadioSmall"
                      name="customRadioSizing"
                      label="Small radio"
                    />
                    <CustomInput
                      type="radio"
                      id="customRadioNormal"
                      name="customRadioSizing"
                      label="Default radio"
                    />
                    <CustomInput
                      type="radio"
                      size="lg"
                      id="customRadioLarge"
                      name="customRadioSizing"
                      label="Large radio"
                    />
                  </Form.Group>
                  {/* END Form Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Switches</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    A switch has the markup of a custom checkbox but uses the{" "}
                    <code>{'type="switch"'}</code> to render a toggle switch. Switches also support
                    the <code>disabled</code> attribute.
                  </p>
                  <hr />
                  {/* BEGIN Form Group */}
                  <Form.Group className="mb-0">
                    <CustomInput
                      type="switch"
                      id="customSwitch1"
                      label="Toggle this switch element"
                    />
                    <CustomInput
                      type="switch"
                      id="customSwitch2"
                      label="Disabled switch element"
                      disabled
                    />
                  </Form.Group>
                  {/* END Form Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Custom slider</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form Group */}
                  <Form.Group className="mb-0">
                    <Label for="customRange">Example range</Label>
                    <CustomInput type="range" id="customRange" name="customRange" />
                  </Form.Group>
                  {/* END Form Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Custom file input</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Form Group */}
                  <Form.Group className="mb-0">
                    <CustomInput type="file" id="customFile" name="customFile" />
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

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(FormCustomPage)))
