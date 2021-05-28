import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules } from "./utils"
import Badge from "./Badge"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object
}

const AvatarBadge = props => {
  const { className, cssModule, ...attributes } = props

  const classes = mapToCssModules(classNames("avatar-badge", className), cssModule)

  return <Badge className={classes} {...attributes} />
}

AvatarBadge.propTypes = propTypes

export default AvatarBadge
