import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  FloatLabel,
  CustomInput,
  Alert,
} from "@panely/components";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers";
import { useState } from "react";
import Router from "next/router";
import Spinner from "@panely/components/Spinner";


function QuizForm({ onSave, data }) {
  const [loading, setLoading] = useState(false);
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

  const { control, handleSubmit, errors, setError, reset, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      question: data?.question || "",
      type: data?.type || "",
      options: data?.options || [],
    },
  });
  const isNew = !data || Object.keys(data).length === 0;
  const {
    fields: optionsFields,
    append: optionsAppend,
    remove: optionsRemove,
  } = useFieldArray({ control, name: "options" });

  const watchFields = watch(["type"]);

  return (

    <Form onSubmit={handleSubmit((data) => {
      setLoading(true);
      if (data.options.some(opt => opt.isCorrect) || data.options.isCorrect !== undefined) {
        onSave(data).then(() => {
          if (isNew) {
            reset();
            setLoading(false);
          } else {
            Router.back();
          }
        });
      } else {
        setError("options", {
          type: "manual",
          message: "Please select some correct option!"
        });
        setLoading(false);
      }


    })}>
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
                <FontAwesomeIcon icon={SolidIcon.faTrash}/>
              </Button>
            </Col>
            <Col xs="12">
              {watchFields.type === 'multiple' && <CheckboxComponent index={index} item={item} control={control} />}
              {watchFields.type === 'single' && <RadioComponent index={index} item={item} control={control} />}
            </Col>
          </Row>
        );
      })}

      <div className="text-right">
        <Button
          variant={Boolean(errors.options) ? "danger" : "primary"}
          type="button"
          onClick={() => {
            optionsAppend({
              name: "", isCorrect: false
            });
          }}
        >
          Add Option <FontAwesomeIcon icon={SolidIcon.faPlus} />
        </Button>
      </div>

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


      <Button
        disabled={loading}
        variant="label-primary"
        size="lg"
        width="widest"
      >
        {loading && <Spinner className="mr-2" />} Save</Button>
      <Button
        type="button"
        className="ml-2"
        variant="label-secondary"
        size="lg"
        width="widest"
        onClick={() => {
          Router.back();
        }}
      >Cancel</Button>

    </Form>

  );
}



function RadioComponent({index, item, control}) {
  return <Form.Group>
    <FloatLabel>
      <Controller
          name={`options.isCorrect`}
          control={control}
          render={({onChange, onBlur, value, name, ref}) => {
            return (
                <CustomInput
                    type={"radio"}
                    id={`options_${index}_.isCorrect`}
                    label="it's correct?"
                    name={`options.isCorrect`}
                    onChange={(e) => {
                      item.isCorrect = e.target.checked;
                      onChange(index);
                    }}
                    checked={item.isCorrect}
                    innerRef={ref}
                />
            )
          }}
      />
    </FloatLabel>
  </Form.Group>;
}

function CheckboxComponent({index, item, control}) {
  return <Form.Group>
    <FloatLabel>
      <Controller
          name={`options[${index}].isCorrect`}
          control={control}
          render={({onChange, onBlur, value, name, ref}) => {
            const checked = item.isCorrect || value;
            return (
                <CustomInput
                    type={"checkbox"}
                    id={`options_${index}_.isCorrect`}
                    label="it's correct?"
                    name={`options[${index}].isCorrect`}
                    onChange={(e) => {
                      item.isCorrect = e.target.checked;
                      onChange(e.target.checked);
                    }}
                    checked={checked}
                    innerRef={ref}
                />
            )
          }}
      />
    </FloatLabel>
  </Form.Group>;
}


export default QuizForm;
