import { Tab, Nav, Badge, Table, Portlet, RichList } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Chart from "@panely/apexcharts"

class Widget24Component extends React.Component {
  state = {
    // Default active tab id
    activeTab: 0,
    // Tabs data
    tabs: [
      {
        time: "Last month",
        employees: [
          {
            firstName: "Garrett",
            lastName: "Winters",
            job: "Accountant",
            office: "Tokyo",
            chart: {
              color: "#2196f3",
              series: [64, 40, 76, 62, 98, 64]
            },
            status: "Excelent",
            salary: "$170,750"
          },
          {
            firstName: "Rhona",
            lastName: "Davidson",
            job: "Integration Specialist",
            office: "Edinburgh",
            chart: {
              color: "#9c27b0",
              series: [23, 50, 26, 54, 38, 45]
            },
            status: "Good",
            salary: "$103,600"
          },
          {
            firstName: "Airi",
            lastName: "Satou",
            job: "Senior Javascript Developer",
            office: "San Francisco",
            chart: {
              color: "#f44336",
              series: [98, 56, 76, 54, 34, 45]
            },
            status: "Bad",
            salary: "$86,000"
          },
          {
            firstName: "Brielle",
            lastName: "Williamson",
            job: "System Architect",
            office: "San Francisco",
            chart: {
              color: "#ff9800",
              series: [65, 86, 23, 54, 90, 45]
            },
            status: "Standard",
            salary: "$137,500"
          }
        ]
      },
      {
        time: "All time",
        employees: [
          {
            firstName: "Rhona",
            lastName: "Davidson",
            job: "Integration Specialist",
            office: "Edinburgh",
            chart: {
              color: "#9c27b0",
              series: [23, 50, 26, 54, 38, 45]
            },
            status: "Good",
            salary: "$103,600"
          },
          {
            firstName: "Brielle",
            lastName: "Williamson",
            job: "System Architect",
            office: "San Francisco",
            chart: {
              color: "#ff9800",
              series: [65, 86, 23, 54, 90, 45]
            },
            status: "Standard",
            salary: "$137,500"
          },
          {
            firstName: "Garrett",
            lastName: "Winters",
            job: "Accountant",
            office: "Tokyo",
            chart: {
              color: "#2196f3",
              series: [64, 40, 76, 62, 98, 64]
            },
            status: "Excelent",
            salary: "$170,750"
          },
          {
            firstName: "Airi",
            lastName: "Satou",
            job: "Senior Javascript Developer",
            office: "San Francisco",
            chart: {
              color: "#f44336",
              series: [98, 56, 76, 54, 34, 45]
            },
            status: "Bad",
            salary: "$86,000"
          }
        ]
      }
    ]
  }

  // Handle toggling tab
  toggle = id => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    return (
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faChartArea} />
          </Portlet.Icon>
          <Portlet.Title>Employee change</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Nav */}
            <Nav lines portlet>
              {this.state.tabs.map((data, index) => (
                <Nav.Item
                  key={index}
                  active={this.state.activeTab === index}
                  onClick={() => this.toggle(index)}
                  children={data.time}
                />
              ))}
            </Nav>
            {/* END Nav */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Tab */}
          <Tab activeTab={this.state.activeTab}>
            {this.state.tabs.map((data, index) => (
              <Tab.Pane tabId={index} key={index}>
                <Table borderless striped hover responsive="md" className="text-nowrap mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Office</th>
                      <th>Change</th>
                      <th>Status</th>
                      <th className="text-right">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.employees.map((data, index) => {
                      const { firstName, lastName, job, office, chart, status, salary } = data

                      return (
                        <tr key={index}>
                          <td className="align-middle">
                            {/* BEGIN Rich List */}
                            <RichList.Item content className="p-0">
                              <RichList.Title children={`${firstName} ${lastName}`} />
                              <RichList.Subtitle children={job} />
                            </RichList.Item>
                            {/* END Rich List */}
                          </td>
                          <td className="align-middle" children={office} />
                          <td className="align-middle" style={{ maxWidth: "8rem" }}>
                            <Widget24Chart
                              theme={this.props.theme}
                              color={chart.color}
                              label={firstName}
                              series={chart.series}
                            />
                          </td>
                          <td className="align-middle">
                            <Badge variant="label-danger" size="lg" children={status} />
                          </td>
                          <td className="align-middle text-right text-primary" children={salary} />
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Tab.Pane>
            ))}
          </Tab>
          {/* END Tab */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

class Widget24Chart extends React.Component {
  state = {
    // Chart options
    options: {
      theme: {
        mode: this.props.theme,
        palette: "palette1"
      },
      chart: {
        sparkline: {
          enabled: true
        }
      },
      fill: {
        opacity: 0
      },
      stroke: {
        show: true,
        colors: [this.props.color],
        lineCap: "round"
      },
      markers: {
        colors: this.props.theme === "dark" ? "#424242" : "#fff",
        strokeWidth: 4,
        strokeColors: this.props.color
      },
      tooltip: {
        followCursor: true,
        marker: {
          show: false
        },
        x: {
          show: false
        },
        y: {
          formatter: val => `${val} Tests` // Format chart tooltip value
        },
        fixed: {
          enabled: true,
          position: "topLeft",
          offsetY: -30
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        crosshairs: {
          show: false
        }
      }
    },
    // Chart series data
    series: [
      {
        name: this.props.label,
        data: this.props.series
      }
    ]
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      let newState = this.state

      // Change chart options
      newState.options.theme = {
        mode: this.props.theme,
        palette: "palette1"
      }
      newState.options.markers.colors = this.props.theme === "dark" ? "#424242" : "#fff"

      this.setState(newState)
    }
  }

  render() {
    const { options, series } = this.state

    return <Chart type="area" options={options} series={series} height={50} />
  }
}

function mapStateToProps(state) {
  return {
    theme: state.page.theme
  }
}

export default connect(mapStateToProps)(Widget24Component)
