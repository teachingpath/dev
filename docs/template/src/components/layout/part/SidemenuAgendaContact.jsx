import { Badge, Avatar, Button, Marker, Portlet, RichList } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class SidemenuAgendaContact extends React.Component {
  state = {
    data: [
      {
        name: "Charlie Stone",
        title: "Art Director",
        time: "1 min",
        link: "#",
        image: "/images/avatar/blank.webp",
        count: 1,
        online: false,
        avatarMarker: () => (
          <Avatar.Icon variant="info">
            <FontAwesomeIcon icon={SolidIcon.faThumbtack} />
          </Avatar.Icon>
        )
      },
      {
        name: "Freddie Stevens",
        title: "Journalist",
        time: "2 hour",
        link: "#",
        image: "/images/avatar/blank.webp",
        count: 12,
        online: true
      },
      {
        name: "Tyler Clark",
        title: "Programmer",
        time: "5 hour",
        link: "#",
        image: "/images/avatar/blank.webp",
        count: 0,
        online: true
      },
      {
        name: "Darcy Harrison",
        title: "Internet Marketer",
        time: "1 day",
        link: "#",
        image: "/images/avatar/blank.webp",
        count: 2,
        online: false,
        avatarMarker: () => (
          <Avatar.Icon variant="success">
            <FontAwesomeIcon icon={SolidIcon.faCheck} />
          </Avatar.Icon>
        )
      },
      {
        name: "Victor Payne",
        title: "Accountant",
        time: "1 day",
        link: "#",
        image: "/images/avatar/blank.webp",
        count: 5,
        online: true
      },
      {
        name: "Alberta Harris",
        title: "UI Designer",
        time: "2 day",
        link: "#",
        image: "/images/avatar/blank.webp",
        count: 4,
        online: false
      }
    ]
  }

  render() {
    return (
      <Portlet bordered {...this.props}>
        <Portlet.Header bordered>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faUsers} />
          </Portlet.Icon>
          <Portlet.Title>Contacts</Portlet.Title>
          <Portlet.Addon>
            <Button icon variant="label-primary">
              <FontAwesomeIcon icon={SolidIcon.faPlus} />
            </Button>
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body className="p-0">
          {/* BEGIN RichList */}
          <RichList flush action>
            {this.state.data.map((data, index) => {
              const {
                name,
                title,
                time,
                link,
                image,
                count,
                online,
                avatarMarker: AvatarMarker
              } = data

              return (
                <RichList.Item key={index} href="#">
                  <RichList.Addon addonType="prepend">
                    {/* BEGIN Avatar */}
                    <Avatar circle>
                      {Boolean(AvatarMarker) ? (
                        <Avatar.Addon position="top">
                          <AvatarMarker />
                        </Avatar.Addon>
                      ) : null}
                      <Avatar.Display>
                        <img src={image} alt="Avatar image" />
                      </Avatar.Display>
                      <Avatar.Addon position="bottom">
                        {online ? (
                          <Marker type="dot" variant="success" />
                        ) : (
                          <Marker type="dot" variant="secondary" />
                        )}
                      </Avatar.Addon>
                    </Avatar>
                    {/* END Avatar */}
                  </RichList.Addon>
                  <RichList.Content>
                    <RichList.Title children={name} />
                    <RichList.Subtitle children={title} />
                  </RichList.Content>
                  <RichList.Addon addonType="append" className="flex-column align-items-end">
                    <span className="text-muted text-nowrap" children={time} />
                    {count > 0 ? <Badge pill variant="success" children={count} /> : null}
                  </RichList.Addon>
                </RichList.Item>
              )
            })}
          </RichList>
          {/* END RichList */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

export default SidemenuAgendaContact
