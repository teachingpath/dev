import { Header, Button, Badge } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sidemenuToggle, getPathwayBy, getRunnerBy } from "store/actions";
import { bindActionCreators } from "redux";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

import HeaderBreadcrumb from "./HeaderBreadcrumb";
import HeaderUser from "./HeaderUser";
import HeaderNav from "./HeaderNav";
import Sticky from "react-stickynode";

function HeaderComponent(props) {
  const {
    headerTitle,
    sidemenuToggle,
    getPathwayBy,
    getRunnerBy,
    pathway,
  } = props;
  const router = useRouter();

  useEffect(() => {
    getPathwayBy(router.query.pathwayId);
  }, [router.query.pathwayId]);

  useEffect(() => {
    getRunnerBy(router.query.runnerId, router.query.pathwayId);
  }, [router.query.runnerId, router.query.pathwayId]);

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
                <img
                  src="/images/logo.png"
                  alt="teaching path"
                  style={{ height: "40px" }}
                />
              </Header.Brand>
            </Header.Wrap>
            <Header.Wrap block justify="center">
              <div className="text-center">
                {pathway.pathwaySeleted && (
                  <h5>
                    {pathway.pathwaySeleted.name.toUpperCase()}
                    {pathway.pathwaySeleted.draft ? (
                      <Badge variant="label-info" className="ml-2">In draft</Badge>
                    ) : (
                      <Badge variant="label-success" className="ml-2">Published</Badge>
                    )}
                  </h5>
                )}
                {pathway.runnerSeleted && (
                  <h7 className="text-muted">{pathway.runnerSeleted.name}</h7>
                )}
              </div>
            </Header.Wrap>
            <Header.Wrap>
              <HeaderNav />

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
              <img
                src="/images/icon.png"
                alt="teaching path"
                style={{ height: "25px" }}
              />
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
    pathway: state.pathway,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { sidemenuToggle, getPathwayBy, getRunnerBy },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
