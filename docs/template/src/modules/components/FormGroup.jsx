import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  check: PropTypes.bool,
  row: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const FormGroup = props => {
  const { className, cssModule, disabled, inline, check, row, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      className,
      row ? "row" : false,
      check ? "form-check" : "form-group",
      check && inline ? "form-check-inline" : false,
      check && disabled ? "disabled" : false
    ),
    cssModule
  )

  if (Tag === "fieldset") {
    attributes.disabled = disabled
  }

  return <Tag {...attributes} className={classes} />
}

FormGroup.propTypes = propTypes
FormGroup.defaultProps = defaultProps

export default FormGroup
