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
import { firestoreClient } from "components/firebase/firebaseClient";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import { useRef } from "react";

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

function TrophyForm({ pathwayId, saved, data, activityChange }) {
  const imageRef = useRef(null);

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
    points: yup
      .number()
      .min(100, "Please enter at least 10 points")
      .required("Please enter your points"),
  });

  const { control, handleSubmit, errors } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      points: data?.points || 100,
    },
  });

  // Handle form submit event
  const onSubmit = (data) => {
    firestoreClient
      .collection("pathways")
      .doc(pathwayId)
      .update({
        trophy: {
          ...data,
        },
      })
      .then((docRef) => {
        toast.fire({
          icon: "success",
          title: "Trophy saved successfully",
        });
        activityChange({
          pathwayId: pathwayId,
          type: "edit_pathway",
          msn: 'The "' + data.name + '" trophy was changed.',
        });
      })
      .catch((error) => {
        toast.fire({
          icon: "error",
          title: "Updating trophy",
        });
      });
  };

  return (
    <Form
      onSubmit={handleSubmit((data) => {
        imageRef.current.getImage().then((url) => {
          onSubmit({ ...data, image: url });
        });
      })}
    >
      <Form.Group>
        <ImageEditor ref={imageRef} image={data?.image} />
      </Form.Group>
      <Row>
        <Col xs="12">
          {/* BEGIN Form Group */}

          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="text"
                id="trophy-name"
                name="name"
                control={control}
                invalid={Boolean(errors.name)}
                placeholder="Insert your name"
              />
              <Label for="trophy-name">Name</Label>
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
                id="trophy-description"
                name="description"
                control={control}
                invalid={Boolean(errors.description)}
                placeholder="Insert your description"
              />
              <Label for="trophy-description">Description</Label>
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
                type="number"
                id="trophy-points"
                name="points"
                control={control}
                invalid={Boolean(errors.points)}
                placeholder="Insert your points"
              />
              <Label for="trophy-points">Points</Label>
              {errors.points && (
                <Form.Feedback children={errors.points.message} />
              )}
            </FloatLabel>
          </Form.Group>
          {/* END Form Group */}
        </Col>
      </Row>
      <Button type="submit" variant="primary" disabled={!saved}>
        {data === null || data === undefined ? "Add" : "Update"}
      </Button>
    </Form>
  );
}

export default TrophyForm;
