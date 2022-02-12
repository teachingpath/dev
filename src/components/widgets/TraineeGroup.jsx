import { Marker, Portlet, Timeline } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Spinner from "@panely/components/Spinner";
import { AvatarGroup } from "@panely/components";
import { Avatar } from "@panely/components";
import { getJourneyByPathwayId } from "consumer/journey";
import Link from "next/link";
class TraineeGroup extends React.Component {
  state = { data: [] };

  componentDidMount() {
    getJourneyByPathwayId(
      this.props.pathwayId,
      (result) => {
        this.setState({
          data: result.data.map((r) => {
            return {...r.user, id: r.userId};
          }),
        });
      },
      () => {}
    );
  }

  render() {
    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faUsers} />
          </Portlet.Icon>
          <Portlet.Title>Grupo [{this.props.group}]</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body className="list">
          {this.state.data.length === 0 && <Spinner />}
          <AvatarGroup className="m-2">
            {this.state.data.map((user, index) => (
              <Avatar key={index} circle display style={{cursor: "pointer"}}>
                <Link href={"/user?uid=" + user.id}>
                  <img
                    src={user.image}
                    alt="Avatar image"
                    title={user.displayName}
                  />
                </Link>
              </Avatar>
            ))}
          </AvatarGroup>
        </Portlet.Body>
      </Portlet>
    );
  }
}

export default TraineeGroup;
