import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  FloatLabel,
} from "@panely/components";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Router from "next/router";
import Avatar from "react-avatar-edit";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
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

function PathwayForm({ onSave, data }) {
  const [image, setImage] = useState({
    preview: data?.image?.preview || "",
    src: "",
  });
  // Define Yup schema for form validation
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your name"),
    description: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your description"),
  });

  const { control, handleSubmit, errors } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      tags: data?.tags || "",
    },
  });

  const onClose = () => {
    setImage({ preview: null });
  };

  const onCrop = (preview) => {
    setImage({ preview });
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 71680) {
      toast.fire({
        icon: "error",
        title: "The image is very large",
      });
      elem.target.value = "";
    }
  };

  return (
    <Form onSubmit={handleSubmit((data) => {
      onSave({...data, image: image})
    })}>
      <Row>
        <Col xs="6">
          <Form.Group>
            <Avatar
              width={130}
              height={130}
              onCrop={onCrop}
              onClose={onClose}
              onBeforeFileLoad={onBeforeFileLoad}
              src={image.src}
              label={"Pathway icon"}
            />
          </Form.Group>
        </Col>
        <Col xs="6">
          <Form.Group>
            {image.preview && <img src={image.preview} alt="Preview" />}
          </Form.Group>
        </Col>
        <Col xs="12">
          {/* BEGIN Form Group */}
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="text"
                id="name"
                name="name"
                control={control}
                invalid={Boolean(errors.name)}
                placeholder="Insert your name"
              />
              <Label for="name">Name</Label>
              {errors.name && <Form.Feedback children={errors.name.message} />}
            </FloatLabel>
          </Form.Group>
          {/* END Form Group */}

          {/* BEGIN Form Group */}
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="textarea"
                id="description"
                name="description"
                control={control}
                invalid={Boolean(errors.description)}
                placeholder="Insert your description"
              />
              <Label for="description">Description</Label>
              {errors.description && (
                <Form.Feedback children={errors.description.message} />
              )}
            </FloatLabel>
          </Form.Group>
          {/* END Form Group */}

          {/* BEGIN Form Group */}
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="text"
                id="tags"
                name="tags"
                control={control}
                placeholder="Insert your tags separated by commas"
              />
              <Label for="tags">Tags</Label>
            </FloatLabel>
          </Form.Group>
          {/* END Form Group */}
        </Col>
      </Row>
      <Button type="submit" variant="primary">
        {data === null || data === undefined ? "Create" : "Update"}
      </Button>
      <Button
        type="button"
        className="ml-2"
        onClick={() => {
          Router.back();
        }}
      >
        Cancel
      </Button>
    </Form>
  );
}

export default PathwayForm;
