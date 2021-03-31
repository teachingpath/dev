import {
  Badge,
  Caret,
  Avatar,
  Button,
  Marker,
  Portlet,
  Dropdown,
  RichList
} from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as RegularIcon from "@fortawesome/free-regular-svg-icons"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import SimpleBar from "simplebar"

class HeaderNotification extends React.Component {
  bodyRef = React.createRef()

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
      },
      {
        avatar: () => (
          <Avatar display variant="label-primary">
            <FontAwesomeIcon icon={SolidIcon.faDownload} />
          </Avatar>
        ),
        content: "New update was available",
        time: "1 day ago"
      },
      {
        avatar: () => (
          <Avatar display variant="label-success">
            <FontAwesomeIcon icon={SolidIcon.faAsterisk} />
          </Avatar>
        ),
        content: "Your password was changed",
        time: "2 day ago"
      },
      {
        avatar: () => (
          <Avatar display variant="label-info">
            <FontAwesomeIcon icon={SolidIcon.faUserPlus} />
          </Avatar>
        ),
        content: "New account has been registered",
        time: "5 day ago"
      }
    ]
  }

  onToggle = (e, opened) => {
    // Initialize custom scrollbar
    if (opened) {
      new SimpleBar(this.bodyRef.current)
    }
  }

  render() {
    const { variant, ...attributes } = this.props
    let count = this.state.data.length

    return (
      <Dropdown.Uncontrolled onToggle={this.onToggle} {...attributes}>
        <Dropdown.Toggle icon variant={variant}>
          <FontAwesomeIcon icon={RegularIcon.faBell} />
          {count > 0 ? (
            <Button.Marker>
              <Marker type="dot" variant="success" />
            </Button.Marker>
          ) : null}
        </Dropdown.Toggle>
        <Dropdown.Menu right wide animated className="overflow-hidden py-0">
          {/* BEGIN Portlet */}
          <Portlet scroll className="border-0">
            <Portlet.Header className="bg-primary rounded-0">
              <Portlet.Icon className="text-white">
                <FontAwesomeIcon icon={RegularIcon.faBell} />
              </Portlet.Icon>
              <Portlet.Title className="text-white">Notification</Portlet.Title>
              <Portlet.Addon>
                <Badge
                  variant="warning"
                  shape="square"
                  size="lg"
                  children={count > 9 ? "9+" : count}
                />
              </Portlet.Addon>
            </Portlet.Header>
            <Portlet.Body innerRef={this.bodyRef} className="p-0 rounded-0">
              {/* BEGIN Rich List */}
              <RichList action>
                {this.state.data.map((data, index) => {
                  const { avatar: NotificationAvatar, content, time } = data

                  return (
                    <RichList.Item key={index}>
                      <RichList.Addon addonType="prepend">
                        <NotificationAvatar />
                      </RichList.Addon>
                      <RichList.Content>
                        <RichList.Title children={content} />
                        <RichList.Subtitle children={time} />
                      </RichList.Content>
                      <RichList.Addon addonType="append">
                        <Caret className="mx-2" />
                      </RichList.Addon>
                    </RichList.Item>
                  )
                })}
              </RichList>
              {/* END Rich List */}
            </Portlet.Body>
          </Portlet>
          {/* END Portlet */}
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
    )
  }
}

export default HeaderNotification
