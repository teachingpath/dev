import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Portlet,
  FloatLabel,
  CustomInput,
} from "@panely/components";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Quill from "@panely/quill";
import Router from "next/router";
import { useState } from "react";
import Alert from "@panely/components/Alert";
import Spinner from "@panely/components/Spinner";

const modulesFull = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ['blockquote', 'code-block'],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ direction: "rtl" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  syntax: true,
};

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

function TrackForm({ onSave, data }) {
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
    type: yup.string().required("Please enter your type"),
    timeLimit: yup
      .number()
      .min(1, "Please enter at least 1 hour")
      .required("Please enter your time limit"),
  });


  const defaultValues = {
    name: data?.name || "",
    description: data?.description || "",
    type: data?.type || "",
    timeLimit: data?.timeLimit || 1,
    training: data?.training || [],
    questions:data?.questions || [],
    content: data?.content || "",
    guidelines: data?.guidelines || "",
    criteria: data?.criteria || "",
  };



  const { control, errors, handleSubmit, watch, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });


  const isNew = !data || Object.keys(data).length === 0;

  const watchFields = watch(["type"]);
  if(watchFields.type === 'learning'){
    setValue("content", data?.content || "");
    setValue("guidelines", "");
    setValue("criteria", "");
    setValue("questions", []);
    setValue("training",  []);
  }
  if(watchFields.type === 'training'){
    setValue("content", "");
    setValue("guidelines", "");
    setValue("criteria", "");
    setValue("questions", []);
    setValue("training", data?.training || []);
  }
  if(watchFields.type === 'hacking'){
    setValue("content", "");
    setValue("guidelines",  data?.guidelines || "");
    setValue("criteria",  data?.criteria || "");
    setValue("questions", []);
    setValue("training",  []);

  }
  if(watchFields.type === 'q_and_A'){
    setValue("content", "");
    setValue("guidelines",  "");
    setValue("criteria",   "");
    setValue("questions", data?.questions || []);
    setValue("training",  []);
  }

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
            type="number"
            id="timeLimit"
            name="timeLimit"
            control={control}
            className="w-25"
            invalid={Boolean(errors.timeLimit)}
            placeholder="Insert your time limit in hour"
          />
          <Label for="timeLimit">Time limit (hours)</Label>
          {errors.timeLimit && (
            <Form.Feedback children={errors.timeLimit.message} />
          )}
        </FloatLabel>
      </Form.Group>
      {/* END Form Group */}

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
          <option value="learning">
            Learning (Documents, guides or videos)
          </option>
          <option value="hacking">Hacking (Challenges or evaluations)</option>
          <option value="q_and_A">Q&A (Questions and answers session)</option>
          <option value="training">
            Training (Tutorial or Step-by-step guides)
          </option>
        </Controller>
        {errors.type && <Form.Feedback children={errors.type.message} />}
      </Form.Group>
      {/* END Form Group */}

      {
        {
          learning: (
            <>
              <Alert variant="outline-primary">
                Write here what the learner should read and learn.
              </Alert>
              <Form.Group>
                <FloatLabel>
                  <Controller
                    name={`content`}
                    control={control}
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <Quill
                        innerRef={ref}
                        onBlur={onBlur}
                        theme="snow"
                        value={value}
                        name={"content"}
                        modules={modulesFull}
                        onChange={onChange}
                        style={{ minHeight: "50rem" }}
                      />
                    )}
                  />
                  <Label for="content">Content</Label>
                  {errors.content && (
                    <Form.Feedback children={errors.content.message} />
                  )}
                </FloatLabel>
              </Form.Group>
            </>
          ),
          hacking: (
            <>
              <Alert variant="outline-primary">
                Write a series of indications, steps and guidelines that the
                learner can validate their own knowledge by doing an individual
                practical activity.
              </Alert>
              <Form.Group>
                <FloatLabel>
                  <Controller
                    name={`guidelines`}
                    control={control}
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <Quill
                        innerRef={ref}
                        onBlur={onBlur}
                        theme="snow"
                        value={value}
                        id="guidelines"
                        name={"guidelines"}
                        modules={modulesBasic}
                        onChange={onChange}
                        style={{ minHeight: "15rem" }}
                      />
                    )}
                  />
                  <Label for="guidelines">Guidelines</Label>
                  {errors.guidelines && (
                    <Form.Feedback children={errors.guidelines.message} />
                  )}
                </FloatLabel>
              </Form.Group>

              <Form.Group>
                <FloatLabel>
                  <Controller
                    name={`criteria`}
                    control={control}
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <Quill
                        innerRef={ref}
                        onBlur={onBlur}
                        theme="snow"
                        value={value}
                        id="criteria"
                        name={"criteria"}
                        modules={modulesBasic}
                        onChange={onChange}
                        style={{ minHeight: "15rem" }}
                      />
                    )}
                  />

                  <Label for="criteria">Criteria</Label>
                  {errors.criteria && (
                    <Form.Feedback children={errors.criteria.message} />
                  )}
                </FloatLabel>
              </Form.Group>
            </>
          ),
          q_and_A: (
            <>
              <Alert variant="outline-primary">
                Create questions where learners can then freely answer. They are
                open questions to discuss.
              </Alert>
              <Form.Group>
                <FloatLabel>
                  <Controller
                    name={`questions`}
                    control={control}
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <QuestionForm
                        data={value || {}}
                        innerRef={ref}
                        onBlur={onBlur}
                        id="questions"
                        name={"questions"}
                        onChange={onChange}
                      />
                    )}
                  />
                  {errors.questions && (
                    <Form.Feedback children={errors.questions.message} />
                  )}
                </FloatLabel>
              </Form.Group>
            </>
          ),
          training: (
            <>
              <Alert variant="outline-primary">
                Create a series of steps to complete an individual activity,
                such as a tutorial or step-by-step guide.
              </Alert>
              <Form.Group>
                <FloatLabel>
                  <Controller
                    name={`training`}
                    control={control}
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <TrainingForm
                        data={value || []}
                        innerRef={ref}
                        onBlur={onBlur}
                        id="training"
                        name={"training"}
                        onChange={onChange}
                      />
                    )}
                  />
                  {errors.training && (
                    <Form.Feedback children={errors.training.message} />
                  )}
                </FloatLabel>
              </Form.Group>
            </>
          ),
        }[watchFields.type]
      }

      <Button type="submit" variant="label-primary" size="lg" width="widest">
        {loading && <Spinner className="mr-2" />}
        {data === null || data === undefined ? "Create" : "Update"}
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
        Cancel{" "}
      </Button>
    </Form>
  );
}

