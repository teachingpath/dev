import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Reference } from "react-popper"
import { DropdownContext } from "./DropdownContext"
import { mapToCssModules, tagPropType, refPropType } from "./utils"
import Button from "./Button"

const propTypes = {
  "aria-haspopup": PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  active: PropTypes.bool,
  caret: PropTypes.bool,
  split: PropTypes.bool,
  tag: tagPropType,
  nav: PropTypes.bool
}

const defaultProps = {
  "aria-haspopup": true,
  variant: "primary"
}

class DropdownToggle extends React.Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    if (this.props.disabled || this.context.disabled) {
      e.preventDefault()
      return
    }

    if (this.props.nav && !this.props.tag) {
      e.preventDefault()
    }

    if (this.props.onClick) {
      this.props.onClick(e)
    }

    this.context.toggle(e)
  }

  render() {
    const {
      className,
      cssModule,
      innerRef,
      disabled,
      children,
      onClick,
      variant,
      active,
      caret,
      split,
      tag,
      nav,
      ...attributes
    } = this.props

    const ariaLabel = attributes["aria-label"] || "Toggle Dropdown"
    const classes = mapToCssModules(
      classNames(
        {
          "dropdown-toggle": caret || split,
          "dropdown-toggle-split": split,
          "nav-link": nav,
          active: active
        },
        className
      ),
      cssModule
    )

    let Tag

    if (nav && !tag) {
      Tag = "a"
      attributes.href = "#"
    } else if (!tag) {
      Tag = Button
      attributes.variant = variant
      attributes.cssModule = cssModule
    } else {
      Tag = tag
    }

    return (
      <Reference innerRef={innerRef}>
        {({ ref }) => (
          <Tag
            {...attributes}
            {...{ [typeof Tag === "string" ? "ref" : "innerRef"]: ref }}
            className={classes}
            onClick={this.onClick}
          >
            {typeof children !== "undefined" ? (
              children
            ) : (
              <span className="sr-only">{ariaLabel}</span>
            )}
          </Tag>
        )}
      </Reference>
    )
  }
}

DropdownToggle.propTypes = propTypes
DropdownToggle.defaultProps = defaultProps
DropdownToggle.contextType = DropdownContext

export default DropdownToggle
