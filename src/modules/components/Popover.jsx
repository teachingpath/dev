import React from "react"
import PropTypes from "prop-types"
import TooltipPopoverWrapper, { propTypes } from "./TooltipPopoverWrapper"
import classNames from "classnames"
import { omit } from "./utils"
const omitKeys = ["defaultOpen"]

const defaultProps = {
  placementPrefix: "bs-popover",
  placement: "right",
  trigger: "click"
}

function Popover(props) {
  const HeaderTag = "h3"
  const BodyTag = "div"

  const popperClasses = classNames("popover", "show", props.popperClassName)
  const containerClasses = classNames("popover-inner", props.innerClassName)
  const headerClasses = classNames("popover-header")
  const bodyClasses = classNames("popover-body")

  return (
    <TooltipPopoverWrapper
      {...props}
      popperClassName={popperClasses}
      innerClassName={containerClasses}
    >
      {props.title ? <HeaderTag className={headerClasses}>{props.title}</HeaderTag> : null}
      <BodyTag className={bodyClasses}>{props.children}</BodyTag>
    </TooltipPopoverWrapper>
  )
}

class PopoverUncontrolled extends React.Component {
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
      <Popover isOpen={this.state.isOpen} toggle={this.toggle} {...omit(this.props, omitKeys)} />
    )
  }
}

PopoverUncontrolled.propTypes = {
  defaultOpen: PropTypes.bool,
  ...Popover.propTypes
}

Popover.propTypes = propTypes
Popover.defaultProps = defaultProps
Popover.Uncontrolled = PopoverUncontrolled

export default Popover
