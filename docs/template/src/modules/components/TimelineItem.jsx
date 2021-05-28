import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  contentTag: tagPropType,
  timeTag: tagPropType,
  pinTag: tagPropType,
  time: PropTypes.node,
  pin: PropTypes.node,
  tag: tagPropType
}

const defaultProps = {
  contentTag: "div",
  timeTag: "div",
  pinTag: "div",
  tag: "div"
}

const TimelineItem = props => {
  let {
    className,
    cssModule,
    children,
    contentTag: ContentTag,
    timeTag: TimeTag,
    pinTag: PinTag,
    time,
    pin,
    tag: Tag,
    ...attributes
  } = props

  const containerClasses = mapToCssModules(classNames("timeline-item", className), cssModule)
  const contentClasses = mapToCssModules(classNames("timeline-content", className), cssModule)
  const timeClasses = mapToCssModules(classNames("timeline-time", className), cssModule)
  const pinClasses = mapToCssModules(classNames("timeline-pin", className), cssModule)

  return (
    <Tag {...attributes} className={containerClasses}>
      {time ? <TimeTag className={timeClasses}>{time}</TimeTag> : null}
      {pin ? <PinTag className={pinClasses}>{pin}</PinTag> : null}
      <ContentTag className={contentClasses}>{children}</ContentTag>
    </Tag>
  )
}

TimelineItem.propTypes = propTypes
TimelineItem.defaultProps = defaultProps

export default TimelineItem
