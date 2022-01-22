import { Form, Row, Col, Label, Input, Button, FloatLabel } from "@panely/components";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Router from "next/router";
import { useState } from "react";
import Spinner from "@panely/components/Spinner";
import Quill from "@panely/quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

const modulesBasic = {
  toolbar: [
    ["bold", "italic"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

function RunnerForm({ onSave, data }) {
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor, ingrese el nombre de la ruta"),
    description: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor, ingrese la descripción de la ruta"),
  });

  const { control, errors, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      feedback: data?.feedback || "",
    },
  });
  const isNew = !data || Object.keys(data).length === 0;

  return (
    <Form
      onSubmit={handleSubmit((data) => {
        setLoading(true);
        onSave(data).then(() => {
          if (isNew) {
            reset();
          }
          setLoading(false);
        });
      })}
    >
      <Form.Group>
        <FloatLabel>
          <Controller
            as={Input}
            type="text"
            id="name"
            name="name"
            control={control}
            invalid={Boolean(errors.name)}
            placeholder="Ingrese un nombre"
          />
          <Label for="name">Nombre</Label>
          {errors.name && <Form.Feedback children={errors.name.message} />}
        </FloatLabel>
      </Form.Group>
      <Form.Group>
        <FloatLabel>
          <Controller
            as={Input}
            type="textarea"
            id="description"
            name="description"
            control={control}
            invalid={Boolean(errors.description)}
            placeholder="Ingrese una descripción"
          />
          <Label for="description">Descripción</Label>
          {errors.description && (
            <Form.Feedback children={errors.description.message} />
          )}
        </FloatLabel>
      </Form.Group>
      <Form.Group>
        <FloatLabel>
          <Controller
            name={`tracks`}
            control={control}
            render={({ onChange, onBlur, value, name, ref }) => (
              <FieldGroup
                data={value || {}}
                innerRef={ref}
                onBlur={onBlur}
                id="tracks"
                name={"tracks"}
                onChange={onChange}
              />
            )}
          />
          {errors.groups && <Form.Feedback children={errors.groups.message} />}
        </FloatLabel>
      </Form.Group>
      <Form.Group>
        <FloatLabel>
          <Controller
            name={`feedback`}
            control={control}
            render={({ onChange, onBlur, value, name, ref }) => (
              <Quill
                innerRef={ref}
                onBlur={onBlur}
                theme="snow"
                value={value}
                id="feedback"
                name={"feedback"}
                placeholder="Ingrese un Resumen/Feedback"
                modules={modulesBasic}
                onChange={onChange}
                style={{ minHeight: "15rem" }}
              />
            )}
          />
          <Label for="feedback">Resumen/feedback</Label>
          <Form.Text>
            Escriba un resumen o feedback para que el aprendiz sepa lo que
            aprendió después de completar la Ruta.
          </Form.Text>
          {errors.feedback && (
            <Form.Feedback children={errors.feedback.message} />
          )}
        </FloatLabel>
      </Form.Group>
      <Button
        disabled={loading}
        type="submit"
        variant="label-primary"
        size="lg"
        width="widest"
      >
        {loading && <Spinner className="mr-2"></Spinner>}
        {data === null || data === undefined ? "Crear" : "Actualizar"}
      </Button>
      <Button
        type="button"
        variant="label-secondary"
        className="ml-2"
        size="lg"
        onClick={() => {
          if(data?.pathwayId){
            Router.replace({
              pathname: "/runner/create",
              query: {
                pathwayId: data?.pathwayId,
              },
            });
          } else {
            Router.replace("/");
          }
          
        }}
      >
        Cancelar
      </Button>
    </Form>
  );
}

function FieldGroup({ data, onChange }) {
  const [value, setValue] = useState(data);
  const { control } = useForm({
    defaultValues: {
      tracks: [],
    },
  });
  const {
    fields: optionsFields,
    append: optionsAppend,
    remove: optionsRemove,
  } = useFieldArray({ control, name: "tracks" });

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
                    id={`tracks_${index}_.name`}
                    name={`tracks[${index}].name`}
                    control={control}
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <Input
                        innerRef={ref}
                        type="text"
                        value={value || ""}
                        id={`tracks_${index}_.name`}
                        name={`tracks[${index}].name`}
                        placeholder="Ingrese el nombre de la lección"
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
                  <Label for={`groups_${index}_.name`}>
                    Lección#{index + 1}
                  </Label>
                </FloatLabel>
              </Form.Group>
            </Col>
            <Col xs="1">
              <Button
                type="button"
                onClick={() => {
                  optionsRemove(index);
                  delete value[index];
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
          Agregar Lección <FontAwesomeIcon icon={SolidIcon.faPlus} />
        </Button>
      </p>
    </Form>
  );
}

export default RunnerForm;
