import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  type: PropTypes.oneOf(["holder", "wrapper", "content"]),
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Layout = props => {
  const { className, cssModule, type, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(classNames(type, className), cssModule)

  return <Tag {...attributes} className={classes} />
}

Layout.propTypes = propTypes
Layout.defaultProps = defaultProps

export default Layout
