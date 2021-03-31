import { Button, Portlet, Dropdown, Widget5 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class Widget3Component extends React.Component {
  state = {
    data: [
      {
        title: "Monthly income",
        detail: [
          {
            info: "Total",
            value: "$65,880"
          },
          {
            info: "Change",
            value: "+15%",
            color: "success"
          },
          {
            info: "Sales",
            value: "554"
          }
        ]
      },
      {
        title: "Employee amount",
        detail: [
          {
            info: "Total",
            value: "1250"
          },
          {
            info: "Change",
            value: "-2%",
            color: "danger"
          },
          {
            info: "Active",
            value: "1120"
          }
        ]
      },
      {
        title: "Product sales",
        detail: [
          {
            info: "Total",
            value: "2350"
          },
          {
            info: "Change",
            value: "+10%",
            color: "success"
          },
          {
            info: "Last report",
            value: "2220"
          }
        ]
      },
      {
        title: "Monthly profit",
        detail: [
          {
            info: "Total",
            value: "$502,100"
          },
          {
            info: "Change",
            value: "+15%",
            color: "success"
          },
          {
            info: "Last month",
            value: "$453,000"
          }
        ]
      }
    ]
  }

  render() {
    return (
      <Portlet variant="primary">
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faChalkboard} />
          </Portlet.Icon>
          <Portlet.Title>Company summary</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Dropdown */}
            <Dropdown.Uncontrolled>
              <Dropdown.Toggle caret variant="label-light">
                June, 2020
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
                <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faCog} />}>
                  Settings
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Uncontrolled>
            {/* END Dropdown */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {this.state.data.map((data, index) => {
            const marginClass = this.state.data.length - 1 > index ? "mb-2" : "mb-0"

            return (
              <Portlet key={index} className={marginClass}>
                <Portlet.Body>
                  {/* BEGIN Widget */}
                  <Widget5>
                    <Widget5.Title children={data.title} />
                    <Widget5.Group>
                      {data.detail.map((data, index) => {
                        const { info, value, color } = data

                        return (
                          <Widget5.Item key={index}>
                            <Widget5.Info children={info} />
                            {color ? (
                              <Widget5.Value className={`text-${color}`} children={value} />
                            ) : (
                              <Widget5.Value children={value} />
                            )}
                          </Widget5.Item>
                        )
                      })}
                    </Widget5.Group>
                  </Widget5>
                  {/* END Widget */}
                </Portlet.Body>
              </Portlet>
            )
          })}
        </Portlet.Body>
        <Portlet.Footer align="right">
          <Button variant="label-light">View all packages</Button>
        </Portlet.Footer>
      </Portlet>
    )
  }
}

export default Widget3Component
