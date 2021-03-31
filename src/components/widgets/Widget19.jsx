import { Dropdown, Portlet, Widget3 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class Widget19Component extends React.Component {
  state = {
    highlight: "$5,650",
    detail: () => (
      <React.Fragment>
        <FontAwesomeIcon icon={SolidIcon.faCaretUp} /> 25,2%
      </React.Fragment>
    )
  }

  render() {
    const { highlight, detail: Detail } = this.state

    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Title>Monthly profit</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Dropdown */}
            <Dropdown.Uncontrolled>
              <Dropdown.Toggle icon variant="label-primary">
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
        {/* BEGIN Widget */}
        <Widget3 size="sm" className="portlet-body">
          <Widget3.Display>
            <Widget3.Title>
              {highlight}
              <Widget3.Subtitle>
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

export default Widget19Component
