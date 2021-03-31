import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  justify: PropTypes.oneOf(["start", "center", "end"]),
  block: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const HeaderWrap = props => {
  const { className, cssModule, justify, block, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(
    classNames(
      "header-wrap",
      {
        "header-wrap-block": block,
        [`justify-content-${justify}`]: justify
      },
      className
    ),
    cssModule
  )

  return <Tag {...attributes} className={classes} />
}

HeaderWrap.propTypes = propTypes
HeaderWrap.defaultProps = defaultProps

export default HeaderWrap
