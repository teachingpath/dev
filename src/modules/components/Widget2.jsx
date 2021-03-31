import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules } from "./utils"
import Nav from "./Nav"

const propTypes = {
  className: PropTypes.string
}

const Widget2 = props => {
  const { className, cssModule, ...attributes } = props

  const classes = mapToCssModules(classNames("widget2", className), cssModule)

  return <Nav {...attributes} className={classes} />
}

Widget2.propTypes = propTypes

export default Widget2
