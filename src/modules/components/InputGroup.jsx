import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import InputGroupText from "./InputGroupText"
import InputGroupAddon from "./InputGroupAddon"
import InputGroupButtonDropdown from "./InputGroupButtonDropdown"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  size: PropTypes.string,
  icon: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const InputGroup = props => {
  const { className, cssModule, size, icon, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      icon ? "input-group-icon" : "input-group",
      { [`input-group-${size}`]: size },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

InputGroup.propTypes = propTypes
InputGroup.defaultProps = defaultProps

InputGroup.Text = InputGroupText
InputGroup.Addon = InputGroupAddon
InputGroup.ButtonDropdown = InputGroupButtonDropdown

export default InputGroup
