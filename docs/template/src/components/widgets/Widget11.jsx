import { Avatar, Portlet, Widget8, Widget10 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class Widget11Component extends React.Component {
  state = {
    data: [
      {
        highlight: "$27,639",
        title: "Total revenue",
        avatar: () => (
          <Widget8.Avatar display circle variant="label-info" className="m-0">
            <FontAwesomeIcon icon={SolidIcon.faDollarSign} />
          </Widget8.Avatar>
        )
      },
      {
        highlight: "87,123",
        title: "Order received",
        avatar: () => (
          <Widget8.Avatar display circle variant="label-primary" className="m-0">
            <FontAwesomeIcon icon={SolidIcon.faDollyFlatbed} />
          </Widget8.Avatar>
        )
      }
    ]
  }

  render() {
    return (
      <Portlet>
        {/* BEGIN Widget */}
        <Widget10 vertical="lg">
          {this.state.data.map((data, index) => {
            const { highlight, title, avatar: WidgetAvatar } = data

            return (
              <Widget10.Item key={index}>
                <Widget10.Content>
                  <Widget10.Title children={highlight} />
                  <Widget10.Subtitle children={title} />
                </Widget10.Content>
                <Widget10.Addon>
                  <WidgetAvatar />
                </Widget10.Addon>
              </Widget10.Item>
            )
          })}
        </Widget10>
        {/* END Widget */}
      </Portlet>
    )
  }
}

export default Widget11Component
