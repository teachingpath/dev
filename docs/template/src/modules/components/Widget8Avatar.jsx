import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules } from "./utils"
import { Avatar } from "@panely/components"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object
}

const Widget8Avatar = props => {
  const { className, cssModule, ...attributes } = props

  const classes = mapToCssModules(classNames("widget8-avatar", className), cssModule)

  return <Avatar {...attributes} className={classes} />
}

Widget8Avatar.propTypes = propTypes

export default Widget8Avatar
