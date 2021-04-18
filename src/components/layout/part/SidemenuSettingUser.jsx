import { Portlet, Progress, Widget4 } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

class SidemenuSettingUser extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Portlet bordered >
        <Portlet.Header bordered>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faUser} />
          </Portlet.Icon>
          <Portlet.Title>User info</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          <p>Email: {user?.email}</p>
          <p>First name: {user?.firstName}</p>
          <p>Last name: {user?.lastName}</p>
          </Portlet.Body>
      </Portlet>
    );
  }
}

export default SidemenuSettingUser;
