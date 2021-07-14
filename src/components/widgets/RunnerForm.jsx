import { Form, Label, Input, Button, FloatLabel } from "@panely/components";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Router from "next/router";
import { useState } from "react";
import Spinner from "@panely/components/Spinner";
import Quill from "@panely/quill";

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
      .required("Por favor, ingrese el nombre del runner"),
    description: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor, ingrese la descripción del runner")
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
          <Form.Text>Escriba un resumen o feedback para que el aprendiz sepa lo que aprendió después de completar el Runner.</Form.Text>
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
          Router.back();
        }}
      >
        Cancelar
      </Button>
    </Form>
  );
}

export default RunnerForm;
