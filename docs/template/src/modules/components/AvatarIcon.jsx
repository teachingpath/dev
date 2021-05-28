import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  variant: PropTypes.string,
  tag: tagPropType
}

const defaultProps = {
  variant: "primary",
  tag: "div"
}

const AvatarIcon = props => {
  const { className, cssModule, variant, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("avatar-icon", `avatar-icon-${variant}`, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

AvatarIcon.propTypes = propTypes
AvatarIcon.defaultProps = defaultProps

export default AvatarIcon
