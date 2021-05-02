import { Form, Label, Input, Button, FloatLabel } from "@panely/components";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Router from "next/router";
import { useState } from "react";
import Spinner from "@panely/components/Spinner";

function RunnerForm({ onSave, data }) {
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your name"),
    description: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your description"),
    feedback: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your feedback"),
  });

  const { control, errors, handleSubmit, reset } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
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
            setLoading(false);
          } else {
            Router.back();
          }
        });
      })}
    >
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
            type="textarea"
            id="feedback"
            name="feedback"
            control={control}
            invalid={Boolean(errors.feedback)}
            placeholder="Insert your closure feddback"
          />
          <Label for="feedback">Closure feedback</Label>
          {errors.feedback && (
            <Form.Feedback children={errors.feedback.message} />
          )}
        </FloatLabel>
      </Form.Group>
      {/* END Form Group */}
      <Button
        disabled={loading}
        type="submit"
        variant="label-primary"
        size="lg"
        width="widest"
      >
        {loading && <Spinner className="mr-2"></Spinner>}
        {data === null || data === undefined ? "Create" : "Update"}
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
        Cancel
      </Button>
    </Form>
  );
}

export default RunnerForm;