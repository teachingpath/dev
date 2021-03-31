import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  vertical: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "lg"]),
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const ButtonGroup = props => {
  const { className, cssModule, vertical, size, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      vertical ? "btn-group-vertical" : "btn-group",
      { [`btn-group-${size}`]: size },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

ButtonGroup.propTypes = propTypes
ButtonGroup.defaultProps = defaultProps

export default ButtonGroup
