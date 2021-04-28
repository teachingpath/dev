import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Portlet,
  FloatLabel,
  Badge,
  CustomInput,
  Dropdown,
  Avatar,
  Alert,
} from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers";
import { useState } from "react";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import Router from "next/router";

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

function QuizForm({ runnerId, pathwayId, saved, data, activityChange }) {
  const [listQuestions, setListQuestions] = useState(data);

  const schema = yup.object().shape({
    question: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your question"),
    type: yup.string().required("Please enter your type"),
    options: yup
      .array()
      .min(2, "Please enter at least 2 options")
      .required("Please enter your options"),
  });

  const { control, handleSubmit, errors, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      question: "",
      type: "",
      options: [],
    },
  });

  const {
    fields: optionsFields,
    append: optionsAppend,
    remove: optionsRemove,
  } = useFieldArray({ control, name: "options" });

  const refesh = () => {
    const runnersDb = firestoreClient.collection("runners").doc(runnerId);
    return runnersDb
      .collection("questions")
      .get()
      .then((querySnapshot) => {
        const questions = [];
        querySnapshot.forEach((doc) => {
          questions.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setListQuestions(questions);
      });
  };

  // Handle form submit event
  const onSubmit = (data) => {
    const db = firestoreClient.collection("runners").doc(runnerId);
    if (data.id) {
      update(db, data, () => {
        toast.fire({
          icon: "success",
          title: "Question saved successfully",
        });
        setValue("id", null);
        activityChange({
          pathwayId: pathwayId,
          type: "edit_question",
          msn: "The  question created.",
        });
        reset();
        return refesh();
      });
    } else {
      create(db, data, () => {
        toast.fire({
          icon: "success",
          title: "Question saved successfully",
        });
        activityChange({
          pathwayId: pathwayId,
          type: "new_question",
          msn: "The  question updated.",
        });
        reset();
        return refesh();
      });
    }
  };

  const onDelete = (id) => {
    const db = firestoreClient.collection("runners").doc(runnerId);
    remove(db, id, () => {
      activityChange({
        pathwayId: pathwayId,
        type: "delete_question",
        msn: "The question deleted.",
      });
      return refesh();
    });
  };

  const onEdit = (data) => {
    setValue("question", data.question);
    setValue("type", data.type);
    setValue("id", data.id);
    setValue("options", data.options);
  };

  return (
    <>
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faQuestion} />
          </Portlet.Icon>
          <Portlet.Title>Quiz</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Dropdown */}
            <Dropdown.Uncontrolled>
              <Badge className="mr-2">Questions {listQuestions.length}</Badge>

              <Dropdown.Toggle icon variant="text-secondary">
                <FontAwesomeIcon icon={SolidIcon.faListOl} />
              </Dropdown.Toggle>
              <Dropdown.Menu right animated>
                {listQuestions.map((item) => {
                  return (
                    <Dropdown.Item key={item.id} className="text-right">
                      {recorteText(item.question, 70)}
                      <Avatar
                        circle
                        onClick={() => {
                          onEdit(item);
                        }}
                      >
                        <FontAwesomeIcon icon={SolidIcon.faEdit} />
                      </Avatar>
                      <Avatar
                        circle
                        onClick={() => {
                          onDelete(item.id);
                        }}
                      >
                        <FontAwesomeIcon icon={SolidIcon.faTrash} />
                      </Avatar>
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown.Uncontrolled>
            {/* END Dropdown */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <FloatLabel>
                <Controller
                  as={Input}
                  type="textarea"
                  id="question"
                  name="question"
                  control={control}
                  invalid={Boolean(errors.question)}
                  placeholder="Insert your question"
                />
                <Label for="question">Question</Label>
                {errors.question && (
                  <Form.Feedback children={errors.question.message} />
                )}
              </FloatLabel>
            </Form.Group>
            {/* BEGIN Form Group */}
            <Form.Group>
              <Controller
                as={CustomInput}
                type="select"
                name="type"
                id="type"
                control={control}
                invalid={Boolean(errors.type)}
              >
                <option value="default">Select your type</option>
                <option value="multiple">Multiple</option>
                <option value="single">Single</option>
                <option value="single">Yes/No</option>
              </Controller>
              {errors.type && <Form.Feedback children={errors.type.message} />}
            </Form.Group>
            {/* END Form Group */}
            {/* BEGIN Form Group */}

            {optionsFields.map((item, index) => {
              return (
                <Row key={item.id} className="pt-4">
                  <Col xs="11">
                    <Form.Group>
                      <FloatLabel>
                        <Controller
                          as={Input}
                          defaultValue={item.name || ""}
                          type="textarea"
                          id={`options_${index}_.name`}
                          name={`options[${index}].name`}
                          control={control}
                        />
                        <Label for={`options_${index}_.name`}>
                          Option#{index + 1}
                        </Label>
                      </FloatLabel>
                    </Form.Group>
                  </Col>
                  <Col xs="1">
                    <Button type="button" onClick={() => optionsRemove(index)}>
                      <FontAwesomeIcon icon={SolidIcon.faTrash} />
                    </Button>
                  </Col>
                  <Col xs="12">
                    <Form.Group>
                      <FloatLabel>
                        <Controller
                          name={`options[${index}].isCorrect`}
                          control={control}
                          render={({ onChange, onBlur, value, name, ref }) => (
                            <CustomInput
                              type="checkbox"
                              id={`options_${index}_.isCorrect`}
                              label="it's correct?"
                              onBlur={onBlur}
                              name={`options[${index}].isCorrect`}
                              onChange={(e) => onChange(e.target.checked)}
                              checked={item.isCorrect || value}
                              innerRef={ref}
                            />
                          )}
                        />
                      </FloatLabel>
                    </Form.Group>
                  </Col>
                </Row>
              );
            })}

            <p className="text-right">
              <Button
                variant={Boolean(errors.options) ? "danger" : "primary"}
                type="button"
                onClick={() => {
                  optionsAppend({});
                }}
              >
                Add Option <FontAwesomeIcon icon={SolidIcon.faPlus} />
              </Button>
            </p>
            {errors.options && (
              <Alert variant="label-danger">{errors.options.message}</Alert>
            )}

            <Controller
              as={Input}
              control={control}
              type="hidden"
              name="id"
              id="id"
            />

            <Portlet.Footer bordered>
              <Button
                disabled={!saved}
                variant="label-primary"
                size="lg"
                width="widest"
              >
                Save and add
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
                Cancel
              </Button>
            </Portlet.Footer>
            {/* END Form Group */}
          </Form>
        </Portlet.Body>
      </Portlet>
    </>
  );
}

function remove(db, id, success) {
  db.collection("questions")
    .doc(id)
    .delete()
    .then(() => {
      return success();
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

function create(db, data, success) {
  db.collection("questions")
    .add({
      question: data.question,
      type: data.type,
      options: data.options.map((item) => {
        return {
          name: item.name,
          isCorrect: item.isCorrect === true,
        };
      }),
    })
    .then((docRef) => {
      return success();
    })
    .catch((error) => {
      console.error(error);
      toast.fire({
        icon: "error",
        title: "Creation question",
      });
    });
}

function update(db, data, success) {
  db.collection("questions")
    .doc(data.id)
    .set({
      question: data.question,
      type: data.type,
      options: data.options.map((item) => {
        return {
          name: item.name,
          isCorrect: item.isCorrect === true,
        };
      }),
    })
    .then((docRef) => {
      return success();
    })
    .catch((error) => {
      toast.fire({
        icon: "error",
        title: "Creation question",
      });
    });
}

function recorteText(text, count) {
  return text.slice(0, count) + (text.length > count ? "..." : "");
}

export default QuizForm;
