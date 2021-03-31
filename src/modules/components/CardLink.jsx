import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  tag: tagPropType
}

const defaultProps = {
  tag: "a"
}

const CardLink = props => {
  const { className, cssModule, innerRef, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(classNames("card-link", className), cssModule)

  return <Tag {...attributes} ref={innerRef} className={classes} />
}

CardLink.propTypes = propTypes
CardLink.defaultProps = defaultProps

export default CardLink
