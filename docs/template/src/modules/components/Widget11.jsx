import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  bottom: PropTypes.bool,
  top: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Widget11 = props => {
  const { className, cssModule, bottom, top, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      "widget11",
      {
        "widget11-bottom": bottom,
        "widget11-top": top
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Widget11.propTypes = propTypes
Widget11.defaultProps = defaultProps

export default Widget11