function TrainingForm({ data, onChange }) {
  const [value, setValue] = useState(data);

  const { control } = useForm({
    defaultValues: {
      options: data || [],
    },
  });

  const {
    fields: optionsFields,
    append: optionsAppend,
    remove: optionsRemove,
  } = useFieldArray({ control, name: "options" });

  // Handle form submit event
  const onChangeContent = (index, data) => {
    value[index] = data;
    setValue(value);
    onChange(value);
  };

  return (
    <>
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Title>Step-by-step</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          <Form>
            {/* BEGIN Form Group */}

            {optionsFields.map((item, index) => {
              return (
                <Row key={item.id} className="pt-4">
                  <Col xs="11">
                    <Form.Group>
                      <FloatLabel>
                        <Controller
                          id={`options_${index}_.name`}
                          name={`options[${index}].name`}
                          control={control}
                          render={({ onChange, onBlur, value, name, ref }) => (
                            <Quill
                              innerRef={ref}
                              theme="snow"
                              value={value || ""}
                              id={`options_${index}_.name`}
                              name={`options[${index}].name`}
                              modules={modulesFull}
                              onChange={onChange}
                              onBlur={onBlur}
                              onKeyUp={(data) => {
                                if (value.name) {
                                  onChangeContent(index, value);
                                } else {
                                  onChangeContent(index, {
                                    name: value,
                                    id: index,
                                  });
                                }
                              }}
                              style={{ minHeight: "20rem" }}
                            />
                          )}
                        />
                        <Label for={`options_${index}_.name`}>
                          Step#{index + 1}
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
                Add Step <FontAwesomeIcon icon={SolidIcon.faPlus} />
              </Button>
            </p>

            {/* END Form Group */}
          </Form>
        </Portlet.Body>
      </Portlet>
    </>
  );
}

function QuestionForm({ data, onChange }) {
  const [value, setValue] = useState(data);
  const { control } = useForm({
    defaultValues: {
      options: data || [],
    },
  });

  const {
    fields: optionsFields,
    append: optionsAppend,
    remove: optionsRemove,
  } = useFieldArray({ control, name: "options" });

  // Handle form submit event
  const onChangeContent = (index, data) => {
    value[index] = data;
    setValue(value);
    onChange(value);
  };

  return (
    <>
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Title>Questions</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          <Form>
            {/* BEGIN Form Group */}

            {optionsFields.map((item, index) => {
              return (
                <Row key={item.id} className="pt-4">
                  <Col xs="11">
                    <Form.Group>
                      <FloatLabel>
                        <Controller
                          id={`options_${index}_.name`}
                          name={`options[${index}].name`}
                          control={control}
                          render={({ onChange, onBlur, value, name, ref }) => (
                            <Input
                              innerRef={ref}
                              type="textarea"
                              value={value || ""}
                              id={`options_${index}_.name`}
                              name={`options[${index}].name`}
                              onChange={onChange}
                              onBlur={onBlur}
                              onKeyUp={(data) => {
                                if(value){
                                  if (value.name) {
                                    onChangeContent(index, value);
                                  } else {
                                    onChangeContent(index, {
                                      name: value,
                                      id: index,
                                    });
                                  }
                                }
                                
                              }}
                            />
                          )}
                        />
                        <Label for={`options_${index}_.name`}>
                          Question#{index + 1}
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
                Add Question <FontAwesomeIcon icon={SolidIcon.faPlus} />
              </Button>
            </p>

            {/* END Form Group */}
          </Form>
        </Portlet.Body>
      </Portlet>
    </>
  );
}

export default TrackForm;
