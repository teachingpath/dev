import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import NavItem from "./NavItem"
import NavContent from "./NavContent"
import NavAddon from "./NavAddon"
import NavIcon from "./NavIcon"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  horizontal: PropTypes.oneOf(["start", "center", "end"]),
  justified: PropTypes.bool,
  vertical: PropTypes.bool,
  portlet: PropTypes.bool,
  pills: PropTypes.bool,
  lines: PropTypes.bool,
  tabs: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "lg"]),
  fill: PropTypes.bool,
  card: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  vertical: false,
  tag: "div"
}

const Nav = props => {
  const {
    className,
    cssModule,
    horizontal,
    justified,
    vertical,
    portlet,
    pills,
    lines,
    tabs,
    size,
    fill,
    card,
    tag: Tag,
    ...attributes
  } = props

  const classes = mapToCssModules(
    classNames(
      "nav",
      {
        [`nav-${size}`]: size,
        [`justify-content-${horizontal}`]: horizontal,
        "nav-tabs": tabs,
        "nav-pills": pills,
        "nav-justified": justified,
        "nav-lines": lines,
        "nav-vertical": vertical,
        "nav-fill": fill,
        "portlet-nav": portlet,
        "card-nav": card && !pills
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Nav.propTypes = propTypes
Nav.defaultProps = defaultProps

Nav.Item = NavItem
Nav.Content = NavContent
Nav.Addon = NavAddon
Nav.Icon = NavIcon

export default Nav
