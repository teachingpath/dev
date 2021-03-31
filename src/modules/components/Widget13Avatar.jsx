import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules } from "./utils"
import Avatar from "./Avatar"

const propTypes = {
  className: PropTypes.string
}

const Widget13Avatar = props => {
  const { className, cssModule, tag, ...attributes } = props

  const classes = mapToCssModules(classNames("widget13-avatar", className), cssModule)

  return <Avatar {...attributes} tag="span" className={classes} />
}

Widget13Avatar.propTypes = propTypes

export default Widget13Avatar
