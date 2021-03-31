import React from "react"
import PropTypes from "prop-types"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { mapToCssModules, tagPropType, refPropType } from "./utils"
import classNames from "classnames"
import Fade from "./Fade"
import AlertLink from "./AlertLink"
import AlertHeader from "./AlertHeader"

const propTypes = {
  closeClassName: PropTypes.string,
  closeAriaLabel: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  transition: PropTypes.shape(Fade.propTypes),
  innerRef: refPropType,
  children: PropTypes.node,
  variant: PropTypes.string,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  fade: PropTypes.bool,
  icon: PropTypes.node,
  tag: tagPropType
}

const defaultProps = {
  closeClassName: "btn btn-text-danger btn-icon",
  closeAriaLabel: "Close",
  transition: {
    ...Fade.defaultProps,
    unmountOnExit: true
  },
  variant: "primary",
  isOpen: true,
  fade: false,
  tag: "div"
}

const Alert = props => {
  const {
    closeClassName,
    closeAriaLabel,
    className,
    cssModule,
    transition,
    innerRef,
    children,
    variant,
    isOpen,
    toggle,
    fade,
    icon,
    tag: Tag,
    ...attributes
  } = props

  const classes = mapToCssModules(
    classNames("alert", `alert-${variant}`, { "alert-dismissible": toggle }, className),
    cssModule
  )

  const closeClasses = mapToCssModules(classNames(closeClassName), cssModule)
  const iconClasses = mapToCssModules(classNames("alert-icon"), cssModule)
  const contentClasses = mapToCssModules(classNames("alert-content"), cssModule)

  const alertTransition = {
    ...Fade.defaultProps,
    ...transition,
    baseClass: fade ? transition.baseClass : "",
    timeout: fade ? transition.timeout : 0
  }

  return (
    <Fade
      {...attributes}
      {...alertTransition}
      tag={Tag}
      className={classes}
      in={isOpen}
      role="alert"
      innerRef={innerRef}
    >
      {icon ? <div className={iconClasses}>{icon}</div> : null}
      <div className={contentClasses}>{children}</div>
      {toggle ? (
        <button type="button" className={closeClasses} aria-label={closeAriaLabel} onClick={toggle}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      ) : null}
    </Fade>
  )
}

class AlertUncontrolled extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: true }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return <Alert isOpen={this.state.isOpen} toggle={this.toggle} {...this.props} />
  }
}

Alert.propTypes = propTypes
Alert.defaultProps = defaultProps

Alert.Link = AlertLink
Alert.Header = AlertHeader
Alert.Uncontrolled = AlertUncontrolled

export default Alert
