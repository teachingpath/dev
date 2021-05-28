import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import RichListAddon from "./RichListAddon"
import RichListItem from "./RichListItem"
import RichListContent from "./RichListContent"
import RichListTitle from "./RichListTitle"
import RichListSubtitle from "./RichListSubtitle"
import RichListParagraph from "./RichListParagraph"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  bordered: PropTypes.bool,
  wrapper: PropTypes.bool,
  action: PropTypes.bool,
  flush: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const RichList = props => {
  const { className, cssModule, bordered, wrapper, action, flush, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      {
        "rich-list": !wrapper,
        "rich-list-flush": flush,
        "rich-list-bordered": bordered,
        "rich-list-action": action
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

RichList.propTypes = propTypes
RichList.defaultProps = defaultProps

RichList.Addon = RichListAddon
RichList.Item = RichListItem
RichList.Content = RichListContent
RichList.Title = RichListTitle
RichList.Subtitle = RichListSubtitle
RichList.Paragraph = RichListParagraph

export default RichList
