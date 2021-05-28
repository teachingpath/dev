import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  href: PropTypes.string,
  tag: tagPropType
}

const defaultProps = {
  href: "#",
  tag: "a"
}

const AlertLink = props => {
  const { className, cssModule, innerRef, href, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(classNames("alert-link", className), cssModule)

  return <Tag {...attributes} href={href} ref={innerRef} className={classes} />
}

AlertLink.propTypes = propTypes
AlertLink.defaultProps = defaultProps

export default AlertLink
