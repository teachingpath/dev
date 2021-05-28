import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType } from "./utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

const MenuSection = props => {
  const { className, cssModule, children, innerRef, tag: Tag, ...attributes } = props

  const classes = mapToCssModules(classNames("menu-section", className), cssModule)
  const iconClasses = mapToCssModules(classNames("menu-section-icon"), cssModule)
  const textClasses = mapToCssModules(classNames("menu-section-text"), cssModule)

  return (
    <Tag className={classes}>
      <div className={iconClasses}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </div>
      <h2 className={textClasses}>{children}</h2>
    </Tag>
  )
}

MenuSection.propTypes = propTypes
MenuSection.defaultProps = defaultProps

export default MenuSection
