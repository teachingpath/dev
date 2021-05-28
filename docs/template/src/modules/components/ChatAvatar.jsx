import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import Avatar from "./Avatar"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const ChatAvatar = props => {
  const { className, cssModule, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(classNames("chat-avatar", className), cssModule)

  return (
    <Tag className={classes}>
      <Avatar {...attributes} />
    </Tag>
  )
}

ChatAvatar.propTypes = propTypes
ChatAvatar.defaultProps = defaultProps

export default ChatAvatar
