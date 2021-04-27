import { Header, Button, Marker } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sidemenuToggle } from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

import HeaderBreadcrumb from "./HeaderBreadcrumb";
import HeaderUser from "./HeaderUser";
import HeaderNav from "./HeaderNav";
import Sticky from "react-stickynode";

function HeaderComponent(props) {
  const { headerTitle, sidemenuToggle } = props;

  return (
    <Header>
      <Sticky
        enabled={true}
        top={0}
        bottomBoundary={0}
        className="sticky-header"
      >
        {/* BEGIN Header Holder */}
        <Header.Holder desktop>
          <Header.Container fluid>
            <Header.Wrap justify="start" className="pr-3">
              <Header.Brand>
                <img src="/images/logo.png" alt="teaching path" />
              </Header.Brand>
            </Header.Wrap>
            <Header.Wrap block justify="start">
              <HeaderNav />
            </Header.Wrap>
            <Header.Wrap>
              <Button
                icon
                variant="label-primary"
                className="ml-2"
                onClick={() => sidemenuToggle("setting")}
              >
                <FontAwesomeIcon icon={SolidIcon.faCog} />
              </Button>
              <HeaderUser />
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
        </Header.Container>
      </Header.Holder>
      {/* END Header Holder */}
      <Sticky
        enabled={true}
        top={0}
        bottomBoundary={0}
        className="sticky-header"
      >
        {/* BEGIN Header Holder */}
        <Header.Holder mobile>
          <Header.Container fluid>
            <Header.Wrap block justify="start" className="px-3">
              <img src="/images/icon.png" alt="teaching path" />
            </Header.Wrap>
            <Header.Wrap>
              <Button
                icon
                variant="label-primary"
                className="ml-2"
                onClick={() => sidemenuToggle("setting")}
              >
                <FontAwesomeIcon icon={SolidIcon.faCog} />
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
  );
}

function mapStateToProps(state) {
  return {
    headerTitle: state.page.headerTitle,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sidemenuToggle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
