import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  bordered: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const ModalFooter = props => {
  const { className, cssModule, bordered, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(className, "modal-footer", { "modal-footer-bordered": bordered }),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

ModalFooter.propTypes = propTypes
ModalFooter.defaultProps = defaultProps

export default ModalFooter
