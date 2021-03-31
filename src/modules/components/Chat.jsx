import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"
import ChatItem from "./ChatItem"
import ChatContent from "./ChatContent"
import ChatAuthor from "./ChatAuthor"
import ChatAvatar from "./ChatAvatar"
import ChatTime from "./ChatTime"
import ChatBubble from "./ChatBubble"
import ChatSection from "./ChatSection"
import ChatImg from "./ChatImg"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Chat = props => {
  const { className, cssModule, innerRef, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(classNames("chat", className), cssModule)

  return <Tag {...attributes} ref={innerRef} className={classes} />
}

Chat.propTypes = propTypes
Chat.defaultProps = defaultProps

Chat.Item = ChatItem
Chat.Content = ChatContent
Chat.Author = ChatAuthor
Chat.Avatar = ChatAvatar
Chat.Time = ChatTime
Chat.Bubble = ChatBubble
Chat.Section = ChatSection
Chat.Img = ChatImg

export default Chat
