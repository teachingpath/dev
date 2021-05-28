import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"
import GridNavRow from "./GridNavRow"
import GridNavItem from "./GridNavItem"
import GridNavTitle from "./GridNavTitle"
import GridNavSubtitle from "./GridNavSubtitle"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  noRounded: PropTypes.bool,
  bordered: PropTypes.bool,
  action: PropTypes.bool,
  flush: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const GridNav = props => {
  const {
    className,
    cssModule,
    innerRef,
    noRounded,
    bordered,
    action,
    flush,
    tag: Tag,
    ...attributes
  } = props

  if (attributes.href) {
    Tag = "a"
  }

  const classes = mapToCssModules(
    classNames(
      "grid-nav",
      {
        "grid-nav-flush": flush,
        "grid-nav-bordered": bordered,
        "grid-nav-action": action,
        "grid-nav-no-rounded": noRounded
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} ref={innerRef} className={classes} />
}

GridNav.propTypes = propTypes
GridNav.defaultProps = defaultProps

GridNav.Row = GridNavRow
GridNav.Item = GridNavItem
GridNav.Title = GridNavTitle
GridNav.Subtitle = GridNavSubtitle

export default GridNav
