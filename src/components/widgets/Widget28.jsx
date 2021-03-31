import { Avatar, Portlet, Widget8, Widget10, Widget11 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Chart from "@panely/apexcharts"

class Widget28Component extends React.Component {
  state = {
    highlight: "$27,639",
    title: "Total revenue",
    avatar: () => (
      <Widget8.Avatar display circle variant="label-primary" className="m-0">
        <FontAwesomeIcon icon={SolidIcon.faDollarSign} />
      </Widget8.Avatar>
    )
  }

  render() {
    const { highlight, title, avatar: WidgetAvatar } = this.state

    return (
      <Portlet>
        <Portlet.Body>
          {/* BEGIN Widget */}
          <Widget10.Item className="p-0">
            <Widget10.Content>
              <Widget10.Title children={highlight} />
              <Widget10.Subtitle children={title} />
            </Widget10.Content>
            <Widget10.Addon>
              <WidgetAvatar />
            </Widget10.Addon>
          </Widget10.Item>
          {/* END Widget */}
        </Portlet.Body>
        <Widget28Chart theme={this.props.theme} />
      </Portlet>
    )
  }
}

class Widget28Chart extends React.Component {
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
      fill: {
        type: "solid",
        colors: ["#2196f3"],
        opacity: 0.1
      },
      stroke: {
        show: true,
        colors: ["#2196f3"]
      },
      markers: {
        colors: this.props.theme === "dark" ? "#424242" : "#fff",
        strokeWidth: 4,
        strokeColors: ["#2196f3"]
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
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        crosshairs: {
          show: false
        }
      }
    },
    // Chart series data
    series: [
      {
        name: "Revenue",
        data: [6400, 4000, 7600, 6200, 9800, 6400]
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

    return (
      <Widget11 bottom>
        <Chart
          type="area"
          options={options}
          series={series}
          height={200}
        />
      </Widget11>
    )
  }
}

function mapStateToProps(state) {
  return {
    theme: state.page.theme
  }
}

export default connect(mapStateToProps)(Widget28Component)
