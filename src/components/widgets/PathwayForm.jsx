import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  FloatLabel,
  ImageEditor,
} from "@panely/components";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Router from "next/router";
import Spinner from "@panely/components/Spinner";

function PathwayForm({ onSave, data }) {
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);
  const isNew = data === null || data === undefined;
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor, escriba el nombre"),
    description: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor, escriba la descripción"),
  });
  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      tags: data?.tags ? data?.tags.join(",") : "",
    },
  });

  return (
    <Form
      onSubmit={handleSubmit((data) => {
        setLoading(true);
        imageRef.current.getImage().then((url) => {
          onSave({ ...data, image: url }).then(() => {
            if (isNew) {
              reset();
            }
            setLoading(false);
          });
        });
      })}
    >
      <Form.Group>
        <ImageEditor
          ref={imageRef}
          image={data?.image}
          width={360}
          height={180}
        />
      </Form.Group>
      <Row>
        <Col xs="12">
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="text"
                id="name"
                name="name"
                control={control}
                invalid={Boolean(errors.name)}
                placeholder="Ingrese el nombre del pathway"
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
                placeholder="Ingrese la descripción"
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
                as={Input}
                type="text"
                id="tags"
                name="tags"
                control={control}
                placeholder="Inserta tus etiquetas separadas por comas"
              />
              <Label for="tags">Tags</Label>
            </FloatLabel>
            <Form.Text>Separa las etiquetas con comas.</Form.Text>
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
        {isNew ? "Crear" : "Actualizar"}
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

export default PathwayForm;
