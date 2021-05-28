import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  contentTag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  innerRef: refPropType,
  disabled: PropTypes.bool,
  iconTag: tagPropType,
  active: PropTypes.bool,
  icon: PropTypes.node,
  tag: tagPropType
}

const defaultProps = {
  contentTag: "div",
  iconTag: "div",
  tag: "div"
}

const GridNavItem = props => {
  let {
    contentTag: ContentTag,
    className,
    cssModule,
    children,
    innerRef,
    disabled,
    iconTag: IconTag,
    active,
    icon,
    tag: Tag,
    ...attributes
  } = props

  if (attributes.href) {
    Tag = "a"
  }

  const containerClasses = mapToCssModules(
    classNames("grid-nav-item", { active, disabled }, className),
    cssModule
  )
  const contentClasses = mapToCssModules(classNames("grid-nav-content"), cssModule)
  const iconClasses = mapToCssModules(classNames("grid-nav-icon"), cssModule)

  return (
    <Tag {...attributes} ref={innerRef} className={containerClasses}>
      {icon ? <IconTag className={iconClasses}>{icon}</IconTag> : null}
      <ContentTag className={contentClasses}>{children}</ContentTag>
    </Tag>
  )
}

GridNavItem.propTypes = propTypes
GridNavItem.defaultProps = defaultProps

export default GridNavItem
