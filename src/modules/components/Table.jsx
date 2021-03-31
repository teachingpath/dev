import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  responsiveTag: tagPropType,
  responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
  cssModule: PropTypes.object,
  borderless: PropTypes.bool,
  bordered: PropTypes.bool,
  innerRef: refPropType,
  variant: PropTypes.string,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  small: PropTypes.bool,
  dark: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  responsiveTag: "div",
  tag: "table"
}

const Table = props => {
  const {
    responsiveTag: ResponsiveTag,
    responsive,
    className,
    cssModule,
    borderless,
    bordered,
    innerRef,
    variant,
    striped,
    hover,
    small,
    dark,
    tag: Tag,
    ...attributes
  } = props

  const classes = mapToCssModules(
    classNames(
      "table",
      {
        [`table-${variant}`]: variant,
        "table-borderless": borderless,
        "table-bordered": bordered,
        "table-striped": striped,
        "table-hover": hover,
        "table-dark": dark,
        "table-sm": small
      },
      className
    ),
    cssModule
  )

  const table = <Tag {...attributes} ref={innerRef} className={classes} />

  if (responsive) {
    const responsiveClassName = mapToCssModules(
      responsive === true ? "table-responsive" : `table-responsive-${responsive}`,
      cssModule
    )

    return <ResponsiveTag className={responsiveClassName}>{table}</ResponsiveTag>
  }

  return table
}

Table.propTypes = propTypes
Table.defaultProps = defaultProps

export default Table
