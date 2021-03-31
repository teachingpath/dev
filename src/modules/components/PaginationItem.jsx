import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "li"
}

const PaginationItem = props => {
  const { className, cssModule, disabled, active, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      "page-item",
      {
        active,
        disabled
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

PaginationItem.propTypes = propTypes
PaginationItem.defaultProps = defaultProps

export default PaginationItem
