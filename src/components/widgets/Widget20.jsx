import { Portlet, Widget9 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

class Widget20Component extends React.Component {
  state = {
    degreeSign: "°C",
    highlightIcon: () => <FontAwesomeIcon icon={SolidIcon.faCloudSunRain} />,
    highlightContent: "28",
    grid: [
      {
        icon: () => <FontAwesomeIcon icon={SolidIcon.faFan} />,
        content: "12 KM"
      },
      {
        icon: () => <FontAwesomeIcon icon={SolidIcon.faCompass} />,
        content: "NW"
      },
      {
        icon: () => <FontAwesomeIcon icon={SolidIcon.faCloud} />,
        content: "98%"
      }
    ],
    list: [
      {
        icon: () => <FontAwesomeIcon icon={SolidIcon.faCloudSun} />,
        content: "30",
        info: "Sun"
      },
      {
        icon: () => <FontAwesomeIcon icon={SolidIcon.faCloudRain} />,
        content: "25",
        info: "Tue"
      },
      {
        icon: () => <FontAwesomeIcon icon={SolidIcon.faCloudShowersHeavy} />,
        content: "22",
        info: "Wed"
      }
    ]
  }

  render() {
    const { degreeSign, highlightIcon: HighlightIcon, highlightContent, grid, list } = this.state

    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faMapMarkerAlt} />
          </Portlet.Icon>
          <Portlet.Title>Weather</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body className="p-0">
          {/* BEGIN Widget */}
          <Widget9>
            <Widget9.Display>
              <Widget9.Icon>
                <HighlightIcon />
              </Widget9.Icon>
              <Widget9.Text>
                {highlightContent}
                <Widget9.Degree children={degreeSign} />
              </Widget9.Text>
            </Widget9.Display>
            <Widget9.Grid>
              {grid.map((data, index) => {
                const { icon: Icon, content } = data

                return (
                  <Widget9.GridItem key={index}>
                    <Widget9.GridIcon>
                      <Icon />
                    </Widget9.GridIcon>
                    <Widget9.GridText children={content} />
                  </Widget9.GridItem>
                )
              })}
            </Widget9.Grid>
            <Widget9.List>
              {list.map((data, index) => {
                const { icon: Icon, content, info } = data

                return (
                  <Widget9.ListItem key={index}>
                    <Widget9.ListText children={info} />
                    <Widget9.ListAddon>
                      <Widget9.Display size="sm">
                        <Widget9.Icon>
                          <Icon />
                        </Widget9.Icon>
                        <Widget9.Text>
                          {content}
                          <Widget9.Degree children={degreeSign} />
                        </Widget9.Text>
                      </Widget9.Display>
                    </Widget9.ListAddon>
                  </Widget9.ListItem>
                )
              })}
            </Widget9.List>
          </Widget9>
          {/* END Widget */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

export default Widget20Component
