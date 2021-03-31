import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"
import PortletHeader from "./PortletHeader"
import PortletFooter from "./PortletFooter"
import PortletTitle from "./PortletTitle"
import PortletIcon from "./PortletIcon"
import PortletAddon from "./PortletAddon"
import PortletBody from "./PortletBody"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  bordered: PropTypes.bool,
  variant: PropTypes.string,
  scroll: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Portlet = props => {
  const {
    className,
    cssModule,
    innerRef,
    bordered,
    variant,
    scroll,
    tag: Tag,
    ...attributes
  } = props

  const classes = mapToCssModules(
    classNames(
      "portlet",
      {
        [`portlet-${variant}`]: variant,
        "portlet-bordered": bordered,
        "portlet-scroll": scroll
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} ref={innerRef} className={classes} />
}

Portlet.propTypes = propTypes
Portlet.defaultProps = defaultProps

Portlet.Body = PortletBody
Portlet.Header = PortletHeader
Portlet.Footer = PortletFooter
Portlet.Icon = PortletIcon
Portlet.Addon = PortletAddon
Portlet.Title = PortletTitle

export default Portlet
