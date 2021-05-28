import { Header, Button, Marker } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { asideToggle, sidemenuToggle } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as RegularIcon from "@fortawesome/free-regular-svg-icons"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import HeaderNotification from "./HeaderNotification"
import HeaderBreadcrumb from "./HeaderBreadcrumb"
import HeaderSearch from "./HeaderSearch"
import HeaderAction from "./HeaderAction"
import HeaderChat from "./HeaderChat"
import HeaderUser from "./HeaderUser"
import HeaderNav from "./HeaderNav"
import Sticky from "react-stickynode"

function HeaderComponent(props) {
  const { headerTitle, sidemenuToggle, asideToggle } = props

  return (
    <Header>
      <Sticky enabled={true} top={0} bottomBoundary={0} className="sticky-header">
        {/* BEGIN Header Holder */}
        <Header.Holder desktop>
          <Header.Container fluid>
            <Header.Wrap>
              <HeaderNav />
            </Header.Wrap>
            <Header.Wrap block>
              <HeaderSearch />
            </Header.Wrap>
            <Header.Wrap>
              <HeaderNotification variant="label-primary" />
              <HeaderChat variant="label-primary" className="ml-2" />
              <Button
                icon
                variant="label-primary"
                className="ml-2"
                onClick={() => sidemenuToggle("agenda")}
              >
                <FontAwesomeIcon icon={RegularIcon.faCalendarAlt} />
              </Button>
              <Button
                icon
                variant="label-primary"
                className="ml-2"
                onClick={() => sidemenuToggle("setting")}
              >
                <FontAwesomeIcon icon={RegularIcon.faListAlt} />
              </Button>
              <HeaderUser className="ml-2" />
            </Header.Wrap>
          </Header.Container>
        </Header.Holder>
        {/* END Header Holder */}
      </Sticky>
      {/* BEGIN Header Holder */}
      <Header.Holder desktop>
        <Header.Container fluid>
          <Header.Title children={headerTitle} />
          <Header.Divider />
          <Header.Wrap block justify="start">
            <HeaderBreadcrumb />
          </Header.Wrap>
          <Header.Wrap>
            <HeaderAction />
          </Header.Wrap>
        </Header.Container>
      </Header.Holder>
      {/* END Header Holder */}
      <Sticky enabled={true} top={0} bottomBoundary={0} className="sticky-header">
        {/* BEGIN Header Holder */}
        <Header.Holder mobile>
          <Header.Container fluid>
            <Header.Wrap>
              <Button icon variant="flat-primary" onClick={asideToggle}>
                <FontAwesomeIcon icon={SolidIcon.faBars} />
              </Button>
            </Header.Wrap>
            <Header.Wrap block justify="start" className="px-3">
              <Header.Brand>Panely</Header.Brand>
            </Header.Wrap>
            <Header.Wrap>
              <Button
                icon
                variant="flat-primary"
                onClick={() => sidemenuToggle("agenda")}
              >
                <FontAwesomeIcon icon={RegularIcon.faCalendarAlt} />
                <Button.Marker>
                  <Marker type="dot" variant="success" />
                </Button.Marker>
              </Button>
              <HeaderUser className="ml-2" />
            </Header.Wrap>
          </Header.Container>
        </Header.Holder>
        {/* BEGIN Header Holder */}
      </Sticky>
      {/* BEGIN Header Holder */}
      <Header.Holder mobile>
        <Header.Container fluid>
          <Header.Wrap block justify="start" className="w-100">
            <HeaderBreadcrumb />
          </Header.Wrap>
        </Header.Container>
      </Header.Holder>
      {/* END Header Holder */}
    </Header>
  )
}

function mapStateToProps(state) {
  return {
    headerTitle: state.page.headerTitle
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ asideToggle, sidemenuToggle }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
