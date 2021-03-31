import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"
import SidemenuAddon from "./SidemenuAddon"
import SidemenuBody from "./SidemenuBody"
import SidemenuHeader from "./SidemenuHeader"
import SidemenuTitle from "./SidemenuTitle"

const propTypes = {
  backdropOnClick: PropTypes.func,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  children: PropTypes.node,
  width: PropTypes.oneOf(["wide", "wider", "widest"]),
  align: PropTypes.oneOf(["left", "right"]),
  show: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  align: "left",
  show: false,
  tag: "div"
}

class Sidemenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = { show: this.props.show }

    this.openedClass = "sidemenu-open"
    this.setBodyClass = this.setBodyClass.bind(this)
    this.backdropClick = this.backdropClick.bind(this)
  }

  setBodyClass(show) {
    if (show) {
      document.body.classList.add(this.openedClass)
    } else {
      document.body.classList.remove(this.openedClass)
    }
  }

  backdropClick(e) {
    this.setState({ show: false }, () => {
      this.setBodyClass(false)
    })

    if (this.props.backdropOnClick) {
      this.props.backdropOnClick(e)
    }
  }

  componentDidMount() {
    this.setBodyClass(this.state.show)
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.setState({ show: this.props.show }, () => {
        this.setBodyClass(this.state.show)
      })
    }
  }

  componentWillUnmount() {
    this.setBodyClass(false)
  }

  render() {
    const {
      backdropOnClick,
      className,
      cssModule,
      innerRef,
      children,
      width,
      align,
      show,
      tag: Tag,
      ...attributes
    } = this.props

    const classes = mapToCssModules(
      classNames(
        "sidemenu",
        {
          [`sidemenu-${align}`]: align,
          [`sidemenu-${width}`]: width,
          active: this.state.show
        },
        className
      ),
      cssModule
    )

    return (
      <React.Fragment>
        <Tag {...attributes} ref={innerRef} className={classes} children={children} />
        {this.state.show ? <div id="sidemenu-backdrop" onClick={this.backdropClick} /> : null}
      </React.Fragment>
    )
  }
}

Sidemenu.propTypes = propTypes
Sidemenu.defaultProps = defaultProps

Sidemenu.Addon = SidemenuAddon
Sidemenu.Body = SidemenuBody
Sidemenu.Header = SidemenuHeader
Sidemenu.Title = SidemenuTitle

export default Sidemenu
