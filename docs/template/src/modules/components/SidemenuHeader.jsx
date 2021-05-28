import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  bordered: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const SidemenuHeader = props => {
  const { className, cssModule, bordered, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("sidemenu-header", { "sidemenu-header-bordered": bordered }, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

SidemenuHeader.propTypes = propTypes
SidemenuHeader.defaultProps = defaultProps

export default SidemenuHeader
