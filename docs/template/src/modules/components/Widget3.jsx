import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import Widget3Display from "./Widget3Display"
import Widget3Subtitle from "./Widget3Subtitle"
import Widget3Title from "./Widget3Title"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  size: PropTypes.string,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Widget3 = props => {
  const { className, cssModule, size, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("widget3", { [`widget3-${size}`]: size }, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Widget3.propTypes = propTypes
Widget3.defaultProps = defaultProps

Widget3.Display = Widget3Display
Widget3.Subtitle = Widget3Subtitle
Widget3.Title = Widget3Title

export default Widget3
