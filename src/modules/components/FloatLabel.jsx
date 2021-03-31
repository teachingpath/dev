import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  size: PropTypes.oneOf(["sm", "lg"]),
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const FloatLabel = props => {
  const { className, cssModule, size, tag: Tag, ...attrs } = props

  const classes = mapToCssModules(
    classNames("float-label", { [`float-label-${size}`]: size }, className),
    cssModule
  )

  return <Tag {...attrs} className={classes} />
}

FloatLabel.propTypes = propTypes
FloatLabel.defaultProps = defaultProps

export default FloatLabel
