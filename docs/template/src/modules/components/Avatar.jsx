import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"
import AvatarDisplay from "./AvatarDisplay"
import AvatarAddon from "./AvatarAddon"
import AvatarIcon from "./AvatarIcon"
import AvatarBadge from "./AvatarBadge"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  innerRef: refPropType,
  display: PropTypes.bool,
  variant: PropTypes.string,
  circle: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "lg"]),
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Avatar = props => {
  const {
    className,
    cssModule,
    children,
    innerRef,
    display,
    variant,
    circle,
    size,
    tag: Tag,
    ...attributes
  } = props

  const classes = mapToCssModules(
    classNames(
      "avatar",
      `avatar-${variant}`,
      {
        "avatar-circle": circle,
        [`avatar-${size}`]: size
      },
      className
    ),
    cssModule
  )

  if (display) {
    return (
      <Tag {...attributes} ref={innerRef} className={classes}>
        <AvatarDisplay tag={Tag}>{children}</AvatarDisplay>
      </Tag>
    )
  } else {
    return (
      <Tag {...attributes} ref={innerRef} className={classes}>
        {children}
      </Tag>
    )
  }
}

Avatar.propTypes = propTypes
Avatar.defaultProps = defaultProps

Avatar.Display = AvatarDisplay
Avatar.Addon = AvatarAddon
Avatar.Icon = AvatarIcon
Avatar.Badge = AvatarBadge

export default Avatar
