import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  blockquote: PropTypes.bool,
  innerRef: refPropType,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const CardBody = props => {
  let { className, cssModule, blockquote, innerRef, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("card-body", { blockquote: blockquote }, className),
    cssModule
  )

  if (blockquote) {
    Tag = "blockquote"
  }

  return <Tag {...attributes} className={classes} ref={innerRef} />
}

CardBody.propTypes = propTypes
CardBody.defaultProps = defaultProps

export default CardBody
