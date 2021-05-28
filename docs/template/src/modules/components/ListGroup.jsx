import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import ListGroupItem from "./ListGroupItem"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  horizontal: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  bordered: PropTypes.bool,
  action: PropTypes.bool,
  flush: PropTypes.bool,
  deck: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  horizontal: false,
  tag: "ul"
}

const getHorizontalClass = horizontal => {
  if (horizontal === false) {
    return false
  } else if (horizontal === true || horizontal === "xs") {
    return "list-group-horizontal"
  }
  return `list-group-horizontal-${horizontal}`
}

const ListGroup = props => {
  const {
    className,
    cssModule,
    horizontal,
    bordered,
    action,
    flush,
    deck,
    tag: Tag,
    ...attributes
  } = props

  const classes = mapToCssModules(
    classNames(
      "list-group",
      flush ? "list-group-flush" : getHorizontalClass(horizontal),
      bordered && !flush ? "list-group-bordered" : getHorizontalClass(horizontal),
      {
        "list-group-deck": deck && !flush,
        "list-group-action": action
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

ListGroup.propTypes = propTypes
ListGroup.defaultProps = defaultProps

ListGroup.Item = ListGroupItem

export default ListGroup
