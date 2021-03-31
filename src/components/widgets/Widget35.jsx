import { Portlet, Dropdown, Widget8 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class Widget35Component extends React.Component {
  state = {
    highlight: "21",
    title: "Report",
    color: "danger",
    detail: () => (
      <span className="text-muted">
        Fixed: <strong>4</strong>
      </span>
    )
  }

  render() {
    const { highlight, title, color, detail: Detail } = this.state

    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Title>Bug</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Dropdown */}
            <Dropdown.Uncontrolled>
              <Dropdown.Toggle icon variant="label-light">
                <FontAwesomeIcon icon={SolidIcon.faEllipsisH} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faPoll} />}>
                  Report
                </Dropdown.Item>
                <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faChartPie} />}>
                  Charts
                </Dropdown.Item>
                <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faChartLine} />}>
                  Statistics
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Uncontrolled>
            {/* END Dropdown */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          <Widget8>
            <Widget8.Content>
              <Widget8.Highlight size="lg" className={`text-${color}`} children={highlight} />
              <Widget8.Title children={title} />
            </Widget8.Content>
          </Widget8>
        </Portlet.Body>
        <Portlet.Footer>
          <Detail />
        </Portlet.Footer>
      </Portlet>
    )
  }
}

export default Widget35Component
