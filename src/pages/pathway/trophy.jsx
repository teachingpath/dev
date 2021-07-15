import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  FloatLabel,
  ImageEditor,
  Container,
  Portlet,
} from "@panely/components";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Swal from "@panely/sweetalert2";
import Router from "next/router";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import withAuth from "components/firebase/firebaseWithAuth";
import withLayout from "components/layout/withLayout";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import swalContent from "sweetalert2-react-content";
import React, { useRef, useState } from "react";
import Head from "next/head";
import Spinner from "@panely/components/Spinner";
import { get, updateTrophy } from "consumer/pathway";

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

    this.state = {
      id: null,
      saved: false,
    };
  }
  componentDidMount() {
    if (!Router.query.pathwayId) {
      Router.push("/pathway/create");
    }
    this.props.pageChangeHeaderTitle("Actualizar");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      {
        text: "Pathway",
        link: "/pathway/edit?pathwayId=" + Router.query.pathwayId,
      },
      { text: "Trofeo" },
    ]);
    get(
      Router.query.pathwayId,
      (data) => {
        this.setState({ ...data });
      },
      () => {
        toast.fire({
          icon: "error",
          title: "Getting a pathway",
        });
      }
    );
  }

  render() {
    if (!this.state.saved) {
      return <Spinner>Loading</Spinner>;
    }

    return (
      <React.Fragment>
        <Head>
          <title>Trophy | Update</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Trophy</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>Este es el trofeo que que conseguirá el aprendiz al finalizar el pathway. </p>
                  <hr />
                  <TrophyForm
                    activityChange={this.props.activityChange}
                    pathwayId={this.state.id}
                    data={this.state.trophy}
                  />
                </Portlet.Body>
              </Portlet>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

function TrophyForm({ pathwayId, data, activityChange }) {
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor, ingrese un nombre"),
    description: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor, ingrese una descripción"),
  });

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
    },
  });

  const onSubmit = (data) => {
    updateTrophy(pathwayId, data)
      .then((docRef) => {
        toast.fire({
          icon: "success",
          title: "El trofeo fue guardado correctamente.",
        });
        activityChange({
          pathwayId: pathwayId,
          type: "edit_pathway",
          msn: 'El trofeo "' + data.name + '" fue cambiado.',
        });
        setLoading(false);
      })
      .catch((error) => {
        toast.fire({
          icon: "error",
          title: "Updating trophy",
        });
        setLoading(false);
      });
  };

  return (
    <Form
      onSubmit={handleSubmit((data) => {
        setLoading(true);
        imageRef.current.getImage().then((url) => {
          onSubmit({ ...data, image: url });
        });
      })}
    >
      <Form.Group>
        <ImageEditor ref={imageRef} image={data?.image} withPreview />
      </Form.Group>
      <Row>
        <Col xs="12">
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="text"
                id="trophy-name"
                name="name"
                control={control}
                invalid={Boolean(errors.name)}
                placeholder="Ingrese un nombre"
              />
              <Label for="trophy-name">Nombre</Label>
              {errors.name && <Form.Feedback children={errors.name.message} />}
            </FloatLabel>
          </Form.Group>
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="textarea"
                id="trophy-description"
                name="description"
                control={control}
                invalid={Boolean(errors.description)}
                placeholder="Ingrese una descripción"
              />
              <Label for="trophy-description">
              ¿Qué logotipos obtendría el aprendiz?
              </Label>
              {errors.description && (
                <Form.Feedback children={errors.description.message} />
              )}
              <Form.Text>Especifique una lista de logros.</Form.Text>
            </FloatLabel>
          </Form.Group>
        </Col>
      </Row>
      <Button
        disabled={loading}
        type="submit"
        variant="label-primary"
        size="lg"
        width="widest"
      >
        {loading && <Spinner className="mr-2" />}
        {data === null || data === undefined ? "Guardar" : "Actualizar"}
      </Button>
      <Button
        type="button"
        className="ml-2"
        variant="label-secondary"
        size="lg"
        width="widest"
        onClick={() => {
          Router.back();
        }}
      >
        Cancelar
      </Button>
    </Form>
  );
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
)(withAuth(withLayout(FormBasePage)));
