import { Button, Sidemenu } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bindActionCreators } from "redux";
import { sidemenuToggle } from "store/actions";
import { connect } from "react-redux";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import SidemenuSettingUser from "./SidemenuSettingUser";
import SidemenuSettingProfile from "./SidemenuSettingProfile";
import SimpleBar from "simplebar";

class SidemenuSetting extends React.Component {
  bodyRef = React.createRef();

  componentDidMount() {
    new SimpleBar(this.bodyRef.current);
  }

  render() {
    const { show, sidemenuToggle, user } = this.props;

    return (
      <Sidemenu
        show={show}
        align="right"
        width="wider"
        backdropOnClick={() => sidemenuToggle("setting")}
      >
        <Sidemenu.Header>
          <Sidemenu.Title>Configuración</Sidemenu.Title>
          <Sidemenu.Addon>
            <Button
              icon
              variant="label-danger"
              onClick={() => sidemenuToggle("setting")}
            >
              <FontAwesomeIcon icon={SolidIcon.faTimes} />
            </Button>
          </Sidemenu.Addon>
        </Sidemenu.Header>
        <Sidemenu.Body innerRef={this.bodyRef}>
          <SidemenuSettingUser
            className="mb-3"
            user={user}
          />
          <SidemenuSettingProfile
            className="mb-3"
            user={user}
          />
        </Sidemenu.Body>
      </Sidemenu>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: state.sidemenu.setting,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sidemenuToggle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SidemenuSetting);
