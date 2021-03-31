import { Dropdown, Portlet, Widget8 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class Widget21Component extends React.Component {
  state = {
    highlight: "34",
    title: "Proposals",
    color: "primary",
    detail: () => (
      <span className="text-muted">
        Completed: <strong>8</strong>
      </span>
    )
  }

  render() {
    const { highlight, title, color, detail: Detail } = this.state

    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Title>Features</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Dropdown */}
            <Dropdown.Uncontrolled>
              <Dropdown.Toggle icon variant="text-secondary">
                <FontAwesomeIcon icon={SolidIcon.faEllipsisH} />
              </Dropdown.Toggle>
              <Dropdown.Menu right animated>
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
          {/* BEGIN Widget */}
          <Widget8>
            <Widget8.Content>
              <Widget8.Highlight size="lg" className={`text-${color}`} children={highlight} />
              <Widget8.Title children={title} />
            </Widget8.Content>
          </Widget8>
          {/* END Widget */}
        </Portlet.Body>
        <Portlet.Footer>
          <Detail />
        </Portlet.Footer>
      </Portlet>
    )
  }
}

export default Widget21Component
