import { Form, Portlet, CustomInput } from "@panely/components";
import {  firestoreClient } from "../../firebase/firebaseClient";
import { bindActionCreators } from "redux";
import {  pageChangeTheme, userChange } from "store/actions";
import { connect } from "react-redux";

class SidemenuSettingProfile extends React.Component {
  handleProfileClick = (e) => {
    const userUpdated = {
      ...this.props.user,
      profile: e.target.checked ? "trainee" : "coach",
    };
    firestoreClient
      .collection("users")
      .doc(this.props.user?.uid)
      .update({
        profile: userUpdated.profile
      })
      .then((docRef) => {
        this.props.userChange(userUpdated);
      });
  };

  handleLayautClick = (e) => {
    const { theme, pageChangeTheme } = this.props
    const darkModeActive = theme === "dark"
    pageChangeTheme(!darkModeActive ? "dark" : "light");
  }

  render() {
    const { user, theme} = this.props;
    const darkModeActive = theme === "dark"

    return (
      <Portlet bordered >
        <Portlet.Header bordered>
          <Portlet.Title>Perfil</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          <Form.Group>
            <CustomInput
              type="switch"
              id="customerSetting1"
              label="Activar el modo aprendiz"
              checked={user?.profile === "trainee"}
              onChange={this.handleProfileClick}
            />
          </Form.Group>
          <Form.Group>
            <CustomInput
              type="switch"
              id="customerSetting2"
              label={"Habilitar modo "+(!darkModeActive ? "dark" : "light")}
              checked={darkModeActive}
              onChange={this.handleLayautClick}
            />
          </Form.Group>
        </Portlet.Body>
      </Portlet>
    );
  }
}


function mapStateToProps(state) {
  return {
    theme: state.page.theme
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ pageChangeTheme, userChange }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SidemenuSettingProfile);

