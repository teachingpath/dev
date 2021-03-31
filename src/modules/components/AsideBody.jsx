import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const AsideBody = props => {
  const { className, cssModule, innerRef, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(classNames("aside-body", className), cssModule)

  return <Tag {...attributes} ref={innerRef} className={classes} />
}

AsideBody.propTypes = propTypes
AsideBody.defaultProps = defaultProps

export default AsideBody
