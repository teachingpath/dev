import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.any,
  tag: tagPropType
}

const defaultProps = {
  href: "#",
  tag: "a"
}

class NavLink extends React.Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    if (this.props.href === "#") {
      e.preventDefault()
    }

    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }

  render() {
    let {
      className,
      cssModule,
      innerRef,
      disabled,
      active,
      onClick,
      href,
      tag: Tag,
      ...attributes
    } = this.props

    const classes = mapToCssModules(
      classNames(
        "nav-item",
        "nav-link",
        {
          disabled: disabled,
          active: active
        },
        className
      ),
      cssModule
    )

    return (
      <Tag {...attributes} href={href} ref={innerRef} onClick={this.onClick} className={classes} />
    )
  }
}

NavLink.propTypes = propTypes
NavLink.defaultProps = defaultProps

export default NavLink
