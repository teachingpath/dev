import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  "aria-label": PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  tag: tagPropType
}

const defaultProps = {
  tag: "a"
}

const PaginationLink = props => {
  let { "aria-label": label, className, cssModule, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(classNames("page-link", className), cssModule)

  if (!attributes.href && Tag === "a") {
    Tag = "button"
  }

  return <Tag {...attributes} className={classes} aria-label={label} />
}

PaginationLink.propTypes = propTypes
PaginationLink.defaultProps = defaultProps

export default PaginationLink
