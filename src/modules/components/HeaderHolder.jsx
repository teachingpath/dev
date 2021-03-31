import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  desktop: PropTypes.bool,
  mobile: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const HeaderHolder = props => {
  const { className, cssModule, desktop, mobile, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      "header-holder",
      {
        "header-holder-mobile": mobile,
        "header-holder-desktop": desktop
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

HeaderHolder.propTypes = propTypes
HeaderHolder.defaultProps = defaultProps

export default HeaderHolder
