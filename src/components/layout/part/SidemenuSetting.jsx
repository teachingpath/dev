import { Button, Sidemenu } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { bindActionCreators } from "redux"
import { sidemenuToggle } from "store/actions"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import SidemenuSettingPerformance from "./SidemenuSettingPerformance"
import SidemenuSettingCustomer from "./SidemenuSettingCustomer"
import SidemenuSettingProject from "./SidemenuSettingProject"
import SidemenuSettingReport from "./SidemenuSettingReport"
import SimpleBar from "simplebar"

class SidemenuSetting extends React.Component {
  bodyRef = React.createRef()

  componentDidMount() {
    // Initialize custom scrollbar
    new SimpleBar(this.bodyRef.current)
  }

  render() {
    const { show, sidemenuToggle } = this.props

    return (
      <Sidemenu
        show={show}
        align="right"
        width="wider"
        backdropOnClick={() => sidemenuToggle("setting")}
      >
        <Sidemenu.Header>
          <Sidemenu.Title>Settings</Sidemenu.Title>
          <Sidemenu.Addon>
            <Button icon variant="label-danger" onClick={() => sidemenuToggle("setting")}>
              <FontAwesomeIcon icon={SolidIcon.faTimes} />
            </Button>
          </Sidemenu.Addon>
        </Sidemenu.Header>
        <Sidemenu.Body innerRef={this.bodyRef}>
          <SidemenuSettingPerformance className="mb-3" />
          <SidemenuSettingCustomer className="mb-3" />
          <SidemenuSettingReport className="mb-3" />
          <SidemenuSettingProject className="mb-0" />
        </Sidemenu.Body>
      </Sidemenu>
    )
  }
}

function mapStateToProps(state) {
  return {
    show: state.sidemenu.setting
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sidemenuToggle }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SidemenuSetting)
