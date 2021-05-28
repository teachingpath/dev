import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  active: PropTypes.bool,
  style: PropTypes.object,
  tag: tagPropType
}

const defaultProps = {
  height: "auto",
  active: true,
  tag: "div"
}

class MenuSubmenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      className,
      cssModule,
      innerRef,
      height,
      active,
      style,
      tag: Tag,
      ...attributes
    } = this.props

    const classes = mapToCssModules(classNames("menu-submenu", className), cssModule)

    return (
      <Tag
        {...attributes}
        ref={innerRef}
        className={classes}
        style={{
          height: active ? (typeof height === "string" ? "auto" : height + "px") : "0px",
          ...style
        }}
      />
    )
  }
}

MenuSubmenu.propTypes = propTypes
MenuSubmenu.defaultProps = defaultProps

export default MenuSubmenu
