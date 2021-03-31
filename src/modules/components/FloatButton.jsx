import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  align: PropTypes.oneOf(["right", "left"]),
  tag: tagPropType
}

const defaultProps = {
  align: "right",
  tag: "div"
}

const FloatButton = props => {
  const { className, cssModule, align, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("float-btn", { [`float-btn-${align}`]: align }, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

FloatButton.propTypes = propTypes
FloatButton.defaultProps = defaultProps

export default FloatButton
