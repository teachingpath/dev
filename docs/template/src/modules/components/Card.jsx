import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"
import CardBody from "./CardBody"
import CardFooter from "./CardFooter"
import CardHeader from "./CardHeader"
import CardImg from "./CardImg"
import CardImgOverlay from "./CardImgOverlay"
import CardLink from "./CardLink"
import CardTitle from "./CardTitle"
import CardSubtitle from "./CardSubtitle"
import CardText from "./CardText"
import CardIcon from "./CardIcon"
import CardAddon from "./CardAddon"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  inverse: PropTypes.bool,
  body: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const Card = props => {
  const { className, cssModule, innerRef, inverse, body, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      "card",
      {
        "card-body": body,
        "text-white": inverse
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} ref={innerRef} />
}

Card.propTypes = propTypes
Card.defaultProps = defaultProps

Card.Body = CardBody
Card.Footer = CardFooter
Card.Header = CardHeader
Card.Img = CardImg
Card.ImgOverlay = CardImgOverlay
Card.Link = CardLink
Card.Title = CardTitle
Card.Subtitle = CardSubtitle
Card.Text = CardText
Card.Icon = CardIcon
Card.Addon = CardAddon

export default Card
