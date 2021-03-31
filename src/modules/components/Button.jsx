import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"
import ButtonMarker from "./ButtonMarker"
import ButtonCounter from "./ButtonCounter"

const propTypes = {
  "aria-label": PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  height: PropTypes.oneOf(["tall", "taller", "tallest"]),
  active: PropTypes.bool,
  circle: PropTypes.bool,
  width: PropTypes.oneOf(["wide", "wider", "widest"]),
  block: PropTypes.bool,
  icon: PropTypes.bool,
  pill: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "lg"]),
  tag: tagPropType
}

const defaultProps = {
  variant: "primary",
  tag: "button"
}

class Button extends React.Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }

  render() {
    let {
      "aria-label": label,
      className,
      cssModule,
      innerRef,
      onClick,
      disabled,
      variant,
      height,
      active,
      circle,
      width,
      block,
      icon,
      pill,
      size,
      tag: Tag,
      ...attributes
    } = this.props

    const classes = mapToCssModules(
      classNames(
        "btn",
        `btn-${variant}`,
        {
          "btn-icon": icon,
          "btn-pill": pill,
          "btn-block": block,
          "btn-circle": circle,
          [`btn-${size}`]: size,
          [`btn-${width}`]: width,
          [`btn-${height}`]: height,
          active,
          disabled
        },
        className
      ),
      cssModule
    )

    if (attributes.href && Tag === "button") {
      Tag = "a"
    }

    return (
      <Tag
        type={Tag === "button" && attributes.onClick ? "button" : undefined}
        {...attributes}
        className={classes}
        ref={innerRef}
        onClick={this.onClick}
        aria-label={label}
      />
    )
  }
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

Button.Marker = ButtonMarker
Button.Counter = ButtonCounter

export default Button
