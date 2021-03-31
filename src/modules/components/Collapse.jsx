import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Transition } from "react-transition-group"
import {
  mapToCssModules,
  omit,
  pick,
  findDOMElements,
  defaultToggleEvents,
  addMultipleEventListeners,
  TransitionTimeouts,
  TransitionPropTypeKeys,
  TransitionStatuses,
  tagPropType
} from "./utils"

const omitKeys = ["toggleEvents", "defaultOpen"]

const propTypes = {
  ...Transition.propTypes,
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  tag: tagPropType,
  className: PropTypes.node,
  navbar: PropTypes.bool,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object])
}

const defaultProps = {
  ...Transition.defaultProps,
  isOpen: false,
  appear: false,
  enter: true,
  exit: true,
  tag: "div",
  timeout: TransitionTimeouts.Collapse
}

const transitionStatusToClassHash = {
  [TransitionStatuses.ENTERING]: "collapsing",
  [TransitionStatuses.ENTERED]: "collapse show",
  [TransitionStatuses.EXITING]: "collapsing",
  [TransitionStatuses.EXITED]: "collapse"
}

function getTransitionClass(status) {
  return transitionStatusToClassHash[status] || "collapse"
}

function getHeight(node) {
  return node.scrollHeight
}

class Collapse extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      height: null
    }

    this.onEntering = this.onEntering.bind(this)
    this.onEntered = this.onEntered.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
    this.onExit = this.onExit.bind(this)
  }

  onEntering(node, isAppearing) {
    this.setState({ height: getHeight(node) })
    this.props.onEntering(node, isAppearing)
  }

  onEntered(node, isAppearing) {
    this.setState({ height: null })
    this.props.onEntered(node, isAppearing)
  }

  onExit(node) {
    this.setState({ height: getHeight(node) })
    this.props.onExit(node)
  }

  onExiting(node) {
    // getting this variable triggers a reflow
    const _unused = node.offsetHeight // eslint-disable-line no-unused-vars
    this.setState({ height: 0 })
    this.props.onExiting(node)
  }

  onExited(node) {
    this.setState({ height: null })
    this.props.onExited(node)
  }

  render() {
    const {
      tag: Tag,
      isOpen,
      className,
      navbar,
      cssModule,
      children,
      innerRef,
      ...otherProps
    } = this.props

    const { height } = this.state

    const transitionProps = pick(otherProps, TransitionPropTypeKeys)
    const childProps = omit(otherProps, TransitionPropTypeKeys)
    return (
      <Transition
        {...transitionProps}
        in={isOpen}
        onEntering={this.onEntering}
        onEntered={this.onEntered}
        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        {status => {
          let collapseClass = getTransitionClass(status)
          const classes = mapToCssModules(
            classNames(className, collapseClass, navbar && "navbar-collapse"),
            cssModule
          )
          const style = height === null ? null : { height }
          return (
            <Tag
              {...childProps}
              style={{ ...childProps.style, ...style }}
              className={classes}
              ref={this.props.innerRef}
            >
              {children}
            </Tag>
          )
        }}
      </Transition>
    )
  }
}

class UncontrolledCollapse extends React.Component {
  constructor(props) {
    super(props)

    this.togglers = null
    this.removeEventListeners = null
    this.toggle = this.toggle.bind(this)

    this.state = { isOpen: props.defaultOpen || false }
  }

  componentDidMount() {
    this.togglers = findDOMElements(this.props.toggler)
    if (this.togglers.length) {
      this.removeEventListeners = addMultipleEventListeners(
        this.togglers,
        this.toggle,
        this.props.toggleEvents
      )
    }
  }

  componentWillUnmount() {
    if (this.togglers.length && this.removeEventListeners) {
      this.removeEventListeners()
    }
  }

  toggle(e) {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
    e.preventDefault()
  }

  render() {
    return <Collapse isOpen={this.state.isOpen} {...omit(this.props, omitKeys)} />
  }
}

UncontrolledCollapse.propTypes = {
  defaultOpen: PropTypes.bool,
  toggler: PropTypes.string.isRequired,
  toggleEvents: PropTypes.arrayOf(PropTypes.string)
}

UncontrolledCollapse.defaultProps = {
  toggleEvents: defaultToggleEvents
}

Collapse.propTypes = propTypes
Collapse.defaultProps = defaultProps

Collapse.Uncontrolled = UncontrolledCollapse

export default Collapse
