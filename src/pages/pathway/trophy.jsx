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
import Router from "next/router";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
  pageShowAlert
} from "store/actions";
import withAuth from "components/firebase/firebaseWithAuth";
import withLayout from "components/layout/withLayout";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React, { useRef, useState } from "react";
import Head from "next/head";
import Spinner from "@panely/components/Spinner";
import { get, updateTrophy } from "consumer/pathway";


class FormBasePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      saved: false,
    };
  }
  componentDidMount() {
    const {pageShowAlert, pageChangeHeaderTitle, breadcrumbChange}  = this.props;

    if (!Router.query.pathwayId) {
      Router.push("/pathway/create");
    }
    pageChangeHeaderTitle("Actualizar");
    breadcrumbChange([
      { text: "Home", link: "/" },
      {
        text: "Pathway",
        link: "/pathway/edit?pathwayId=" + Router.query.pathwayId,
      },
      { text: "Trofeo" },
    ]);
    get(Router.query.pathwayId,(data) => {
        this.setState({ ...data });
      }, () => {
        pageShowAlert("Error obteniendo el trofeo", "error");
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
                    pageShowAlert={this.props.pageShowAlert}
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

function TrophyForm({ pathwayId, data, activityChange, pageShowAlert }) {
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
    
        pageShowAlert("El trofeo fue guardado correctamente.");
        activityChange({
          pathwayId: pathwayId,
          type: "edit_pathway",
          msn: 'El trofeo "' + data.name + '" fue cambiado.',
        });
        setLoading(false);
      })
      .catch((error) => {
        pageShowAlert("Error al actualizar.", "error");
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
        <ImageEditor ref={imageRef} image={data?.image}  />
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
              ¿Qué logros obtendría el aprendiz?
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
    { pageChangeHeaderTitle, breadcrumbChange, activityChange, pageShowAlert },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(FormBasePage)));
