import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import TooltipPopoverWrapper, { propTypes } from "./TooltipPopoverWrapper"
import { omit } from "./utils"

const omitKeys = ["defaultOpen"]
const defaultProps = {
  placement: "top",
  autohide: true,
  placementPrefix: "bs-tooltip",
  trigger: "hover focus"
}

function Tooltip(props) {
  const { popperClassName, innerClassName } = props

  const popperClasses = classNames("tooltip", "show", popperClassName)

  const classes = classNames("tooltip-inner", innerClassName)

  return (
    <TooltipPopoverWrapper {...props} popperClassName={popperClasses} innerClassName={classes} />
  )
}

class TooltipUncontrolled extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: props.defaultOpen || false }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <Tooltip isOpen={this.state.isOpen} toggle={this.toggle} {...omit(this.props, omitKeys)} />
    )
  }
}

TooltipUncontrolled.propTypes = {
  defaultOpen: PropTypes.bool,
  ...Tooltip.propTypes
}

Tooltip.propTypes = propTypes
Tooltip.defaultProps = defaultProps

Tooltip.Uncontrolled = TooltipUncontrolled

export default Tooltip
