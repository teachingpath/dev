import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  icon: PropTypes.node,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Widget14 = props => {
  const { className, cssModule, children, icon, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(classNames("widget14", className), cssModule)
  const iconClasses = mapToCssModules(classNames("widget14-icon", className), cssModule)
  const textClasses = mapToCssModules(classNames("widget14-content", className), cssModule)

  return (
    <Tag {...attributes} className={classes}>
      <div className={iconClasses}>{icon}</div>
      <div className={textClasses}>{children}</div>
    </Tag>
  )
}

Widget14.propTypes = propTypes
Widget14.defaultProps = defaultProps

export default Widget14
