import React from "react"
import PropTypes from "prop-types"
import Portal from "./Portal"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"
import AsideHeader from "./AsideHeader"
import AsideBody from "./AsideBody"
import AsideTitle from "./AsideTitle"
import AsideAddon from "./AsideAddon"

const propTypes = {
  desktopMinimized: PropTypes.bool,
  mobileMinimized: PropTypes.bool,
  backdropOnClick: PropTypes.func,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  innerRef: refPropType,
  tag: tagPropType
}

const defaultProps = {
  desktopMinimized: false,
  mobileMinimized: true,
  tag: "div"
}

class Aside extends React.Component {
  constructor(props) {
    super(props)

    this.breakpoint = 1025
    this.transitionDuration = 200
    this.state = {
      desktopMinimized: this.props.desktopMinimized,
      mobileMinimized: this.props.mobileMinimized,
      asideHover: false
    }
    this.classes = {
      active: "aside-active",
      desktop: {
        minimized: "aside-desktop-minimized",
        maximized: "aside-desktop-maximized"
      },
      mobile: {
        minimized: "aside-mobile-minimized",
        maximized: "aside-mobile-maximized"
      }
    }
    this.backdropClick = this.backdropClick.bind(this)
    this.toggleMinimizedBodyClass = this.toggleMinimizedBodyClass.bind(this)
  }

  toggleMinimizedBodyClass(viewport, minimized) {
    if (minimized) {
      document.body.classList.add(this.classes[viewport].minimized)
      document.body.classList.remove(this.classes[viewport].maximized)
    } else {
      document.body.classList.remove(this.classes[viewport].minimized)
      document.body.classList.add(this.classes[viewport].maximized)
    }
  }

  backdropClick(e) {
    let newState = this.state
    newState.mobileMinimized = true
    this.toggleMinimizedBodyClass("mobile", true)
    this.setState(newState)

    if (this.props.backdropOnClick) {
      this.props.backdropOnClick(e)
    }
  }

  componentDidMount() {
    let newState = this.state

    document.body.classList.add(this.classes.active)
    newState.asideHover = this.state.desktopMinimized

    this.toggleMinimizedBodyClass("desktop", this.state.desktopMinimized)
    this.toggleMinimizedBodyClass("mobile", this.state.mobileMinimized)

    this.setState(newState)
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      let newState = this.state

      if (window.innerWidth >= this.breakpoint) {
        newState.desktopMinimized = this.props.desktopMinimized
        this.toggleMinimizedBodyClass("desktop", this.state.desktopMinimized)
        this.setState(newState)
        if (this.props.desktopMinimized) {
          setTimeout(() => {
            newState.asideHover = true
            this.setState(newState)
          }, this.transitionDuration)
        } else {
          newState.asideHover = false
          this.setState(newState)
        }
      } else {
        newState.mobileMinimized = this.props.mobileMinimized
        this.toggleMinimizedBodyClass("mobile", this.state.mobileMinimized)
        this.setState(newState)
      }
    }
  }

  componentWillUnmount() {
    const removedClasses = [
      this.classes.active,
      this.classes.desktop.minimized,
      this.classes.desktop.maximized,
      this.classes.mobile.minimized,
      this.classes.mobile.maximized
    ]

    removedClasses.forEach(removedClass => {
      document.body.classList.remove(removedClass)
    })
  }

  render() {
    const {
      desktopMinimized,
      mobileMinimized,
      backdropOnClick,
      className,
      cssModule,
      children,
      innerRef,
      tag: Tag,
      ...attributes
    } = this.props

    const classes = mapToCssModules(
      classNames("aside", { "aside-hover": this.state.asideHover }, className),
      cssModule
    )

    return (
      <Tag {...attributes} className={classes} ref={innerRef}>
        {children}
        {!this.state.mobileMinimized ? (
          <Portal>
            <div id="aside-backdrop" onClick={this.backdropClick} />
          </Portal>
        ) : null}
      </Tag>
    )
  }
}

Aside.propTypes = propTypes
Aside.defaultProps = defaultProps

Aside.Header = AsideHeader
Aside.Body = AsideBody
Aside.Title = AsideTitle
Aside.Addon = AsideAddon

export default Aside
