import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  direction: PropTypes.oneOf(["left", "right"]),
  tag: tagPropType
}

const defaultProps = {
  direction: "left",
  tag: "div"
}

class DropdownSubmenuMenu extends React.Component {
  render() {
    const { className, cssModule, direction, tag: Tag, ...attrs } = this.props

    const classes = mapToCssModules(
      classNames(
        "dropdown-submenu-menu",
        { [`dropdown-submenu-${direction}`]: direction },
        className
      ),
      cssModule
    )

    return <Tag {...attrs} className={classes} />
  }
}

DropdownSubmenuMenu.propTypes = propTypes
DropdownSubmenuMenu.defaultProps = defaultProps

export default DropdownSubmenuMenu
