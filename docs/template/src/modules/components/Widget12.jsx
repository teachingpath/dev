import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules } from "./utils"
import Avatar from "./Avatar"

const propTypes = {
  className: PropTypes.string,
  small: PropTypes.bool
}

const Widget12 = props => {
  const { className, small, cssModule, ...attributes } = props

  const classes = mapToCssModules(
    classNames(small ? "widget12-sm" : "widget12", className),
    cssModule
  )

  return <Avatar {...attributes} className={classes} />
}

Widget12.propTypes = propTypes

export default Widget12
