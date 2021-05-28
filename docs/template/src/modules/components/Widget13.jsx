import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules } from "./utils"
import Widget13Avatar from "./Widget13Avatar"
import Widget13Text from "./Widget13Text"
import Dropdown from "./Dropdown"
import Button from "./Button"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  dropdown: PropTypes.bool
}

const Widget13 = props => {
  const { className, cssModule, dropdown, ...attributes } = props

  const Tag = dropdown ? Dropdown.Toggle : Button

  const classes = mapToCssModules(classNames("widget13", className), cssModule)

  return <Tag {...attributes} className={classes} />
}

Widget13.propTypes = propTypes

Widget13.Avatar = Widget13Avatar
Widget13.Text = Widget13Text

export default Widget13
