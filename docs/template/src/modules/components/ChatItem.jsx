import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import ChatContent from "./ChatContent"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  content: PropTypes.bool,
  align: PropTypes.oneOf(["right", "left"]),
  tag: tagPropType
}

const defaultProps = {
  align: "left",
  tag: "div"
}

const ChatItem = props => {
  const { className, cssModule, children, content, align, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(className, "chat-item", `chat-item-${align}`),
    cssModule
  )

  if (content) {
    return (
      <Tag {...attributes} className={classes}>
        <ChatContent>{children}</ChatContent>
      </Tag>
    )
  } else {
    return (
      <Tag {...attributes} className={classes}>
        {children}
      </Tag>
    )
  }
}

ChatItem.propTypes = propTypes
ChatItem.defaultProps = defaultProps

export default ChatItem
