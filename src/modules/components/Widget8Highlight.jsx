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

function Widget8Highlight(props) {
  const { className, cssModule, size, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("widget8-highlight", { [`widget8-highlight-${size}`]: size }, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Widget8Highlight.propTypes = propTypes
Widget8Highlight.defaultProps = defaultProps

export default Widget8Highlight
