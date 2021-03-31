import { Avatar, Portlet, Tooltip, Widget8 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class Widget16Component extends React.Component {
  state = {
    avatar: () => (
      <Widget8.Avatar display circle variant="label-primary">
        <FontAwesomeIcon icon={SolidIcon.faUsers} />
      </Widget8.Avatar>
    ),
    highlight: "35.2K",
    title: "Users",
    detail: () => (
      <React.Fragment>
        <FontAwesomeIcon icon={SolidIcon.faCaretUp} /> 0.2%
      </React.Fragment>
    ),
    color: "success",
    tooltip: "New users for last month"
  }

  render() {
    const { avatar: WidgetAvatar, highlight, title, detail: Detail, color, tooltip } = this.state

    return (
      <Portlet>
        <Portlet.Body>
          {/* BEGIN Widget */}
          <Widget8>
            <Widget8.Addon id="widgetTooltip">
              <FontAwesomeIcon icon={SolidIcon.faQuestion} />
            </Widget8.Addon>
            <Tooltip.Uncontrolled target="widgetTooltip" placement="right" children={tooltip} />
            <Widget8.Content>
              <WidgetAvatar />
              <Widget8.Highlight children={highlight} />
              <Widget8.Title children={title} />
              <Widget8.Subtitle className={`text-${color}`}>
                <Detail />
              </Widget8.Subtitle>
            </Widget8.Content>
          </Widget8>
          {/* END Widget */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

export default Widget16Component
