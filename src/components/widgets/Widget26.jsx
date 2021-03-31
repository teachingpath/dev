import { Row, Col, Button, Portlet } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Chart from "@panely/apexcharts"
import Link from "next/link"

class Widget26Component extends React.Component {
  state = {
    highlight: "3,478",
    title: "Sales this month",
    link: "#",
    list: [
      () => (
        <React.Fragment>
          <span className="text-success">
            <FontAwesomeIcon icon={SolidIcon.faCaretUp} />
            +11% more sales
          </span>
          in comparison to last month
        </React.Fragment>
      ),
      () => (
        <React.Fragment>
          <span className="text-danger">
            <FontAwesomeIcon icon={SolidIcon.faCaretDown} />
            -2% revenue pre sales
          </span>
          in comparison to last month
        </React.Fragment>
      )
    ]
  }

  render() {
    const { highlight, title, link, list } = this.state

    return (
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faBoxes} />
          </Portlet.Icon>
          <Portlet.Title>Sales change</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          <Row>
            <Col md="6" lg="5" className="p-5">
              <h3 className="display-4" children={highlight} />
              <span className="text-muted" children={title} />
              {list.map((Data, index) => (
                <p key={index} className="text-level-2 my-3">
                  <Data />
                </p>
              ))}
              <Link href={link}>
                <Button variant="label-primary" width="widest">
                  View details
                </Button>
              </Link>
            </Col>
            <Col md="6" lg="7">
              <Widget26Chart theme={this.props.theme} />
            </Col>
          </Row>
        </Portlet.Body>
      </Portlet>
    )
  }
}

class Widget26Chart extends React.Component {
  state = {
    // Chart options
    options: {
      theme: {
        mode: this.props.theme,
        palette: "palette1"
      },
      chart: {
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 0
      },
      stroke: {
        show: true,
        colors: ["#2196f3"],
        lineCap: "round"
      },
      markers: {
        colors: this.props.theme === "dark" ? "#424242" : "#fff",
        strokeWidth: 4,
        strokeColors: "#2196f3"
      },
      tooltip: {
        marker: {
          show: false
        },
        y: {
          formatter: val => `${val} Products` // Format chart tooltip value
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      }
    },
    // Chart series data
    series: [
      {
        name: "Sales",
        data: [640, 400, 760, 620, 980, 640]
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

    return <Chart type="area" options={options} series={series} height={300} />
  }
}

function mapStateToProps(state) {
  return {
    theme: state.page.theme
  }
}

export default connect(mapStateToProps)(Widget26Component)
