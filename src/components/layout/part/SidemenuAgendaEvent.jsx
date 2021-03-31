import { Marker, Portlet, RichList, Timeline } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class SidemenuAgendaEvent extends React.Component {
  state = {
    data: [
      {
        time: "12:00",
        text: "Donec laoreet fringilla justo a pellentesque",
        marker: () => <Marker type="circle" variant="primary" />
      },
      {
        time: "13:20",
        text: "Nunc quis massa nec enim",
        marker: () => <Marker type="circle" variant="success" />
      },
      {
        time: "14:00",
        text: "Praesent sit amet",
        marker: () => <Marker type="circle" variant="danger" />
      }
    ]
  }

  render() {
    return (
      <Portlet bordered {...this.props}>
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faTasks} />
          </Portlet.Icon>
          <Portlet.Title>Upcoming events</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Timeline */}
          <Timeline className="rich-list-bordered">
            {this.state.data.map((data, index) => {
              const { time, text, marker: TimelineMarker } = data

              return (
                <Timeline.Item key={index} pin={<TimelineMarker />}>
                  {/* BEGIN Rich List */}
                  <RichList.Item content>
                    <RichList.Title children={time} />
                    <RichList.Subtitle children={text} />
                  </RichList.Item>
                  {/* END Rich List */}
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

export default SidemenuAgendaEvent
