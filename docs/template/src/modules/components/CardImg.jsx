import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  filter: PropTypes.bool,
  bottom: PropTypes.bool,
  top: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "img"
}

const CardImg = props => {
  const { className, cssModule, filter, bottom, top, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      top ? "card-img-top" : bottom ? "card-img-bottom" : "card-img",
      { "card-img-filter": filter },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

CardImg.propTypes = propTypes
CardImg.defaultProps = defaultProps

export default CardImg
