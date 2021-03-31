import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules } from "./utils"
import Portlet from "./Portlet"
import Widget1Addon from "./Widget1Addon"
import Widget1Body from "./Widget1Body"
import Widget1Dialog from "./Widget1Dialog"
import Widget1DialogContent from "./Widget1DialogContent"
import Widget1Display from "./Widget1Display"
import Widget1Group from "./Widget1Group"
import Widget1Offset from "./Widget1Offset"
import Widget1Title from "./Widget1Title"

const propTypes = {
  className: PropTypes.string
}

const Widget1 = props => {
  const { className, cssModule, ...attributes } = props

  const classes = mapToCssModules(classNames("widget1", className), cssModule)

  return <Portlet {...attributes} className={classes} />
}

Widget1.propTypes = propTypes

Widget1.Addon = Widget1Addon
Widget1.Body = Widget1Body
Widget1.Dialog = Widget1Dialog
Widget1.DialogContent = Widget1DialogContent
Widget1.Display = Widget1Display
Widget1.Group = Widget1Group
Widget1.Offset = Widget1Offset
Widget1.Title = Widget1Title

export default Widget1
