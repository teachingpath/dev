import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  bordered: PropTypes.bool,
  align: PropTypes.oneOf(["left", "center", "right"]),
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const PortletFooter = props => {
  const { className, cssModule, bordered, align, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      "portlet-footer",
      {
        "portlet-footer-bordered": bordered,
        [`text-${align}`]: align
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

PortletFooter.propTypes = propTypes
PortletFooter.defaultProps = defaultProps

export default PortletFooter
