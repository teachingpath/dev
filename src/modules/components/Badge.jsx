import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  variant: PropTypes.string,
  shape: PropTypes.oneOf(["circle", "square"]),
  size: PropTypes.oneOf(["lg", "xl"]),
  pill: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  variant: "secondary",
  pill: false,
  tag: "span"
}

const Badge = props => {
  let {
    className,
    cssModule,
    innerRef,
    variant,
    shape,
    size,
    pill,
    tag: Tag,
    ...attributes
  } = props

  const classes = mapToCssModules(
    classNames(
      "badge",
      `badge-${variant}`,
      {
        "badge-pill": pill,
        [`badge-${shape}`]: shape,
        [`badge-${size}`]: size
      },
      className
    ),
    cssModule
  )

  if (attributes.href && Tag === "span") {
    Tag = "a"
  }

  return <Tag {...attributes} className={classes} ref={innerRef} />
}

Badge.propTypes = propTypes
Badge.defaultProps = defaultProps

export default Badge
