import { Button, Tooltip, ButtonGroup } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

function HeaderAction() {
  return (
    <React.Fragment>
      <HeaderActionRadio />
      <HeaderActionFullscreen className="ml-2" />
    </React.Fragment>
  )
}

class HeaderActionRadio extends React.Component {
  state = {
    // Default active button
    buttonActive: "today"
  }

  // Handle click event for each buttons
  handleClick = id => {
    this.setState({ buttonActive: id })
  }

  render() {
    return (
      <ButtonGroup {...this.props}>
        <Button
          active={this.state.buttonActive === "today"}
          onClick={() => this.handleClick("today")}
          variant="flat-primary"
        >
          Today
        </Button>
        <Button
          active={this.state.buttonActive === "week"}
          onClick={() => this.handleClick("week")}
          variant="flat-primary"
        >
          Week
        </Button>
        <Button
          active={this.state.buttonActive === "month"}
          onClick={() => this.handleClick("month")}
          variant="flat-primary"
        >
          Month
        </Button>
      </ButtonGroup>
    )
  }
}

class HeaderActionFullscreen extends React.Component {
  state = { fullscreenActive: false }

  // Handle click event
  handleClick = () => {
    if (this.state.fullscreenActive) {
      // Exit from fullscreen mode
      document.exitFullscreen()
    } else {
      // Activating fullscreen mode
      document.documentElement.requestFullscreen()
    }
  }

  componentDidMount() {
    const fullscreenClass = "fullscreen-active"

    document.onfullscreenchange = () => {
      // Check whether fullscreen mode is activated
      if (document.fullscreenElement) {
        // Set the state and add the class to the body element
        this.setState({ fullscreenActive: true }, () => {
          document.body.classList.add(fullscreenClass)
        })
      } else {
        // Set the state and remove the class to the body element
        this.setState({ fullscreenActive: false }, () => {
          document.body.classList.remove(fullscreenClass)
        })
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Button
          icon
          id="fullscreenTrigger"
          variant="label-info"
          onClick={this.handleClick}
          {...this.props}
        >
          <FontAwesomeIcon icon={SolidIcon.faExpand} className="fullscreen-icon-expand" />
          <FontAwesomeIcon icon={SolidIcon.faCompress} className="fullscreen-icon-compress" />
        </Button>
        <Tooltip.Uncontrolled placement="left" target="fullscreenTrigger">
          Toggle fullscreen
        </Tooltip.Uncontrolled>
      </React.Fragment>
    )
  }
}

export default HeaderAction
