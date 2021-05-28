import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import RichListContent from "./RichListContent"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  content: PropTypes.bool,
  active: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const RichListItem = props => {
  let {
    className,
    cssModule,
    children,
    disabled,
    content,
    active,
    tag: Tag,
    ...attributes
  } = props

  if (attributes.href) {
    Tag = "a"
  }

  const classes = mapToCssModules(
    classNames("rich-list-item", { disabled, active }, className),
    cssModule
  )

  if (content) {
    return (
      <Tag {...attributes} className={classes}>
        <RichListContent>{children}</RichListContent>
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

RichListItem.propTypes = propTypes
RichListItem.defaultProps = defaultProps

export default RichListItem
