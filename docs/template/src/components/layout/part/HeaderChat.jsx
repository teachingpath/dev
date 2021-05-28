import {
  Chat,
  Input,
  Avatar,
  Button,
  Marker,
  Portlet,
  Dropdown,
  RichList,
  InputGroup
} from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as RegularIcon from "@fortawesome/free-regular-svg-icons"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import SimpleBar from "simplebar"

class HeaderChat extends React.Component {
  bodyRef = React.createRef()

  state = {
    name: "Garrett Winters",
    title: "UX Designer",
    avatar: () => (
      <Avatar display circle>
        <img src="/images/avatar/blank.webp" alt="Avatar image" />
      </Avatar>
    ),
    conversation: [
      {
        align: "left",
        time: "3 min ago",
        bubbles: [
          {
            variant: "primary",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, eius."
          },
          {
            variant: "primary",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, eius."
          }
        ]
      },
      {
        align: "right",
        time: "2 min ago",
        bubbles: [
          {
            variant: false,
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, eius."
          }
        ]
      },
      {
        align: "left",
        time: "1 min ago",
        bubbles: [
          {
            variant: "primary",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, eius."
          }
        ]
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
    const { name, title, avatar: UserAvatar } = this.state
    const count = this.state.conversation.length

    return (
      <Dropdown.Uncontrolled onToggle={this.onToggle} {...attributes}>
        <Dropdown.Toggle icon variant={variant}>
          <FontAwesomeIcon icon={RegularIcon.faComments} />
          {count > 0 ? (
            <Button.Marker>
              <Marker type="dot" variant="success" />
            </Button.Marker>
          ) : null}
        </Dropdown.Toggle>
        <Dropdown.Menu right wide animated className="overflow-hidden py-0">
          {/* BEGIN Portlet */}
          <Portlet scroll className="border-0">
            <Portlet.Header bordered className="rounded-0">
              {/* BEGIN Rich List */}
              <RichList.Item className="w-100 p-0">
                <RichList.Addon addonType="prepend">
                  <UserAvatar />
                </RichList.Addon>
                <RichList.Content>
                  <RichList.Title children={name} />
                  <RichList.Subtitle children={title} />
                </RichList.Content>
              </RichList.Item>
              {/* END Rich List */}
            </Portlet.Header>
            <Portlet.Body innerRef={this.bodyRef}>
              {/* BEGIN Chat */}
              <Chat>
                {this.state.conversation.map((conversation, index) => (
                  <Chat.Item key={index} align={conversation.align}>
                    <Chat.Content>
                      {conversation.bubbles.map((bubble, index) =>
                        bubble.variant ? (
                          <Chat.Bubble
                            key={index}
                            variant={bubble.variant}
                            children={bubble.content}
                          />
                        ) : (
                          <Chat.Bubble key={index} children={bubble.content} />
                        )
                      )}
                      <Chat.Time children={conversation.time} />
                    </Chat.Content>
                  </Chat.Item>
                ))}
              </Chat>
              {/* END Chat */}
            </Portlet.Body>
            <Portlet.Footer bordered className="rounded-0">
              {/* BEGIN Input Group */}
              <InputGroup>
                <Input type="text" placeholder="Type..." />
                <InputGroup.Addon addonType="append">
                  <Button icon variant="primary">
                    <FontAwesomeIcon icon={SolidIcon.faPaperPlane} />
                  </Button>
                </InputGroup.Addon>
              </InputGroup>
              {/* END Input Group */}
            </Portlet.Footer>
          </Portlet>
          {/* END Portlet */}
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
    )
  }
}

export default HeaderChat
