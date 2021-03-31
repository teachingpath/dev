import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Popper } from "react-popper"
import { DropdownContext } from "./DropdownContext"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  positionFixed: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  modifiers: PropTypes.object,
  children: PropTypes.node.isRequired,
  animated: PropTypes.bool,
  persist: PropTypes.bool,
  right: PropTypes.bool,
  flip: PropTypes.bool,
  wide: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  flip: true,
  tag: "div"
}

const noFlipModifier = { flip: { enabled: false } }

const directionPositionMap = {
  up: "top",
  left: "left",
  right: "right",
  down: "bottom"
}

class DropdownMenu extends React.Component {
  render() {
    const {
      positionFixed,
      className,
      cssModule,
      modifiers,
      animated,
      persist,
      right,
      flip,
      wide,
      tag,
      ...attrs
    } = this.props
    const classes = mapToCssModules(
      classNames(
        "dropdown-menu",
        {
          "dropdown-menu-animated": animated,
          "dropdown-menu-right": right,
          "dropdown-menu-wide": wide,
          show: this.context.isOpen
        },
        className
      ),
      cssModule
    )

    const Tag = tag

    if (persist || this.context.isOpen) {
      const position1 = directionPositionMap[this.context.direction] || "bottom"
      const position2 = right ? "end" : "start"
      const poperPlacement = `${position1}-${position2}`
      const poperModifiers = !flip
        ? {
            ...modifiers,
            ...noFlipModifier
          }
        : modifiers
      const popperPositionFixed = !!positionFixed

      return (
        <Popper
          placement={poperPlacement}
          modifiers={poperModifiers}
          positionFixed={popperPositionFixed}
        >
          {({ ref, style, placement }) => (
            <Tag
              tabIndex="-1"
              role="menu"
              ref={ref}
              style={style}
              {...attrs}
              aria-hidden={!this.context.isOpen}
              className={classes}
              x-placement={placement}
            />
          )}
        </Popper>
      )
    }

    return (
      <Tag
        tabIndex="-1"
        role="menu"
        {...attrs}
        aria-hidden={!this.context.isOpen}
        className={classes}
        x-placement={attrs.placement}
      />
    )
  }
}

DropdownMenu.propTypes = propTypes
DropdownMenu.defaultProps = defaultProps
DropdownMenu.contextType = DropdownContext

export default DropdownMenu
