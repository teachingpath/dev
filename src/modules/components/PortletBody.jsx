import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const PortletBody = props => {
  const { className, cssModule, innerRef, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(classNames("portlet-body", className), cssModule)

  return <Tag {...attributes} ref={innerRef} className={classes} />
}

PortletBody.propTypes = propTypes
PortletBody.defaultProps = defaultProps

export default PortletBody
