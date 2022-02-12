import {
  Row,
  Col,
  Container,
  Portlet,
} from "@panely/components";
import Router from "next/router";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  pageShowAlert
} from "store/actions";
import { Avatar, Button, RichList, Widget1 } from "@panely/components"
import Link from "next/link"
import withAuth from "components/firebase/firebaseWithAuth";
import withLayout from "components/layout/withLayout";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React, {  useState } from "react";
import Head from "next/head";
import { getUser } from "consumer/user";
import ActivitiesComponent from "components/widgets/Activities";



class UserPage extends React.Component {
  state = {id: null}
  componentDidMount() {
    if (!Router.query.uid) {
      Router.push("/");
    }
    this.props.pageChangeHeaderTitle("Perfil");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      { text: "Usuario" },
    ]);
    getUser(Router.query.uid).then(({ data, id }) => {
      if (data) {
        console.log(data);
        this.setState({ data: data, id: id });
        this.props.pageChangeHeaderTitle(
          data.firstName.toUpperCase() || "Perfil"
        );
      } else {
        console.log("No found user");
      }
    });
    
  }

  render() {


    return (
      <React.Fragment>
        <Head>
          <title>Usario | Profile</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Perfil de Usuario</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                 {this.state.id && <UserComponent {...this.state}></UserComponent>} 
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {this.state.id && (
                <ActivitiesComponent
                  firebase={{
                    user_id: this.state.id,
                  }}
                />
              )}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}


class UserComponent extends React.Component {
  state = {
    image: "/images/avatar/blank.webp",
    name: "Jackson Bradshaw",
    detail: "Office Manage, San Francisco",
    feed: () => (
      <React.Fragment>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </React.Fragment>
    ),
    link: "#",
    count: 32
  }

  render() {
    const { image, detail, feed: Feed, link, count } = this.state
    const user = this.props.data;
    return (
      <Widget1>
        <Widget1.Display top size="sm" className="justify-content-between bg-primary text-white">
          <Widget1.Group>
            <Widget1.Addon>
              <Button variant="label-light">{user.profile.toUpperCase()}</Button>
            </Widget1.Addon>
          </Widget1.Group>
          <Widget1.Group>
            <Widget1.Title>{user.firstName}</Widget1.Title>
          </Widget1.Group>
        </Widget1.Display>
        <Widget1.Body>
          {/* BEGIN Rich List */}
          <RichList.Item className="mx-0">
            <RichList.Addon addonType="prepend" >
              <img src={user.image} className="float-left mr-3  avatar-circle"></img>
            </RichList.Addon>
            <RichList.Content>
              <RichList.Title children={<h3>{user.firstName} {user.lastName}</h3>} />
              <RichList.Subtitle children={user.specialty} />
            </RichList.Content>
            <RichList.Addon addonType="append" className="d-flex flex-column">
              <h3 className="font-weight-bolder mb-0" children={user.point} />
              <small className="text-muted">Puntos</small>
            </RichList.Addon>
          </RichList.Item>
          {/* END Rich List */}
          <p className="text-level-1 text-justify">
            {user.bio}
          </p>
         
        </Widget1.Body>
      </Widget1>
    )
  }
}


function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, pageShowAlert },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withLayout(UserPage));


