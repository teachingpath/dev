import { Portlet } from "@panely/components";
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
          <Portlet.Title>Usuario</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          <p>Email: {user?.email}</p>
          <p>Teléfono: {user?.phone}</p>
          <p>Nombres: {user?.firstName}</p>
          <p>Apellidos: {user?.lastName}</p>
          </Portlet.Body>
      </Portlet>
    );
  }
}

export default SidemenuSettingUser;
