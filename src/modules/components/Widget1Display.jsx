import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  bottom: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "lg"]),
  top: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

function Widget1Display(props) {
  const { className, cssModule, bottom, size, top, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      "widget1-display",
      {
        "widget1-display-top": top,
        "widget1-display-bottom": bottom,
        [`widget1-display-${size}`]: size
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Widget1Display.propTypes = propTypes
Widget1Display.defaultProps = defaultProps

export default Widget1Display
