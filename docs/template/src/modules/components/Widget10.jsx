import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import Widget10Addon from "./Widget10Addon"
import Widget10Content from "./Widget10Content"
import Widget10Item from "./Widget10Item"
import Widget10Subtitle from "./Widget10Subtitle"
import Widget10Title from "./Widget10Title"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  vertical: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Widget10 = props => {
  const { className, cssModule, vertical, tag: Tag, ...attributes } = props

  let verticalClass

  if (typeof vertical === "string") {
    verticalClass = `widget10-vertical-${vertical}`
  } else if (typeof vertical === "boolean") {
    verticalClass = "widget10-vertical"
  } else {
    verticalClass = null
  }

  const classes = mapToCssModules(classNames("widget10", verticalClass, className), cssModule)

  return <Tag {...attributes} className={classes} />
}

Widget10.propTypes = propTypes
Widget10.defaultProps = defaultProps

Widget10.Addon = Widget10Addon
Widget10.Content = Widget10Content
Widget10.Item = Widget10Item
Widget10.Subtitle = Widget10Subtitle
Widget10.Title = Widget10Title

export default Widget10
