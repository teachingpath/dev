import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const propTypes = {
  closeAriaLabel: PropTypes.string,
  cssModule: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  bordered: PropTypes.bool,
  wrapTag: tagPropType,
  toggle: PropTypes.func,
  close: PropTypes.object,
  tag: tagPropType
}

const defaultProps = {
  tag: "h5",
  wrapTag: "div",
  closeAriaLabel: "Close"
}

const ModalHeader = props => {
  let closeButton

  const {
    closeAriaLabel,
    cssModule,
    className,
    children,
    bordered,
    wrapTag: WrapTag,
    toggle,
    close,
    tag: Tag,
    ...attributes
  } = props

  const classes = mapToCssModules(
    classNames("modal-header", { "modal-header-bordered": bordered }, className),
    cssModule
  )
  const closeButtonClasses = mapToCssModules(
    classNames("btn", "btn-icon", "btn-label-danger"),
    cssModule
  )
  const titleClasses = mapToCssModules(classNames("modal-title"), cssModule)

  if (!close && toggle) {
    closeButton = (
      <button
        type="button"
        onClick={toggle}
        className={closeButtonClasses}
        aria-label={closeAriaLabel}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    )
  }

  return (
    <WrapTag {...attributes} className={classes}>
      <Tag className={titleClasses}>{children}</Tag>
      {close || closeButton}
    </WrapTag>
  )
}

ModalHeader.propTypes = propTypes
ModalHeader.defaultProps = defaultProps

export default ModalHeader
