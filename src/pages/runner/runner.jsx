import { Form, Label, Input, Button, FloatLabel } from "@panely/components";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Router from "next/router";

function RunnerForm({ onSave, data }) {
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
  return (
    <Form
      onSubmit={handleSubmit((data) => {
        onSave(data).then(() => {
          reset();
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
      <Button type="submit" variant="primary" className="ml-2">
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

export default RunnerForm;
