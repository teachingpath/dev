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
  Dropdown,
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
import withAuth from "components/firebase/firebaseWithAuth";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import React, { useRef, useState } from "react";
import Spinner from "@panely/components/Spinner";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { updateBadge, getQuestions } from "consumer/runner";

const ReactSwal = swalContent(Swal);
const alert = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

function BadgeForm({ runnerId, data, activityChange, pathwayId, pageShowAlert}) {
  const { badge } = data;
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
      name: badge?.name || "",
      description: badge?.description || "",
    },
  });

  function saveBadge(data) {
    return updateBadge(runnerId, data)
      .then((docRef) => {
        pageShowAlert("El emblema fue guardado correctamente");
        activityChange({
          pathwayId: pathwayId,
          type: "edit_runner",
          msn: 'El emblema "' + data.name + '" fue creado o actualizado.',
        });
        setLoading(false);
      })
      .catch((error) => {
        pageShowAlert("Error al crear el emblema", "error");
        setLoading(false);
      });
  }

  const onSubmit = (data) => {
    getQuestions(runnerId).then((questions) => {
      if (questions.length >= 3) {
        saveBadge(data);
      } else {
        alert.fire({
          icon: "error",
          title: "Oops...",
          text: "Para crear el emblema debe haber un quiz con más de 3 preguntas.",
        });
        setLoading(false);
      }
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
        <ImageEditor ref={imageRef} image={badge?.image}  />
      </Form.Group>
      <Row>
        <Col xs="12">
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="text"
                id="badge-name"
                name="name"
                control={control}
                invalid={Boolean(errors.name)}
                placeholder="Ingrese un nombre"
              />
              <Label for="badge-name">Nombre</Label>
              {errors.name && <Form.Feedback children={errors.name.message} />}
            </FloatLabel>
          </Form.Group>
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="textarea"
                id="badge-description"
                name="description"
                control={control}
                invalid={Boolean(errors.description)}
                placeholder="Ingrese una descripción"
              />
              <Label for="badge-description">
                ¿Qué logros obtendría el aprendiz?
              </Label>
              {errors.description && (
                <Form.Feedback children={errors.description.message} />
              )}
              <Form.Text>Especifica una lista de logros.</Form.Text>
            </FloatLabel>
          </Form.Group>
        </Col>
      </Row>
      <Button type="submit" variant="label-primary" size="lg" width="widest">
        {loading && <Spinner className="mr-2" />} Save
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

class FormBasePage extends React.Component {
  constructor(props) {
    super(props);
    if (!Router.query.runnerId) {
      Router.push("/pathway/create");
    }
    this.state = {
      ...props.runner,
      runnerId: Router.query.runnerId,
      pathwayId: Router.query.pathwayId,
    };
  }

  componentDidMount() {
    const { pathwayId } = this.state;
    this.props.pageChangeHeaderTitle("Actualizar");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      {
        text: "Pathway",
        link: "/pathway/edit?pathwayId=" + pathwayId,
      },
      {
        text: "Runner",
        link: "/runner/edit?pathwayId=" + Router.query.pathwayId+"&runnerId="+Router.query.runnerId,
      },
      { text: "Emblema" },
    ]);
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Runner | Badge</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Emblema | Editar</Portlet.Title>
                  <Portlet.Addon>
                    <BadgeAddon
                      id={this.state.runnerId}
                      pathwayId={this.state.pathwayId}
                    />
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                  Este emblema se otorga al aprendiz si tiene éxito
                     al completar el Quiz. <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://docs.teachingpath.info/concepts/runner#badges"
                    >
                      Ver más información
                    </a>{" "}
                  </p>
                  <hr />
                  {this.props?.runner?.id && <BadgeForm
                    activityChange={this.props.activityChange}
                    pageShowAlert={this.props.pageShowAlert}
                    runnerId={this.state.runnerId}
                    pathwayId={this.state.pathwayId}
                    data={this.props?.runner}
                  />}
                </Portlet.Body>
                <Portlet.Footer>
                 
                 <Button
                   type="button"
                   className="float-right mr-2"
                   onClick={() => {
                     Router.push({
                       pathname: "/runner/quiz/create",
                       query: {
                         runnerId: this.props?.runner.runnerId,
                         pathwayId: this.props?.runner.pathwayId,
                       },
                     });
                   }}
                 >
                   Agregar Quiz
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

const BadgeAddon = ({ id, pathwayId }) => {
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
                pathname: "/runner/quiz/create",
                query: {
                  runnerId: id,
                  pathwayId: pathwayId,
                },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faQuestion} />}
          >
            Agregar Quiz
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
    </>
  );
};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange, pageShowAlert},
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    runner: state.pathway.runnerSeleted,
  };
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withAuth(withLayout(FormBasePage)));
