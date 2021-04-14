import { Portlet, RichList, Dropdown } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from "react-redux"
import * as BrandsIcon from "@fortawesome/free-brands-svg-icons"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Chart from "@panely/apexcharts"

class Widget27Component extends React.Component {
  state = {
    data: [
      {
      
        brand: "Python",
        category: "220 Students"
      },
      {
      
        brand: "Facebook",
        category: "240 Students"
      },
      {
      
        brand: "Android",
        category: "150 Students"
      },
      {
      
        brand: "Apple",
        category: "100 Students"
      }
    ]
  }

  render() {
    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faBullhorn} />
          </Portlet.Icon>
          <Portlet.Title>Most used pathways</Portlet.Title>
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
                <Dropdown.Divider />
                <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faCog} />}>
                  Customize
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Uncontrolled>
            {/* END Dropdown */}
          </Portlet.Addon>
        </Portlet.Header>
        <Widget27Chart theme={this.props.theme} />
        <Portlet.Body>
          {/* BEGIN Rich List */}
          <RichList flush>
            {this.state.data.map((data, index) => {
              const { brand, category } = data

              return (
                <RichList.Item key={index}>
                  <RichList.Content>
                    <RichList.Title children={brand} />
                    <RichList.Subtitle children={category} />
                  </RichList.Content>
                </RichList.Item>
              )
            })}
          </RichList>
          {/* END Rich List */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

class Widget27Chart extends React.Component {
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
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
      tooltip: {
        marker: {
          show: false
        },
        y: {
          formatter: val => `${val}` // Format chart tooltip value
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        crosshairs: {
          show: false
        }
      }
    },
    // Chart series data
    series: [
      {
        name: "Students",
        data: [6400, 4000, 7600, 6200, 9800, 6400, 8600, 7000]
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

    return <Chart type="area" className="my-3" options={options} series={series} height={300} />
  }
}

function mapStateToProps(state) {
  return {
    theme: state.page.theme
  }
}

export default connect(mapStateToProps)(Widget27Component)
