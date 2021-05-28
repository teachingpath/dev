import { Portlet, Progress, Widget4 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class SidemenuSettingPerformance extends React.Component {
  state = {
    data: [
      {
        color: "info",
        title: "CPU Load",
        subtitle: "60%",
        progress: 60
      },
      {
        color: "success",
        title: "CPU Temparature",
        subtitle: "42°",
        progress: 30
      },
      {
        color: "danger",
        title: "RAM Usage",
        subtitle: "6,532 MB",
        progress: 80
      }
    ]
  }

  render() {
    return (
      <Portlet bordered {...this.props}>
        <Portlet.Header bordered>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faBolt} />
          </Portlet.Icon>
          <Portlet.Title>Performance</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          {this.state.data.map((data, index) => {
            const { color, title, subtitle, progress } = data

            return (
              <Widget4 key={index} className="mb-3">
                <Widget4.Group>
                  <Widget4.Display>
                    <Widget4.Subtitle children={title} />
                  </Widget4.Display>
                  <Widget4.Addon>
                    <Widget4.Subtitle className={`text-${color}`} children={subtitle} />
                  </Widget4.Addon>
                </Widget4.Group>
                <Progress value={progress} variant={color} size="sm" />
              </Widget4>
            )
          })}
        </Portlet.Body>
      </Portlet>
    )
  }
}

export default SidemenuSettingPerformance
