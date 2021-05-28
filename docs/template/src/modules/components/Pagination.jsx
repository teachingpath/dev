import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import PaginationItem from "./PaginationItem"
import PaginationLink from "./PaginationLink"

const propTypes = {
  "aria-label": PropTypes.string,
  listClassName: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  listTag: tagPropType,
  size: PropTypes.string,
  tag: tagPropType
}

const defaultProps = {
  "aria-label": "pagination",
  listTag: "ul",
  tag: "nav"
}

const Pagination = props => {
  const {
    "aria-label": label,
    listClassName,
    className,
    cssModule,
    children,
    listTag: ListTag,
    size,
    tag: Tag,
    ...attributes
  } = props

  const classes = mapToCssModules(classNames(className), cssModule)

  const listClasses = mapToCssModules(
    classNames(listClassName, "pagination", {
      [`pagination-${size}`]: size
    }),
    cssModule
  )

  return (
    <Tag className={classes} aria-label={label}>
      <ListTag {...attributes} className={listClasses}>
        {children}
      </ListTag>
    </Tag>
  )
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps

Pagination.Item = PaginationItem
Pagination.Link = PaginationLink

export default Pagination
