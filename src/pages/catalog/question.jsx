import { Form, Label, Input, Button, FloatLabel } from "@panely/components";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Row from "@panely/components/Row";
import Col from "@panely/components/Col";

function QuestionForm({ onSave }) {
  const schema = yup.object().shape({
    answer: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your answer"),
  });

  const { control, errors, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      answer: "",
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
      <Row>
        <Col sm="10">
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="textarea"
                id="answer"
                name="answer"
                control={control}
                invalid={Boolean(errors.answer)}
                placeholder="Insert your answer"
              />
              <Label for="name">Answer</Label>
              {errors.answer && (
                <Form.Feedback children={errors.answer.message} />
              )}
            </FloatLabel>
          </Form.Group>
        </Col>
        <Col sm="2">
          <Button type="submit" variant="primary" className="ml-2">
            Send
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default QuestionForm;
