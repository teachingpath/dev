import { Badge, Avatar, Portlet, Dropdown, RichList } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class Widget14Component extends React.Component {
  state = {
    data: [
      {
        avatar: () => (
          <Avatar display variant="label-info">
            <FontAwesomeIcon icon={SolidIcon.faFileInvoice} />
          </Avatar>
        ),
        content: "New report has been received",
        time: "2 min ago"
      },
      {
        avatar: () => (
          <Avatar display variant="label-success">
            <FontAwesomeIcon icon={SolidIcon.faShoppingBasket} />
          </Avatar>
        ),
        content: "Last order was completed",
        time: "1 hrs ago"
      },
      {
        avatar: () => (
          <Avatar display variant="label-danger">
            <FontAwesomeIcon icon={SolidIcon.faUsers} />
          </Avatar>
        ),
        content: "Company meeting canceled",
        time: "5 hrs ago"
      },
      {
        avatar: () => (
          <Avatar display variant="label-warning">
            <FontAwesomeIcon icon={SolidIcon.faPaperPlane} />
          </Avatar>
        ),
        content: "New feedback received",
        time: "6 hrs ago"
      }
    ]
  }

  render() {
    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faBell} />
          </Portlet.Icon>
          <Portlet.Title>Notification</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Dropdown */}
            <Dropdown.Uncontrolled>
              <Dropdown.Toggle caret variant="label-primary">
                All
              </Dropdown.Toggle>
              <Dropdown.Menu right animated>
                <Dropdown.Item href="#">
                  <Badge variant="label-primary">Personal</Badge>
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <Badge variant="label-info">Work</Badge>
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <Badge variant="label-success">Important</Badge>
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <Badge variant="label-danger">Company</Badge>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Uncontrolled>
            {/* END Dropdown */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Rich List */}
          <RichList bordered action>
            {this.state.data.map((data, index) => {
              const { avatar: UserAvatar, content, time } = data

              return (
                <RichList.Item key={index}>
                  <RichList.Addon addonType="prepend">
                    <UserAvatar />
                  </RichList.Addon>
                  <RichList.Content>
                    <RichList.Title children={content} />
                    <RichList.Subtitle children={time} />
                  </RichList.Content>
                  <RichList.Addon addonType="append">
                    {/* BEGIN Dropdown */}
                    <Dropdown.Uncontrolled>
                      <Dropdown.Toggle icon variant="text-secondary">
                        <FontAwesomeIcon icon={SolidIcon.faEllipsisH} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu right animated>
                        <Dropdown.Item href="#" icon={<FontAwesomeIcon icon={SolidIcon.faCheck} />}>
                          Mark as read
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#"
                          icon={<FontAwesomeIcon icon={SolidIcon.faTrashAlt} />}
                        >
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#" icon={<FontAwesomeIcon icon={SolidIcon.faCog} />}>
                          Settings
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Uncontrolled>
                    {/* END Dropdown */}
                  </RichList.Addon>
                </RichList.Item>
              )
            })}
          </RichList>
          {/* END Rich List */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

export default Widget14Component
