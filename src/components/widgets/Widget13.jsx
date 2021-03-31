import { Avatar, Marker, Portlet, Timeline, AvatarGroup } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class Widget13Component extends React.Component {
  state = {
    data: [
      {
        time: "10:00",
        color: "primary",
        content: () => (
          <div>
            <span>Meeting with</span>
            <AvatarGroup className="ml-2">
              <Avatar display circle>
                <img src="/images/avatar/blank.webp" alt="Avatar image" />
              </Avatar>
              <Avatar display circle>
                <img src="/images/avatar/blank.webp" alt="Avatar image" />
              </Avatar>
              <Avatar display circle>
                <img src="/images/avatar/blank.webp" alt="Avatar image" />
              </Avatar>
            </AvatarGroup>
          </div>
        )
      },
      {
        time: "12:45",
        color: "warning",
        content: () => (
          <p className="mb-0">
            Lorem ipsum dolor sit amit,consectetur eiusmdd tempor incididunt ut labore et dolore
            magna elit enim at minim veniam quis nostrud
          </p>
        )
      },
      {
        time: "14:00",
        color: "danger",
        content: () => (
          <p className="mb-0">
            Received a new feedback on <a href="#">GoFinance</a> App product.
          </p>
        )
      },
      {
        time: "15:20",
        color: "success",
        content: () => (
          <p className="mb-0">
            Lorem ipsum dolor sit amit,consectetur eiusmdd tempor incididunt ut labore et dolore
            magna.
          </p>
        )
      },
      {
        time: "17:00",
        color: "info",
        content: () => (
          <p className="mb-0">
            Make Deposit <a href="#">USD 700</a> o ESL.
          </p>
        )
      }
    ]
  }

  render() {
    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faClipboardList} />
          </Portlet.Icon>
          <Portlet.Title>Recent activities</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Timeline */}
          <Timeline timed>
            {this.state.data.map((data, index) => {
              const { time, color, content: Content } = data

              return (
                <Timeline.Item
                  key={index}
                  time={time}
                  pin={<Marker type="circle" variant={color} />}
                >
                  <Content />
                </Timeline.Item>
              )
            })}
          </Timeline>
          {/* END Timeline */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

export default Widget13Component
