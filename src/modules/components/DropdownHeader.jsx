import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  size: PropTypes.string,
  tag: tagPropType
}

const defaultProps = {
  tag: "h6"
}

const DropdownHeader = props => {
  const { className, cssModule, size, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("dropdown-header", { [`dropdown-header-${size}`]: size }, className),
    cssModule
  )

  return <Tag className={classes} {...attributes} />
}

DropdownHeader.propTypes = propTypes
DropdownHeader.defaultProps = defaultProps

export default DropdownHeader
