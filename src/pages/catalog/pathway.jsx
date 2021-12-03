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
  pageShowAlert,
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
import { getUser } from "consumer/user";
import { firebaseClient } from "components/firebase/firebaseClient";

class PathwayPage extends React.Component {
  state = {
    name: "Cargando...",
    id: null,
    draft: null,
  };
  constructor(props) {
    super(props);
    this.runnersRef = React.createRef();
  }

  componentDidMount() {
    if (!Router.query.id) {
      Router.push("/catalog");
    }
    const { pageShowAlert } = this.props;
    get(Router.query.id, async(data) => {
        this.setState(data);
        const currentUser  = firebaseClient.auth().currentUser;
        if(currentUser){
          const user = await getUser(currentUser.uid);
          if(user){
            this.setState({
              ...this.state,
              user: {...user.data, uid: user.id}
            });
          }
         
        }
       
      },
      () => {
        pageShowAlert("Existe un problema al consultar el pathway", "error");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    );
  }

  render() {
    const { name, id, leaderId, draft, isFollowUp } = this.state;
    return (
      <Widget1>
        <Widget1.Display top size="lg" className="bg-dark text-white">
          {(draft === false) && (
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
              <h1 className="display-5">{name.toUpperCase()}</h1>
              <Badge variant="outline-light" className="mr-1">
                <FontAwesomeIcon
                  className="mr-2"
                  icon={SolidIcon.faHiking}
                />
                {
                  {
                    beginner: "Nivel: Principiante",
                    middle: "Nivel: Intermedio",
                    advanced: "Nivel: Avanzado",
                  }[this.state.level]
                }
              </Badge>
              <Badge variant="outline-light" className="mr-1">
                <FontAwesomeIcon
                  className="mr-2"
                  icon={!isFollowUp ? SolidIcon.faEyeSlash : SolidIcon.faEye}
                />
                {isFollowUp ? "Con seguimiento": "Sin seguimiento"}
              </Badge>
            </Widget1.DialogContent>
          </Widget1.Dialog>
          {draft === false && <DisplayTrophy trophy={this.state.trophy} />}
          {draft === true && <Badge>Aún no esta disponible este Pathway</Badge>}
        </Widget1.Display>
        <Widget1.Body className="pt-5">
          <Portlet className="mt-4">
            <Portlet.Body>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state?.longDescription,
                }}
              />
            </Portlet.Body>
            <Portlet.Header>
              <Portlet.Icon>
                <FontAwesomeIcon icon={SolidIcon.faRoute} />
              </Portlet.Icon>
              <Portlet.Title>Rutas</Portlet.Title>
            </Portlet.Header>
            <Portlet.Body>
              {id && (
                <>
                  <RunnerTab ref={this.runnersRef} pathwayId={this.state.id} />
                </>
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
          <Row portletFill="xl" style={{margin: "-15px"}}>
            <Col xl="12">
              <PathwayPage
                activityChange={this.props.activityChange}
                pageShowAlert={this.props.pageShowAlert}
              />
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
