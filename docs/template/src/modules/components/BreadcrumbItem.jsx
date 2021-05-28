import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  innerRef: refPropType,
  iconTag: tagPropType,
  textTag: tagPropType,
  active: PropTypes.bool,
  icon: PropTypes.node,
  tag: tagPropType
}

const defaultProps = {
  iconTag: "div",
  textTag: "div",
  tag: "li"
}

const BreadcrumbItem = props => {
  let {
    className,
    cssModule,
    children,
    innerRef,
    iconTag: IconTag,
    textTag: TextTag,
    active,
    icon,
    tag: Tag,
    ...attributes
  } = props

  const classes = mapToCssModules(classNames("breadcrumb-item", { active }, className), cssModule)
  const iconClasses = mapToCssModules(classNames("breadcrumb-icon"), cssModule)
  const textClasses = mapToCssModules(classNames("breadcrumb-text"), cssModule)

  if (attributes.href) {
    Tag = "a"
  }

  return (
    <Tag {...attributes} ref={innerRef} className={classes} aria-current={active ? "page" : undefined}>
      {icon ? <IconTag className={iconClasses}>{icon}</IconTag> : false}
      <TextTag className={textClasses}>{children}</TextTag>
    </Tag>
  )
}

BreadcrumbItem.propTypes = propTypes
BreadcrumbItem.defaultProps = defaultProps

export default BreadcrumbItem
