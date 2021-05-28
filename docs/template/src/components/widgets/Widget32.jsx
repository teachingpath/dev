import { Portlet } from "@panely/components"
import { connect } from "react-redux"
import Chart from "@panely/apexcharts"

class Widget32Component extends React.Component {
  state = {
    title: "New users",
    subtitle: "Last 6 months"
  }

  render() {
    const { title, subtitle } = this.state

    return (
      <Portlet variant="primary">
        <Portlet.Body>
          <h4 children={title} />
          <span children={subtitle} />
          <Widget32Chart theme={this.props.theme} />
        </Portlet.Body>
      </Portlet>
    )
  }
}

class Widget32Chart extends React.Component {
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
      markers: {
        strokeColors: "#fff"
      },
      stroke: {
        show: true,
        colors: ["#fff"],
        lineCap: "round"
      },
      tooltip: {
        marker: {
          show: false
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
        name: "Visit",
        data: [320, 450, 360, 560, 440, 480]
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

      this.setState(newState)
    }
  }

  render() {
    const { options, series } = this.state

    return <Chart type="area" options={options} series={series} height={150} />
  }
}

function mapStateToProps(state) {
  return {
    theme: state.page.theme
  }
}

export default connect(mapStateToProps)(Widget32Component)
