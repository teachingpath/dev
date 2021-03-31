import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  tag: tagPropType
}

const defaultProps = {
  children: "Loading...",
  type: "border",
  tag: "span"
}

const Spinner = props => {
  const { className, cssModule, children, variant, type, size, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      `spinner-${type}`,
      {
        [`spinner-${type}-${size}`]: size,
        [`text-${variant}`]: variant
      },
      className
    ),
    cssModule
  )
  const contentClasses = mapToCssModules("sr-only", cssModule)

  return (
    <Tag role="status" {...attributes} className={classes}>
      {children && <span className={contentClasses}>{children}</span>}
    </Tag>
  )
}

Spinner.propTypes = propTypes
Spinner.defaultProps = defaultProps

export default Spinner
