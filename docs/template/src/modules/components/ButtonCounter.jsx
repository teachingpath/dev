import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules } from "./utils"
import Badge from "./Badge"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object
}

const ButtonCounter = props => {
  const { className, cssModule, ...attributes } = props

  const classes = mapToCssModules(classNames("btn-counter", className), cssModule)

  return <Badge {...attributes} className={classes} />
}

ButtonCounter.propTypes = propTypes

export default ButtonCounter
