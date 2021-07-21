import { Container, Row, Col, Button, Portlet } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
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
import PathwayForm from "../../components/widgets/PathwayForm";
import Alert from "@panely/components/Alert";
import { create } from "consumer/pathway";

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

class PathwayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      saved: false,
    };
    this.onCreate = this.onCreate.bind(this);
  }
  componentDidMount() {
    this.props.pageChangeHeaderTitle("Nuevo");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      { text: "Pathway" },
    ]);
  }

  onCreate(data) {
    return create(data)
      .then((docRef) => {
        this.setState({
          id: docRef.id,
          saved: true,
          ...data,
        });
        toast.fire({
          icon: "success",
          title: "Pathway guadardo correctamente",
        });
        this.props.activityChange({
          pathwayId: docRef.id,
          type: "new_pathway",
          msn: 'El pathway "' + data.name + '"  fue creado.',
          ...data,
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.fire({
          icon: "error",
          title: "Creando el pathway",
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | Create</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Pathway | Crear</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <div>
                  Después de crear el Pathway, debe crear los Runners para
                     agreguar los tracks de aprendizaje. <a target="_blank" rel="noopener noreferrer" href="https://docs.teachingpath.info/concepts/pathway">Ver más información</a> acerca de los pathways
                  </div>
                  <hr />
                  <PathwayForm
                    onSave={this.onCreate}
                    pathwayId={this.state.id}
                  />
                </Portlet.Body>
                <Portlet.Footer>
                  {this.state.saved && (
                    <Alert
                      variant="outline-info"
                      icon={<FontAwesomeIcon icon={SolidIcon.faInfoCircle} />}
                    >
                    <p>Agrega el trofeo o runner del pathway creado.</p>
                      <Button
                        type="button"
                        disabled={!this.state.saved}
                        className="float-right"
                        onClick={() => {
                          Router.push({
                            pathname: "/runner/create",
                            query: { pathwayId: this.state.id },
                          });
                        }}
                      >
                        Agregar Runner
                        <FontAwesomeIcon
                          className="ml-2"
                          icon={SolidIcon.faPlus}
                        />
                      </Button>
                      <Button
                        type="button"
                        disabled={!this.state.saved}
                        className="float-right mr-2"
                        onClick={() => {
                          Router.push({
                            pathname: "/pathway/trophy",
                            query: { pathwayId: this.state.id },
                          });
                        }}
                      >
                        Agregar Trafeo
                        <FontAwesomeIcon
                          className="ml-2"
                          icon={SolidIcon.faPlus}
                        />
                      </Button>
                    </Alert>
                  )}
                </Portlet.Footer>
              </Portlet>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(PathwayPage)));
