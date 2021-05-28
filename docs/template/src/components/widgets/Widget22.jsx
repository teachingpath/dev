import { Row, Col, Portlet, Dropdown, Progress, Widget4 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Chart from "@panely/apexcharts"

class Widget22Component extends React.Component {
  state = {
    data: [
      [
        {
          title: "New York",
          progress: 60,
          color: "warning"
        },
        {
          title: "Sydney",
          progress: 90,
          color: "success"
        }
      ],
      [
        {
          title: "San Francisco",
          progress: 75,
          color: "primary"
        },
        {
          title: "Tokyo",
          progress: 55,
          color: "danger"
        }
      ]
    ]
  }

  render() {
    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faExchangeAlt} />
          </Portlet.Icon>
          <Portlet.Title>Revenue change</Portlet.Title>
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
        <Portlet.Body>
          <Widget22Chart theme={this.props.theme} />
          <Row className="mt-4">
            {this.state.data.map((data, index) => {
              const colSize = 12 / this.state.data.length

              return (
                <Col key={index} xs={colSize}>
                  {data.map((data, index) => {
                    const { title, progress, color } = data
                    const marginClass = this.state.data.length - 1 > index ? "mb-3" : ""

                    return (
                      <Widget4 key={index} className={marginClass}>
                        <Widget4.Group>
                          <Widget4.Display>
                            <Widget4.Subtitle children={title} />
                          </Widget4.Display>
                          <Widget4.Addon>
                            <Widget4.Subtitle children={`${progress}%`} />
                          </Widget4.Addon>
                        </Widget4.Group>
                        <Progress value={progress} variant={color} size="sm" />
                      </Widget4>
                    )
                  })}
                </Col>
              )
            })}
          </Row>
        </Portlet.Body>
      </Portlet>
    )
  }
}

class Widget22Chart extends React.Component {
  // Currency formatter
  currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  })

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
      markers: {
        strokeColors: this.props.theme === "dark" ? "#424242" : "#fff"
      },
      stroke: {
        show: false
      },
      tooltip: {
        marker: {
          show: false
        },
        y: {
          formatter: val => this.currency.format(val) // Format chart tooltip value
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        crosshairs: {
          show: false
        }
      },
      responsive: [
        {
          breakpoint: 576,
          options: {
            chart: {
              height: 200
            }
          }
        }
      ]
    },
    // Chart series data
    series: [
      {
        name: "Revenue",
        data: [3100, 4000, 2800, 5100, 4200, 10900, 5600, 8600, 7000]
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
      newState.options.markers.strokeColors = this.props.theme === "dark" ? "#424242" : "#fff"

      this.setState(newState)
    }
  }

  render() {
    const { options, series } = this.state

    return <Chart type="area" options={options} series={series} height={300} />
  }
}

function mapStateToProps(state) {
  return {
    theme: state.page.theme
  }
}

export default connect(mapStateToProps)(Widget22Component)
