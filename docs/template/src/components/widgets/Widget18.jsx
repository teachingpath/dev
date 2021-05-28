import { Avatar, Portlet, Widget8 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

class Widget16Component extends React.Component {
  state = {
    avatar: () => (
      <Widget8.Avatar display circle variant="label-info">
        <FontAwesomeIcon icon={SolidIcon.faDollarSign} />
      </Widget8.Avatar>
    ),
    highlight: "$23K",
    title: "Profit",
    color: "danger",
    detail: () => (
      <React.Fragment>
        <FontAwesomeIcon icon={SolidIcon.faCaretDown} /> 1.4%
      </React.Fragment>
    )
  }

  render() {
    const { avatar: WidgetAvatar, highlight, title, color, detail: Detail } = this.state

    return (
      <Portlet>
        <Portlet.Body>
          {/* BEGIN Widget */}
          <Widget8>
            <Widget8.Content>
              <WidgetAvatar />
              <Widget8.Highlight children={highlight} />
              <Widget8.Title title={title} />
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
