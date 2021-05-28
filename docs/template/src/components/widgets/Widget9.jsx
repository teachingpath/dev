import { Avatar, Button, Dropdown, RichList, Widget1 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

class Widget9Component extends React.Component {
  state = {
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam ratione eum quidem.",
    author: "Charlie Stone",
    time: "1 min",
    link: "#"
  }

  render() {
    const { content, author, time, link } = this.state

    return (
      <Widget1>
        <Widget1.Display className="bg-primary text-white">
          <Widget1.Group>
            <Widget1.Title>Announcement</Widget1.Title>
            <Widget1.Addon>
              {/* BEGIN Dropdown */}
              <Dropdown.Uncontrolled>
                <Dropdown.Toggle icon variant="label-light">
                  <FontAwesomeIcon icon={SolidIcon.faEllipsisH} />
                </Dropdown.Toggle>
                <Dropdown.Menu right animated>
                  <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faPoll} />}>
                    Report
                  </Dropdown.Item>
                  <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faCalendarAlt} />}>
                    Event
                  </Dropdown.Item>
                  <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faBell} />}>
                    Notification
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Uncontrolled>
              {/* END Dropdown */}
            </Widget1.Addon>
          </Widget1.Group>
          <Widget1.Dialog>
            <Widget1.DialogContent className="d-flex flex-column align-items-center">
              <h5 className="text-center mb-0" children={content} />
              {/* BEGIN Rich List */}
              <RichList.Item className="py-4">
                <RichList.Addon addonType="prepend">
                  {/* BEGIN Avatar */}
                  <Avatar display circle variant="info" children={author.charAt(0)} />
                  {/* END Avatar */}
                </RichList.Addon>
                <RichList.Content>
                  <RichList.Title className="text-white" children={author} />
                  <RichList.Subtitle className="text-white" children={time} />
                </RichList.Content>
              </RichList.Item>
              {/* END Rich List */}
              <Link href={link}>
                <Button variant="label-light" width="wider">
                  All feeds
                </Button>
              </Link>
            </Widget1.DialogContent>
          </Widget1.Dialog>
        </Widget1.Display>
      </Widget1>
    )
  }
}

export default Widget9Component
