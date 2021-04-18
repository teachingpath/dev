import { Form, Portlet, CustomInput } from "@panely/components";
import {  firestoreClient } from "../../firebase/firebaseClient";

class SidemenuSettingProfile extends React.Component {
  // Handle switch element
  handleClick = (e) => {
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

  render() {
    const { user } = this.props;

    return (
      <Portlet bordered {...this.props}>
        <Portlet.Header bordered>
          <Portlet.Title>Profile</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          <Form.Group>
            <CustomInput
              type="switch"
              id="customerSetting1"
              label="Activate trainee mode"
              checked={user?.profile === "trainee"}
              onChange={this.handleClick}
            />
          </Form.Group>
        </Portlet.Body>
      </Portlet>
    );
  }
}

export default SidemenuSettingProfile;
