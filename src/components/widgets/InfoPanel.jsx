import {  Portlet, Widget8, Widget10 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

class InfoPanelComponent extends React.Component {
  state = {
    data: [
      {
        title: "100%",
        subtitle: "Popularity",
        avatar: () => (
          <Widget8.Avatar display circle variant="label-primary" className="m-0">
            <FontAwesomeIcon icon={SolidIcon.faRocket}/>
          </Widget8.Avatar>
        )
      },
      {
        title: "0",
        subtitle: "Trainees running",
        avatar: () => (
          <Widget8.Avatar display circle variant="label-success" className="m-0">
            <FontAwesomeIcon icon={SolidIcon.faRunning}/>
          </Widget8.Avatar>
        )
      },
      {
        title: "Share",
        subtitle: "Share your pathways",
        avatar: () => (
          <Widget8.Avatar display circle variant="label-danger" className="m-0">
            <FontAwesomeIcon icon={SolidIcon.faLink}/>
          </Widget8.Avatar>
        )
      }
    ]
  }

  render() {
    return (
      <Portlet>
        <Widget10 vertical="md">
          {this.state.data.map((data, index) => {
            const { title, subtitle, avatar: WidgetAvatar } = data

            return (
              <Widget10.Item key={index}>
                <Widget10.Content>
                  <Widget10.Title children={title} />
                  <Widget10.Subtitle children={subtitle} />
                </Widget10.Content>
                <Widget10.Addon>
                  <WidgetAvatar />
                </Widget10.Addon>
              </Widget10.Item>
            )
          })}
        </Widget10>
      </Portlet>
    )
  }
}

export default InfoPanelComponent
