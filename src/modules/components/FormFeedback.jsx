import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  tooltip: PropTypes.bool,
  valid: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div",
  valid: undefined
}

const FormFeedback = props => {
  const { className, cssModule, tooltip, valid, tag: Tag, ...attributes } = props

  const validMode = tooltip ? "tooltip" : "feedback"

  const classes = mapToCssModules(
    classNames(valid ? `valid-${validMode}` : `invalid-${validMode}`, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

FormFeedback.propTypes = propTypes
FormFeedback.defaultProps = defaultProps

export default FormFeedback
