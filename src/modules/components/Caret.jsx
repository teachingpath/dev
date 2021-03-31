import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  direction: PropTypes.oneOf(["left", "right", "up", "down"]),
  tag: tagPropType
}

const defaultProps = {
  tag: "i"
}

const Caret = props => {
  const { className, cssModule, direction, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("caret", { [`caret-${direction}`]: direction }, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Caret.propTypes = propTypes
Caret.defaultProps = defaultProps

export default Caret
