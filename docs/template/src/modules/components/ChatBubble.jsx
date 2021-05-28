import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  variant: PropTypes.string,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const ChatBubble = props => {
  const { className, cssModule, innerRef, variant, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames("chat-bubble", { [`chat-bubble-${variant}`]: variant }, className),
    cssModule
  )

  return <Tag {...attributes} ref={innerRef} className={classes} />
}

ChatBubble.propTypes = propTypes
ChatBubble.defaultProps = defaultProps

export default ChatBubble
