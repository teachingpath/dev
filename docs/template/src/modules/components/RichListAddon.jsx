import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  addonType: PropTypes.oneOf(["prepend", "append"]),
  tag: tagPropType
}

const defaultProps = {
  addonType: "prepend",
  tag: "div"
}

const RichListAddon = props => {
  const { className, cssModule, addonType, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames({ [`rich-list-${addonType}`]: addonType }, className),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

RichListAddon.propTypes = propTypes
RichListAddon.defaultProps = defaultProps

export default RichListAddon
