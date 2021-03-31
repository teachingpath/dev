import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const rowColWidths = ["xs", "sm", "md", "lg", "xl"]
const rowColsPropType = PropTypes.oneOfType([PropTypes.number, PropTypes.string])

const propTypes = {
  portletFill: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  noGutters: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  form: PropTypes.bool,
  xs: rowColsPropType,
  sm: rowColsPropType,
  md: rowColsPropType,
  lg: rowColsPropType,
  xl: rowColsPropType,
  tag: tagPropType
}

const defaultProps = {
  tag: "div",
  widths: rowColWidths
}

const Row = props => {
  const {
    portletFill,
    className,
    cssModule,
    noGutters,
    tag: Tag,
    form,
    widths,
    ...attributes
  } = props

  const colClasses = []

  widths.forEach((colWidth, i) => {
    let colSize = props[colWidth]

    delete attributes[colWidth]

    if (!colSize) {
      return
    }

    const isXs = !i
    colClasses.push(isXs ? `row-cols-${colSize}` : `row-cols-${colWidth}-${colSize}`)
  })

  let portletFillClass = null

  if (typeof portletFill === "string") {
    portletFillClass = `portlet-row-fill-${portletFill}`
  } else if (typeof portletFill === "boolean") {
    portletFillClass = "portlet-row-fill"
  }

  const classes = mapToCssModules(
    classNames(
      colClasses,
      portletFillClass,
      { "no-gutters": noGutters },
      form ? "form-row" : "row",
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Row.propTypes = propTypes
Row.defaultProps = defaultProps

export default Row
