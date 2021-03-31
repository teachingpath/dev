import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  position: PropTypes.oneOf(["top", "bottom"]),
  tag: tagPropType
}

const defaultProps = {
  position: "top",
  tag: "div"
}

const AvatarAddon = props => {
  const { className, cssModule, tag: Tag, position, ...attributes } = props

  const classes = mapToCssModules(
    classNames("avatar-addon", `avatar-addon-${position}`, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

AvatarAddon.propTypes = propTypes
AvatarAddon.defaultProps = defaultProps

export default AvatarAddon
