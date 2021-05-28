import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, warnOnce, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  innerRef: refPropType,
  plainText: PropTypes.bool,
  invalid: PropTypes.bool,
  valid: PropTypes.bool,
  addon: PropTypes.bool,
  size: PropTypes.oneOf(["lg", "sm"]),
  type: PropTypes.string,
  tag: tagPropType
}

const defaultProps = {
  type: "text"
}

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.getRef = this.getRef.bind(this)
    this.focus = this.focus.bind(this)
  }

  getRef(ref) {
    if (this.props.innerRef) {
      this.props.innerRef(ref)
    }
    this.ref = ref
  }

  focus() {
    if (this.ref) {
      this.ref.focus()
    }
  }

  render() {
    let {
      className,
      cssModule,
      plainText,
      innerRef,
      invalid,
      valid,
      addon,
      size,
      type,
      tag,
      ...attributes
    } = this.props

    const checkInput = ["radio", "checkbox"].indexOf(type) > -1
    const isNotaNumber = new RegExp("\\D", "g")

    const fileInput = type === "file"
    const textareaInput = type === "textarea"
    const selectInput = type === "select"
    const rangeInput = type === "range"
    let Tag = tag || (selectInput || textareaInput ? type : "input")

    let formControlClass = "form-control"

    if (plainText) {
      formControlClass = `${formControlClass}-plaintext`
      Tag = tag || "input"
    } else if (fileInput) {
      formControlClass = `${formControlClass}-file`
    } else if (rangeInput) {
      formControlClass = `${formControlClass}-range`
    } else if (checkInput) {
      if (addon) {
        formControlClass = null
      } else {
        formControlClass = "form-check-input"
      }
    }

    const classes = mapToCssModules(
      classNames(
        formControlClass,
        size ? `form-control-${size}` : false,
        invalid && "is-invalid",
        valid && "is-valid",
        className
      ),
      cssModule
    )

    if (Tag === "input" || (tag && typeof tag === "function")) {
      attributes.type = type
    }

    if (
      attributes.children &&
      !(plainText || type === "select" || typeof Tag !== "string" || Tag === "select")
    ) {
      warnOnce(
        `Input with a type of "${type}" cannot have children. Please use "value"/"defaultValue" instead.`
      )
      delete attributes.children
    }

    return <Tag {...attributes} ref={innerRef} className={classes} aria-invalid={invalid} />
  }
}

Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input
