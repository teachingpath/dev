import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  bordered: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const PortletHeader = props => {
  const { className, cssModule, innerRef, bordered, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("portlet-header", { "portlet-header-bordered": bordered }, className),
    cssModule
  )

  return <Tag {...attributes} ref={innerRef} className={classes} />
}

PortletHeader.propTypes = propTypes
PortletHeader.defaultProps = defaultProps

export default PortletHeader
