import { Portlet } from "@panely/components"
import { connect } from "react-redux"
import Chart from "@panely/apexcharts"

class Widget30Component extends React.Component {
  state = {
    title: "Daily Income",
    subtitle: "Check out each collumn for more details"
  }

  render () {
    const { title, subtitle } = this.state

    return (
      <Portlet>
        <Portlet.Body>
          <h4 className="text-level-2" children={title} />
          <span className="text-muted" children={subtitle} />
          <Widget30Chart theme={this.props.theme} />
        </Portlet.Body>
      </Portlet>
    )
  }
}

class Widget30Chart extends React.Component {
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
        opacity: 1
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      },
      tooltip: {
        y: {
          formatter: val => this.currency.format(val) // Format chart tooltip value
        }
      }
    },
    // Chart series data
    series: [
      {
        name: "Profit",
        data: [4400, 5500, 5700, 5600, 6100, 5800, 6300, 6000]
      },
      {
        name: "Revenue",
        data: [7600, 8500, 10100, 9800, 8700, 10500, 9100, 11400]
      },
      {
        name: "Free Cash",
        data: [3500, 4100, 3600, 2600, 4500, 4800, 5200, 5300]
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

    return <Chart type="bar" options={options} series={series} height={200} />
  }
}

function mapStateToProps(state) {
  return {
    theme: state.page.theme
  }
}

export default connect(mapStateToProps)(Widget30Component)
