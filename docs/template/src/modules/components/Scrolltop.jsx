import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  offset: PropTypes.number,
  active: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  offset: 200,
  tag: "div"
}

class Scrolltop extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.activePosition = this.activePosition.bind(this)
  }

  handleClick() {
    window.scrollTo(0, 0)
  }

  activePosition(position) {
    if (position >= this.props.offset) {
      if (!this.state.active) {
        this.setState({ active: true })
      }
    } else {
      if (this.state.active) {
        this.setState({ active: false })
      }
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      this.activePosition(window.scrollY)
    })
  }

  render() {
    const { className, cssModule, innerRef, offset, active, tag: Tag, ...attributes } = this.props

    const classes = mapToCssModules(
      classNames("scrolltop", { active: this.state.active }, className),
      cssModule
    )

    return <Tag {...attributes} ref={innerRef} onClick={this.handleClick} className={classes} />
  }
}

Scrolltop.propTypes = propTypes
Scrolltop.defaultProps = defaultProps

export default Scrolltop
