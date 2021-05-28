import React from "react"
import PropTypes from "prop-types"
import Caret from "./Caret"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  children: PropTypes.node,
  bullet: PropTypes.bool,
  toggle: PropTypes.bool,
  active: PropTypes.bool,
  addon: PropTypes.any,
  caret: PropTypes.bool,
  icon: PropTypes.any,
  tag: tagPropType
}

const defaultProps = {
  tag: "a"
}

const MenuLink = props => {
  let {
    className,
    cssModule,
    innerRef,
    children,
    bullet,
    toggle,
    active,
    addon: Addon,
    caret,
    icon,
    tag: Tag,
    ...attributes
  } = props

  if (toggle) {
    Tag = "div"
  }

  const classes = mapToCssModules(
    classNames(
      "menu-item-link",
      {
        "menu-item-toggle": toggle,
        active
      },
      className
    ),
    cssModule
  )

  return (
    <Tag {...attributes} ref={innerRef} className={classes}>
      {icon ? (
        <div className="menu-item-icon">{icon}</div>
      ) : bullet ? (
        <i className="menu-item-bullet" />
      ) : null}
      <span className="menu-item-text">{children}</span>
      {Addon ? (
        <div className="menu-item-addon">
          <Addon />
        </div>
      ) : caret ? (
        <div className="menu-item-addon">
          <Caret className="menu-item-caret" />
        </div>
      ) : null}
    </Tag>
  )
}

MenuLink.propTypes = propTypes
MenuLink.defaultProps = defaultProps

export default MenuLink
