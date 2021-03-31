import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import TimelineItem from "./TimelineItem"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  zigzag: PropTypes.bool,
  timed: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Timeline = props => {
  const { className, cssModule, zigzag, timed, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      "timeline",
      {
        "timeline-zigzag": zigzag,
        "timeline-timed": timed
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

Timeline.propTypes = propTypes
Timeline.defaultProps = defaultProps

Timeline.Item = TimelineItem

export default Timeline
