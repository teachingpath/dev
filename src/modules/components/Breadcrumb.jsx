import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import BreadcrumbItem from "./BreadcrumbItem"

const propTypes = {
  "aria-label": PropTypes.string,
  listClassName: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  listTag: tagPropType,
  tag: tagPropType
}

const defaultProps = {
  "aria-label": "breadcrumb",
  listTag: "ol",
  tag: "nav"
}

const Breadcrumb = props => {
  const {
    "aria-label": label,
    listClassName,
    className,
    cssModule,
    children,
    listTag: ListTag,
    tag: Tag,
    ...attributes
  } = props

  const containerClasses = mapToCssModules(classNames(className), cssModule)
  const listClasses = mapToCssModules(classNames("breadcrumb", listClassName), cssModule)

  return (
    <Tag {...attributes} className={containerClasses} aria-label={label}>
      <ListTag className={listClasses}>{children}</ListTag>
    </Tag>
  )
}

Breadcrumb.propTypes = propTypes
Breadcrumb.defaultProps = defaultProps

Breadcrumb.Item = BreadcrumbItem

export default Breadcrumb
