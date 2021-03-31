import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  size: PropTypes.oneOf(["sm", "lg"]),
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const AvatarGroup = props => {
  const { className, cssModule, size, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("avatar-group", { [`avatar-group-${size}`]: size }, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

AvatarGroup.propTypes = propTypes
AvatarGroup.defaultProps = defaultProps

export default AvatarGroup
