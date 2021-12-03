import { Portlet, Button } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { firebaseClient } from "components/firebase/firebaseClient";
import { Router } from "next/router";

class SidemenuSettingUser extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Portlet bordered>
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
          <Button
           className="mr-2"
            onClick={() => {
             window.location.href = "/profile";
            }}
          >
            Editar
          </Button>
          <SignOut />
        </Portlet.Body>
      </Portlet>
    );
  }
}

function SignOut() {
  const auth = firebaseClient.auth();
  return (
    auth.currentUser && (
      <Button
        variant={"secondary"}
        className="button right "
        onClick={() => {
          auth.signOut();
          Router.push("/");
        }}
      >
        Salir
      </Button>
    )
  );
}

export default SidemenuSettingUser;
