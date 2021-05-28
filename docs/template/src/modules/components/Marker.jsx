import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  variant: PropTypes.string,
  type: PropTypes.oneOf(["dot", "circle", "pill"]),
  size: PropTypes.oneOf(["sm", "lg"]),
  tag: tagPropType
}

const defaultProps = {
  variant: "secondary",
  type: "dot",
  tag: "i"
}

const Marker = props => {
  let { className, cssModule, variant, type, size, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      "marker",
      `marker-${type}`,
      `text-${variant}`,
      { [`marker-${size}`]: size },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Marker.propTypes = propTypes
Marker.defaultProps = defaultProps

export default Marker
