import { Header } from "@panely/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import HeaderBreadcrumb from "./HeaderBreadcrumb";
import HeaderSearch from "./HeaderSearch";
import Sticky from "react-stickynode";
import HeaderUser from "./HeaderUser";

function HeaderComponent(props) {
  const { headerTitle } = props;

  return (
    <Header>
      <Sticky
        enabled={true}
        top={0}
        bottomBoundary={0}
        className="sticky-header"
      >
        {/* BEGIN Header Holder */}
        <Header.Holder>
          <Header.Container fluid>
            <Header.Wrap justify="start" className="pr-3">
              <Header.Brand>
                <img
                  src="/images/logo.png"
                  alt="teaching path"
                  style={{ height: "40px" }}
                />
              </Header.Brand>
            </Header.Wrap>
            <Header.Wrap block>
              <HeaderSearch />
            </Header.Wrap>
            <Header.Wrap>
              <HeaderUser className="ml-2" />
            </Header.Wrap>
          </Header.Container>
        </Header.Holder>
        {/* END Header Holder */}
      </Sticky>
      {/* BEGIN Header Holder */}
      <Header.Holder>
        <Header.Container fluid>
          <Header.Title children={headerTitle} />
          <Header.Divider />
          <Header.Wrap block justify="start">
            <HeaderBreadcrumb />
          </Header.Wrap>
        </Header.Container>
      </Header.Holder>
    </Header>
  );
}

function mapStateToProps(state) {
  return {
    headerTitle: state.page.headerTitle,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
