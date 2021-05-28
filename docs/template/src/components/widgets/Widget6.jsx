import { Avatar, Button, RichList, Widget1 } from "@panely/components"
import Link from "next/link"

class Widget6Component extends React.Component {
  state = {
    image: "/images/avatar/blank.webp",
    name: "Jackson Bradshaw",
    detail: "Office Manage, San Francisco",
    feed: () => (
      <React.Fragment>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </React.Fragment>
    ),
    link: "#",
    count: 32
  }

  render() {
    const { image, name, detail, feed: Feed, link, count } = this.state

    return (
      <Widget1>
        <Widget1.Display top size="sm" className="justify-content-between bg-primary text-white">
          <Widget1.Group>
            <Widget1.Addon>
              <Button variant="label-light">2019</Button>
            </Widget1.Addon>
          </Widget1.Group>
          <Widget1.Group>
            <Widget1.Title>Personal profile</Widget1.Title>
          </Widget1.Group>
        </Widget1.Display>
        <Widget1.Body>
          {/* BEGIN Rich List */}
          <RichList.Item className="mx-0">
            <RichList.Addon addonType="prepend">
              {/* BEGIN Avatar */}
              <Avatar display>
                <img src={image} alt="Avatar image" />
              </Avatar>
              {/* END Avatar */}
            </RichList.Addon>
            <RichList.Content>
              <RichList.Title children={name} />
              <RichList.Subtitle children={detail} />
            </RichList.Content>
            <RichList.Addon addonType="append" className="d-flex flex-column">
              <h3 className="font-weight-bolder mb-0" children={count} />
              <small className="text-muted">Comments</small>
            </RichList.Addon>
          </RichList.Item>
          {/* END Rich List */}
          <p className="text-level-1 text-justify">
            <Feed />
          </p>
          <Link href={link}>
            <Button variant="label-primary" width="wide">
              Read more
            </Button>
          </Link>
        </Widget1.Body>
      </Widget1>
    )
  }
}

export default Widget6Component
