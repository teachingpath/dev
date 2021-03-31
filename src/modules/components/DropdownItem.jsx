import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { DropdownContext } from "./DropdownContext"
import { mapToCssModules, omit, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  bullet: PropTypes.bool,
  toggle: PropTypes.bool,
  addon: PropTypes.node,
  icon: PropTypes.node,
  tag: tagPropType
}

const defaultProps = {
  toggle: true,
  tag: "button"
}

class DropdownItem extends React.Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.getTabIndex = this.getTabIndex.bind(this)
  }

  onClick(e) {
    if (this.props.disabled || this.props.header || this.props.divider) {
      e.preventDefault()
      return
    }

    if (this.props.onClick) {
      this.props.onClick(e)
    }

    if (this.props.toggle) {
      this.context.toggle(e)
    }
  }

  getTabIndex() {
    if (this.props.disabled || this.props.header || this.props.divider) {
      return "-1"
    }

    return "0"
  }

  render() {
    const tabIndex = this.getTabIndex()
    const role = tabIndex > -1 ? "menuitem" : undefined
    let {
      className,
      cssModule,
      children,
      disabled,
      active,
      bullet,
      addon,
      icon,
      tag: Tag,
      ...props
    } = omit(this.props, ["toggle"])

    const classes = mapToCssModules(
      classNames(className, "dropdown-item", {
        disabled,
        active
      }),
      cssModule
    )
    const iconClasses = mapToCssModules(classNames("dropdown-icon"), cssModule)
    const bulletClasses = mapToCssModules(classNames("dropdown-bullet"), cssModule)
    const contentClasses = mapToCssModules(classNames("dropdown-content"), cssModule)
    const addonClasses = mapToCssModules(classNames("dropdown-addon"), cssModule)

    if (Tag === "button") {
      if (props.href) {
        Tag = "a"
      }
    }

    return (
      <Tag
        type={Tag === "button" && (props.onClick || this.props.toggle) ? "button" : undefined}
        {...props}
        tabIndex={tabIndex}
        role={role}
        className={classes}
        onClick={this.onClick}
      >
        {icon ? <span className={iconClasses}>{icon}</span> : null}
        {bullet && !icon ? <i className={bulletClasses}></i> : null}
        <span className={contentClasses}>{children}</span>
        {addon ? <span className={addonClasses}>{addon}</span> : null}
      </Tag>
    )
  }
}

DropdownItem.propTypes = propTypes
DropdownItem.defaultProps = defaultProps
DropdownItem.contextType = DropdownContext

export default DropdownItem
