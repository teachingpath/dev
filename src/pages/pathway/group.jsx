import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  FloatLabel,
  Container,
  Portlet,
  CustomInput,
} from "@panely/components";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Swal from "@panely/sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
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
import { get, updateGroup } from "consumer/pathway";

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
      { text: "Groups" },
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
          <title>Groups | Update</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Groupos</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>Puede crear grupos para dividir el proceso de aprendizaje como grupo, y también crear grupos privados para un acompañamiento más personalizado.</p>
                  <hr />
                  <GroupForm
                    activityChange={this.props.activityChange}
                    pathwayId={this.state.id}
                    groups={this.state.groups}
                  />
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

function GroupForm({ pathwayId, groups, activityChange }) {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, errors } = useForm({
    defaultValues: {
      groups: groups || [],
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    updateGroup(pathwayId, data.groups)
      .then((docRef) => {
        toast.fire({
          icon: "success",
          title: "El grupo fue creado correctamente",
        });
        activityChange({
          pathwayId: pathwayId,
          type: "edit_pathway",
          msn: 'El grupo "' + data.name + '" fue actualizado o creado.',
        });
        setLoading(false);
      })
      .catch((error) => {
        toast.fire({
          icon: "error",
          title: "Actualizando grupo",
        });
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <FloatLabel>
          <Controller
            name={`groups`}
            control={control}
            render={({ onChange, onBlur, value, name, ref }) => (
              <FieldGroup
                data={value || {}}
                innerRef={ref}
                onBlur={onBlur}
                id="groups"
                name={"groups"}
                onChange={onChange}
              />
            )}
          />
          {errors.groups && <Form.Feedback children={errors.groups.message} />}
        </FloatLabel>
        <Button type="submit" variant="label-primary" size="lg" width="widest">
          {loading && <Spinner className="mr-2" />}
          Actualizar
        </Button>

        <Button
          variant="label-secondary"
          size="lg"
          type="button"
          className="ml-2"
          onClick={() => {
            Router.back();
          }}
        >
          Cancelar
        </Button>
      </Form.Group>
    </Form>
  );
}

function FieldGroup({ data, onChange }) {
  const [value, setValue] = useState(data);
  const { control } = useForm({
    defaultValues: {
      groups: data || [],
    },
  });
  const {
    fields: optionsFields,
    append: optionsAppend,
    remove: optionsRemove,
  } = useFieldArray({ control, name: "groups" });

  const onChangeContent = (index, data) => {
    if (!value[index]) {
      value[index] = data;
    }
    value[index] = { ...value[index], ...data, id: index };
    setValue(value);
    onChange(value);
  };

  return (
    <Form>
      {optionsFields.map((item, index) => {
        return (
          <Row key={item.id} className="pt-4">
            <Col xs="11">
              <Form.Group>
                <FloatLabel>
                  <Controller
                    id={`groups_${index}_.name`}
                    name={`groups[${index}].name`}
                    control={control}
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <Input
                        innerRef={ref}
                        type="text"
                        value={value || ""}
                        id={`groups_${index}_.name`}
                        name={`groups[${index}].name`}
                        onChange={onChange}
                        onBlur={onBlur}
                        onKeyUp={(data) => {
                          if (value?.name) {
                            onChangeContent(index, value);
                          } else {
                            onChangeContent(index, {
                              name: value,
                            });
                          }
                        }}
                      />
                    )}
                  />
                  <Label for={`groups_${index}_.name`}>Grupo#{index + 1}</Label>
                </FloatLabel>
              </Form.Group>
              <Form.Group>
                <FloatLabel>
                  <Controller
                    name={`groups[${index}].isPrivate`}
                    control={control}
                    render={({ onChange, onBlur, value, name, ref }) => {
                      const checked = item.isCorrect || value;
                      return (
                        <CustomInput
                          type={"checkbox"}
                          id={`groups_${index}_.isPrivate`}
                          label="¿Es privado el grupo?"
                          name={`groups[${index}].isPrivate`}
                          onChange={(e) => {
                            onChange(e.target.checked);
                            if (value?.isPrivate) {
                              onChangeContent(index, value);
                            } else {
                              onChangeContent(index, {
                                isPrivate: e.target.checked,
                              });
                            }
                          }}
                          checked={checked}
                          innerRef={ref}
                        />
                      );
                    }}
                  />
                </FloatLabel>
              </Form.Group>
            </Col>
            <Col xs="1">
              <Button
                type="button"
                onClick={() => {
                  optionsRemove(index);
                  delete value[index];
                  const dataValues = value.filter((d) => d);
                  setValue(dataValues);
                  onChange(dataValues);
                }}
              >
                <FontAwesomeIcon icon={SolidIcon.faTrash} />
              </Button>
            </Col>
          </Row>
        );
      })}

      <p className="text-right">
        <Button
          variant={"primary"}
          type="button"
          onClick={() => {
            optionsAppend({});
          }}
        >
          Agregar Grupo <FontAwesomeIcon icon={SolidIcon.faPlus} />
        </Button>
      </p>
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
