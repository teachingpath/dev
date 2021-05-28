import { Portlet, Dropdown, Widget3 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class Widget17Component extends React.Component {
  state = {
    highlight: "12,050",
    detail: () => (
      <React.Fragment>
        <FontAwesomeIcon icon={SolidIcon.faCaretDown} /> 12,5%
      </React.Fragment>
    )
  }

  render() {
    const { highlight, detail: Detail } = this.state

    return (
      <Portlet variant="primary">
        <Portlet.Header>
          <Portlet.Title>Daily sales</Portlet.Title>
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
        {/* BEGIN Widget */}
        <Widget3 size="sm" className="portlet-body">
          <Widget3.Display>
            <Widget3.Title className="text-white">
              {highlight}
              <Widget3.Subtitle className="text-white">
                <Detail />
              </Widget3.Subtitle>
            </Widget3.Title>
          </Widget3.Display>
        </Widget3>
        {/* END Widget */}
      </Portlet>
    )
  }
}

export default Widget17Component
