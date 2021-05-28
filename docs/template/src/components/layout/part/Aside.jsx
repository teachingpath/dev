import { Aside, Button } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { asideChange, asideToggle } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import AsideBody from "./AsideBody"
import Router from "next/router"

class AsideComponent extends React.Component {
  componentDidMount() {
    // Collapse aside when the routing start for mobile device
    Router.events.on("routeChangeStart", () => this.props.asideChange({ mobileMinimized: true }))
  }

  render() {
    const { desktopMinimized, mobileMinimized, asideChange, asideToggle } = this.props

    return (
      <Aside
        desktopMinimized={desktopMinimized}
        mobileMinimized={mobileMinimized}
        backdropOnClick={() => asideChange({ mobileMinimized: true })}
      >
        <Aside.Header>
          <Aside.Title>Panely</Aside.Title>
          <Aside.Addon>
            <Button icon size="lg" variant="label-primary" onClick={() => asideToggle()}>
              <FontAwesomeIcon icon={SolidIcon.faTimes} className="aside-icon-minimize" />
              <FontAwesomeIcon icon={SolidIcon.faThumbtack} className="aside-icon-maximize" />
            </Button>
          </Aside.Addon>
        </Aside.Header>
        <AsideBody />
      </Aside>
    )
  }
}

function mapStateToProps(state) {
  return state.aside
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ asideChange, asideToggle }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AsideComponent)
