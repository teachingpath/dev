import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, toNumber } from "./utils"

const propTypes = {
  barAriaValueText: PropTypes.string,
  barAriaLabelledBy: PropTypes.string,
  barClassName: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  variant: PropTypes.string,
  multi: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  size: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bar: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  value: 0,
  style: {},
  tag: "div",
  min: 0,
  max: 100
}

const Progress = props => {
  const {
    barAriaValueText,
    barAriaLabelledBy,
    barClassName,
    className,
    cssModule,
    children,
    animated,
    striped,
    variant,
    multi,
    value,
    style,
    size,
    min,
    max,
    bar,
    tag: Tag,
    ...attributes
  } = props

  const percent = (toNumber(value) / toNumber(max)) * 100

  const progressClasses = mapToCssModules(
    classNames("progress", size ? `progress-${size}` : false, className),
    cssModule
  )

  const progressBarClasses = mapToCssModules(
    classNames(
      "progress-bar",
      bar ? className || barClassName : barClassName,
      animated ? "progress-bar-animated" : false,
      variant ? `bg-${variant}` : false,
      striped || animated ? "progress-bar-striped" : false
    ),
    cssModule
  )

  const ProgressBar = multi ? (
    children
  ) : (
    <div
      style={{
        width: `${percent}%`
      }}
      className={progressBarClasses}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuetext={barAriaValueText}
      aria-labelledby={barAriaLabelledBy}
      children={children}
    />
  )

  if (bar) {
    return ProgressBar
  }

  return <Tag style={style} {...attributes} className={progressClasses} children={ProgressBar} />
}

Progress.propTypes = propTypes
Progress.defaultProps = defaultProps

export default Progress
