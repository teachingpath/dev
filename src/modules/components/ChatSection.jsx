import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  textTag: tagPropType,
  tag: tagPropType
}

const defaultProps = {
  textTag: "span",
  tag: "div"
}

const ChatSection = props => {
  const { className, cssModule, children, textTag: TextTag, tag: Tag, ...attributes } = props

  const containerClasses = mapToCssModules(classNames(className, "chat-section"), cssModule)
  const textClasses = mapToCssModules(classNames("chat-section-text"), cssModule)

  return (
    <Tag {...attributes} className={containerClasses}>
      <TextTag className={textClasses}>{children}</TextTag>
    </Tag>
  )
}

ChatSection.propTypes = propTypes
ChatSection.defaultProps = defaultProps

export default ChatSection
