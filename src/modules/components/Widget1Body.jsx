import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  offset: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Widget1Display = props => {
  const { className, cssModule, offset, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("widget1-body", { "widget1-body-offset": offset }, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Widget1Display.propTypes = propTypes
Widget1Display.defaultProps = defaultProps

export default Widget1Display
