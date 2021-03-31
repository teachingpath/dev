import React from "react"
import PropTypes from "prop-types"
import ApexCharts from "./apexcharts"

window.ApexCharts = ApexCharts

class Charts extends React.Component {
  constructor(props) {
    super(props)

    if (React.createRef) {
      this.chartRef = React.createRef()
    } else {
      this.setRef = el => (this.chartRef = el)
    }
    this.chart = null
  }

  render() {
    const { ...props } = this.props
    return React.createElement("div", {
      ref: React.createRef ? this.chartRef : this.setRef,
      ...props
    })
  }

  componentDidMount() {
    const current = React.createRef ? this.chartRef.current : this.chartRef
    this.chart = new ApexCharts(current, this.getConfig())
    this.chart.render()
  }

  getConfig() {
    const { type, height, width, series, options } = this.props
    const newOptions = {
      chart: {
        type,
        height,
        width
      },
      series
    }

    return this.extend(options, newOptions)
  }

  isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item) && item != null
  }

  extend(target, source) {
    if (typeof Object.assign !== "function") {
      ;(function() {
        Object.assign = function(target) {
          // We must check against these specific cases.
          if (target === undefined || target === null) {
            throw new TypeError("Cannot convert undefined or null to object")
          }

          let output = Object(target)
          for (let index = 1; index < arguments.length; index++) {
            let source = arguments[index]
            if (source !== undefined && source !== null) {
              for (let nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                  output[nextKey] = source[nextKey]
                }
              }
            }
          }
          return output
        }
      })()
    }

    let output = Object.assign({}, target)
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, {
              [key]: source[key]
            })
          } else {
            output[key] = this.extend(target[key], source[key])
          }
        } else {
          Object.assign(output, {
            [key]: source[key]
          })
        }
      })
    }
    return output
  }

  componentDidUpdate(prevProps) {
    console.log(this.chart);
    if (prevProps !== this.props) {
      this.chart.updateOptions(this.getConfig())
      this.chart.updateSeries(this.props.series)
    }
  }

  componentWillUnmount() {
    if (this.chart && typeof this.chart.destroy === "function") this.chart.destroy()
  }
}

Charts.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.any,
  height: PropTypes.any,
  series: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired
}

Charts.defaultProps = {
  type: "line",
  width: "100%",
  height: "auto"
}

export default Charts
