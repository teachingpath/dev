import { Row, Col, Table, Marker, Portlet } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Chart from "@panely/apexcharts"

class Widget25Component extends React.Component {
  state = {
    indicators: [
      () => (
        <React.Fragment>
          <Marker type="pill" variant="primary" /> 0% Margin
        </React.Fragment>
      ),
      () => (
        <React.Fragment>
          <Marker type="pill" variant="success" /> 70% Profit
        </React.Fragment>
      ),
      () => (
        <React.Fragment>
          <Marker type="pill" variant="danger" /> 10% Lost
        </React.Fragment>
      )
    ],
    details: [
      {
        title: "EPS",
        value: "+75,10%",
        color: "primary"
      },
      {
        title: "PDO",
        value: "15,900",
        color: "success"
      },
      {
        title: "OPL Status",
        value: "Negative",
        color: "danger"
      },
      {
        title: "Priority",
        value: "+460,080",
        color: "info"
      },
      {
        title: "Net profit",
        value: "$215,950",
        color: "primary"
      }
    ]
  }

  render() {
    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faInbox} />
          </Portlet.Icon>
          <Portlet.Title>Support requests</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          <Row>
            <Col md="6" lg="5">
              <Widget25Chart theme={this.props.theme} />
              <div className="d-flex justify-content-around mt-4">
                {this.state.indicators.map((Data, index) => (
                  <span key={index} className="text-muted">
                    <Data />
                  </span>
                ))}
              </div>
            </Col>
            <Col md="6" lg="7">
              {/* BEGIN Table */}
              <Table>
                <tbody>
                  <tr>
                    <td className="border-top-0">Type</td>
                    <td className="text-right border-top-0">Amount</td>
                  </tr>
                  {this.state.details.map((data, index) => {
                    const { title, value, color } = data

                    return (
                      <tr key={index}>
                        <td children={title} />
                        <td className={`text-right text-${color}`} children={value} />
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              {/* END Table */}
            </Col>
          </Row>
        </Portlet.Body>
      </Portlet>
    )
  }
}

class Widget25Chart extends React.Component {
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
      labels: ["Margin", "Profit", "Lost"],
      colors: ["#2196f3", "#4caf50", "#f44336"],
      tooltip: {
        fillSeriesColor: false,
        y: {
          formatter: val => this.currency.format(val) // Format chart tooltip value
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      }
    },
    // Chart series data
    series: [2000, 7000, 1000]
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

    return (
      <Chart
        type="donut"
        className="d-flex justify-content-center"
        options={options}
        series={series}
        height={300}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    theme: state.page.theme
  }
}

export default connect(mapStateToProps)(Widget25Component)
