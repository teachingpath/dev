import {
  Row,
  Col,
  Container,
  Portlet,
  Widget1,
  Badge,
} from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
  pageShowAlert
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import Router from "next/router";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import StartPathway from "components/widgets/StartPathway";
import Teacher from "components/widgets/Teacher";
import RunnerTab from "components/widgets/RunnerTab";
import { get } from "consumer/pathway";
import DisplayTrophy from "components/widgets/DisplayTrophy";

class PathwayPage extends React.Component {
  state = {
    name: "Cargando...",
    id: null,
    draft: true,
  };
  constructor(props) {
    super(props);
    this.runnersRef = React.createRef();
  }

  componentDidMount() {
    if (!Router.query.id) {
      Router.push("/catalog");
    }
    const {pageShowAlert} = this.props
    get(Router.query.id,(data) => {
        this.setState(data);
      },  () => {
        pageShowAlert("Existe un problema al consultar el pathway", "error");
      }
    );
  }

  render() {
    const { name, id, leaderId, draft } = this.state;
    return (
      <Widget1>
        <Widget1.Display top size="lg" className="bg-dark text-white">
          {draft === false && (
            <StartPathway
              pathwayId={id}
              {...this.state}
              activityChange={this.props.activityChange}
              pageShowAlert={this.props.pageShowAlert}
              runnersRef={this.runnersRef}
            />
          )}
          <Widget1.Dialog>
            <Widget1.DialogContent>
              <h1 className="display-5" children={name.toUpperCase()} />
            </Widget1.DialogContent>
          </Widget1.Dialog>
          {draft === false && (
            <DisplayTrophy trophy={this.state.trophy} />
          )}
          {draft === true && <Badge>Aún no esta disponible este Pathway</Badge>}
        </Widget1.Display>
        <Widget1.Body className="pt-5">
          <Portlet className="mt-4">
            <Portlet.Header>
              <Portlet.Icon>
                <FontAwesomeIcon icon={SolidIcon.faRoute} />
              </Portlet.Icon>
              <Portlet.Title>Runners</Portlet.Title>
            </Portlet.Header>
            <Portlet.Body>
              {id && (
                <RunnerTab ref={this.runnersRef} pathwayId={this.state.id} />
              )}
            </Portlet.Body>
            <Portlet.Footer>
              <Col md="6">{leaderId && <Teacher leaderId={leaderId} />}</Col>
            </Portlet.Footer>
          </Portlet>
        </Widget1.Body>
      </Widget1>
    );
  }
}

class PathwayGeneralPage extends React.Component {
  componentDidMount() {
    this.props.pageChangeHeaderTitle("Pathway");
    this.props.breadcrumbChange([
      { text: "Catálogo", link: "/catalog" },
      { text: "Pathway" },
    ]);
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | Teaching Path</title>
          <script src="/script.js"></script>
        </Head>
        <Container fluid>
          <Row portletFill="xl">
            <Col xl="12">
              <PathwayPage activityChange={this.props.activityChange} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange, pageShowAlert },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withLayout(PathwayGeneralPage, "public"));
