import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  variant: PropTypes.string,
  inline: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  variant: "muted",
  tag: "small"
}

const FormText = props => {
  const { className, cssModule, variant, inline, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      {
        "form-text": !inline,
        [`text-${variant}`]: variant
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

FormText.propTypes = propTypes
FormText.defaultProps = defaultProps

export default FormText
