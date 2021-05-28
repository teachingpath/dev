import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  fluid: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const HeaderContainer = props => {
  const { className, cssModule, fluid, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("header-container", fluid ? "container-fluid" : "container", className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

HeaderContainer.propTypes = propTypes
HeaderContainer.defaultProps = defaultProps

export default HeaderContainer
