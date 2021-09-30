import {
  Container,
  Row,
  Col,
  Button,
  Portlet,
  Dropdown,
} from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
  loadPathway,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import RunnerList from "../../components/widgets/RunnerList";
import PathwayForm from "../../components/widgets/PathwayForm";
import Spinner from "@panely/components/Spinner";
import React from "react";
import { update, updateFollowUp } from "consumer/pathway";

const ReactSwal = swalContent(Swal);
const toast = ReactSwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", ReactSwal.stopTimer);
    toast.addEventListener("mouseleave", ReactSwal.resumeTimer);
  },
});

class FormBasePage extends React.Component {
  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
    this.toggleFollowUp = this.toggleFollowUp.bind(this);
  }

  componentDidMount() {
    if (!Router.query.pathwayId) {
      Router.push("/pathway/create");
    }
    this.props.pageChangeHeaderTitle("Actualizar");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      { text: "Pathway" },
    ]);
  }  


  toggleFollowUp(){
    const pathway = this.state || this.props.pathway;
    updateFollowUp(pathway.id, !pathway?.isFollowUp).then(() => {
      this.setState({
        ...this.state,
        isFollowUp: !pathway?.isFollowUp
      });
    })
  }

  onEdit(data) {
    const pathway = this.state || this.props.pathway;
    return update(pathway.id, data)
      .then((response) => {
        toast.fire({
          icon: "success",
          title: "Pathway actualizado correctamente",
        });
        this.props.loadPathway({
          pathwayId: pathway.id,
          ...response,
        });
        this.props.activityChange({
          pathwayId: pathway.id,
          type: "edit_pathway",
          msn: 'El pathway "' + data.name + '"  fue cambiado.',
          ...response,
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.fire({
          icon: "error",
          title: "Actualizado el pathway",
        });
      });
  }

  render() {
    const pathway = this.state || this.props.pathway;
    if (!pathway?.id) {
      return <Spinner>Cargando...</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | Edit</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="4">
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Pathway | Editar</Portlet.Title>
                  <Portlet.Addon>
                    <PathwayAddon id={pathway.id}  
                    toggleFollowUp={this.toggleFollowUp}  
                    isFollowUp={pathway.isFollowUp}/>
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <PathwayForm
                    onSave={this.onEdit}
                    pathwayId={pathway.id}
                    saved={pathway.saved}
                    data={pathway}
                  />
                </Portlet.Body>
                <Portlet.Footer>
                  <Button
                    type="button"
                    className="float-right mr-2"
                    onClick={() => {
                      Router.push({
                        pathname: "/pathway/trophy",
                        query: { pathwayId: pathway.id },
                      });
                    }}
                  >
                    Agregar Trofeo
                    <FontAwesomeIcon className="ml-2" icon={SolidIcon.faPlus} />
                  </Button>
                </Portlet.Footer>
              </Portlet>
            </Col>
            <Col md="8">
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Runners</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <RunnerList pathwayId={pathway.id} />
                </Portlet.Body>
                <Portlet.Footer>
                  <Button
                    type="button"
                    className="float-right"
                    disabled={!pathway.saved}
                    onClick={() => {
                      Router.push({
                        pathname: "/runner/create",
                        query: { pathwayId: pathway.id },
                      });
                    }}
                  >
                    Agregar Runner
                    <FontAwesomeIcon className="ml-2" icon={SolidIcon.faPlus} />
                  </Button>
                </Portlet.Footer>
              </Portlet>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const PathwayAddon = ({ id, toggleFollowUp,  isFollowUp}) => {
  return (
    <>
      <Dropdown.Uncontrolled>
        <Dropdown.Toggle icon variant="text-secondary">
          <FontAwesomeIcon icon={SolidIcon.faEllipsisV} />
        </Dropdown.Toggle>
        <Dropdown.Menu right animated>
          <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/runner/create",
                query: { pathwayId: id },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faRunning} />}
          >
            Agregar Runner
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/pathway/trophy",
                query: { pathwayId: id },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faTrophy} />}
          >
            Agregar Trofeo
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/pathway/group",
                query: { pathwayId: id },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faObjectGroup} />}
          >
            Agregar Sala
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              toggleFollowUp();
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faEye} />}
          >
            {isFollowUp?"Quita":"Hacer"} Seguimiento
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/catalog/pathway",
                query: {
                  id: id,
                },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faBook} />}
          >
            Vista Previa
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
    </>
  );
};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, loadPathway, activityChange },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    pathway: state.pathway.pathwaySeleted,
  };
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withAuth(withLayout(FormBasePage)));
