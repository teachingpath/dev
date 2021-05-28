import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  size: PropTypes.string,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Widget9Display = props => {
  const { className, cssModule, size, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("widget9-display", { [`widget9-display-${size}`]: size }, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Widget9Display.propTypes = propTypes
Widget9Display.defaultProps = defaultProps

export default Widget9Display
