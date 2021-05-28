import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import InputGroupText from "./InputGroupText"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  addonType: PropTypes.oneOf(["prepend", "append"]).isRequired,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const InputGroupAddon = props => {
  const { className, cssModule, children, addonType, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(classNames(`input-group-${addonType}`, className), cssModule)

  // Convenience to assist with transition
  if (typeof children === "string") {
    return (
      <Tag {...attributes} className={classes}>
        <InputGroupText children={children} />
      </Tag>
    )
  }

  return <Tag {...attributes} className={classes} children={children} />
}

InputGroupAddon.propTypes = propTypes
InputGroupAddon.defaultProps = defaultProps

export default InputGroupAddon
