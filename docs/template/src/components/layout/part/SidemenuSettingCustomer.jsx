import { Form, Portlet, CustomInput } from "@panely/components"

class SidemenuSettingCustomer extends React.Component {
  state = {
    setting1: false,
    setting2: true,
    setting3: false
  }

  // Handle switch element
  handleClick = (e, identifier) => {
    this.setState({ ...this.state, [identifier]: e.target.checked })
  }

  render() {
    return (
      <Portlet bordered {...this.props}>
        <Portlet.Header bordered>
          <Portlet.Title>Customer care</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Form Group */}
          <Form.Group>
            <CustomInput
              type="switch"
              id="customerSetting1"
              label="Enable notifications"
              checked={this.state.setting1}
              onChange={e => this.handleClick(e, "setting1")}
            />
          </Form.Group>
          {/* END Form Group */}
          {/* BEGIN Form Group */}
          <Form.Group>
            <CustomInput
              type="switch"
              id="customerSetting2"
              label="Enable case tracking"
              checked={this.state.setting2}
              onChange={e => this.handleClick(e, "setting2")}
            />
          </Form.Group>
          {/* END Form Group */}
          {/* BEGIN Form Group */}
          <Form.Group className="mb-0">
            <CustomInput
              type="switch"
              id="customerSetting3"
              label="Support portal"
              checked={this.state.setting3}
              onChange={e => this.handleClick(e, "setting3")}
            />
          </Form.Group>
          {/* END Form Group */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

export default SidemenuSettingCustomer
