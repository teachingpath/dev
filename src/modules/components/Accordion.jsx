import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import AccordionCaret from "./AccordionCaret"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  flush: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Accordion = props => {
  const { className, cssModule, flush, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("accordion", { "accordion-flush": flush }, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Accordion.propTypes = propTypes
Accordion.defaultProps = defaultProps

Accordion.Caret = AccordionCaret

export default Accordion
