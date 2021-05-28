import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Portlet,
  Container,
  CustomInput,
  FloatLabel,
  Widget12
} from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import * as yup from "yup"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Link from "next/link"
import Head from "next/head"

function Register1Page() {
  return (
    <React.Fragment>
      <Head>
        <title>Register 1 | Panely</title>
      </Head>
      <Container fluid>
        <Row noGutters className="align-items-center justify-content-center h-100">
          <Col sm="8" md="6" lg="4">
            {/* BEGIN Portlet */}
            <Portlet>
              <Portlet.Body>
                <div className="text-center mt-2 mb-4">
                  {/* BEGIN Widget */}
                  <Widget12 display circle variant="label-primary" className="mb-4">
                    <FontAwesomeIcon icon={SolidIcon.faUserAlt} />
                  </Widget12>
                  {/* END Widget */}
                </div>
                <Register1Form />
              </Portlet.Body>
            </Portlet>
            {/* END Portlet */}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

function Register1Form() {
  // Define Yup schema for form validation
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your lastname"),
    lastName: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your lastname"),
    email: yup
      .string()
      .email("Your email is not valid")
      .required("Please enter your email"),
    password1: yup
      .string()
      .min(6, "Please enter at least 6 characters")
      .required("Please provide your password"),
    password2: yup
      .string()
      .min(6, "Please enter at least 6 characters")
      .oneOf([yup.ref("password1")], "Your password not match")
      .required("Please repeat your password"),
    agreement: yup
      .boolean()
      .oneOf([true], "You must accept the agreement")
  })

  const { control, handleSubmit, errors } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password1: "",
      password2: "",
      agreement: false,
    }
  })

  // Handle form submit event
  const onSubmit = data => {
    console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xs="6">
          {/* BEGIN Form Group */}
          <Form.Group>
            <FloatLabel size="lg">
              <Controller
                as={Input}
                size="lg"
                type="text"
                id="first-name"
                name="firstName"
                control={control}
                invalid={Boolean(errors.firstName)}
                placeholder="Insert your firstname"
              />
              <Label for="first-name">First name</Label>
              {errors.firstName && <Form.Feedback children={errors.firstName.message} />}
            </FloatLabel>
          </Form.Group>
          {/* END Form Group */}
        </Col>
        <Col xs="6">
          {/* BEGIN Form Group */}
          <Form.Group>
            <FloatLabel size="lg">
              <Controller
                as={Input}
                size="lg"
                type="text"
                id="last-name"
                name="lastName"
                control={control}
                invalid={Boolean(errors.lastName)}
                placeholder="Insert your lastname"
              />
              <Label for="last-name">last name</Label>
              {errors.lastName && <Form.Feedback children={errors.lastName.message} />}
            </FloatLabel>
          </Form.Group>
          {/* END Form Group */}
        </Col>
      </Row>
      {/* BEGIN Form Group */}
      <Form.Group>
        <FloatLabel size="lg">
          <Controller
            as={Input}
            type="email"
            id="email"
            name="email"
            size="lg"
            control={control}
            invalid={Boolean(errors.email)}
            placeholder="Please insert your email"
          />
          <Label for="email">Email</Label>
          {errors.email && <Form.Feedback children={errors.email.message} />}
        </FloatLabel>
      </Form.Group>
      {/* END Form Group */}
      {/* BEGIN Form Group */}
      <Form.Group>
        <FloatLabel size="lg">
          <Controller
            as={Input}
            size="lg"
            type="password"
            id="password1"
            name="password1"
            control={control}
            invalid={Boolean(errors.password1)}
            placeholder="Please provide your password"
          />
          <Label for="password1">Password</Label>
          {errors.password1 && <Form.Feedback children={errors.password1.message} />}
        </FloatLabel>
      </Form.Group>
      {/* END Form Group */}
      {/* BEGIN Form Group */}
      <Form.Group>
        <FloatLabel size="lg">
          <Controller
            as={Input}
            size="lg"
            type="password"
            id="password2"
            name="password2"
            control={control}
            invalid={Boolean(errors.password2)}
            placeholder="Repeat your password"
          />
          <Label for="password2">Confirm password</Label>
          {errors.password2 && <Form.Feedback children={errors.password2.message} />}
        </FloatLabel>
      </Form.Group>
      {/* END Form Group */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        {/* BEGIN Form Group */}
        <Form.Group className="mb-0">
          <Controller
            control={control}
            name="agreement"
            render={({ onChange, onBlur, value, name, ref }) => (
              <CustomInput
                type="checkbox"
                size="lg"
                id="agreement"
                label="Accept agreement"
                invalid={Boolean(errors.agreement)}
                onBlur={onBlur}
                onChange={e => onChange(e.target.checked)}
                checked={value}
                innerRef={ref}
              />
            )}
          />
        </Form.Group>
        {/* END Form Group */}
        <Link href="#">Forgot password?</Link>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <span>
          Already have an account ? <Link href="/pages/login/login-1">Sign In</Link>
        </span>
        <Button type="submit" variant="label-primary" size="lg" width="widest">
          Register
        </Button>
      </div>
    </Form>
  )
}

export default withAuth(withLayout(Register1Page, "blank"))
