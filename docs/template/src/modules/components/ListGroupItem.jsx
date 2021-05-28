import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  action: PropTypes.bool,
  active: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "li"
}

const handleDisabledOnClick = e => {
  e.preventDefault()
}

const ListGroupItem = props => {
  const { className, cssModule, disabled, variant, action, active, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      "list-group-item",
      {
        [`list-group-item-${variant}`]: variant,
        "list-group-item-action": action,
        active,
        disabled
      },
      className
    ),
    cssModule
  )

  // Prevent click event when disabled.
  if (disabled) {
    attributes.onClick = handleDisabledOnClick
  }

  return <Tag {...attributes} className={classes} />
}

ListGroupItem.propTypes = propTypes
ListGroupItem.defaultProps = defaultProps

export default ListGroupItem
