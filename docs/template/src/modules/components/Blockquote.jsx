import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import BlockquoteFooter from "./BlockquoteFooter"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  align: PropTypes.oneOf(["left", "center", "right"]),
  tag: tagPropType
}

const defaultProps = {
  tag: "blockquote"
}

const Blockquote = props => {
  const { className, cssModule, tag: Tag, align, ...attributes } = props

  const classes = mapToCssModules(
    classNames("blockquote", { [`text-${align}`]: align }, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Blockquote.propTypes = propTypes
Blockquote.defaultProps = defaultProps

Blockquote.Footer = BlockquoteFooter

export default Blockquote
