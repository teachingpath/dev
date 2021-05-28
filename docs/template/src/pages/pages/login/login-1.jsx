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

function Login1Page() {
  return (
    <React.Fragment>
      <Head>
        <title>Login 1 | Panely</title>
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
                <Login1Form />
              </Portlet.Body>
            </Portlet>
            {/* END Portlet */}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

function Login1Form() {
  // Define Yup schema for form validation
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Your email is not valid")
      .required("Please enter your email"),
    password: yup
      .string()
      .min(6, "Please enter at least 6 characters")
      .required("Please provide your password"),
    remember: yup.boolean()
  })

  const { control, handleSubmit, errors } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
    defaultValues: {
      email: "",
      password: "",
      remember: false
    }
  })

  // Handle form submit event
  const onSubmit = data => {
    console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
            type="password"
            id="password"
            name="password"
            size="lg"
            control={control}
            invalid={Boolean(errors.password)}
            placeholder="Please insert your password"
          />
          <Label for="password">Password</Label>
          {errors.password && <Form.Feedback children={errors.password.message} />}
        </FloatLabel>
      </Form.Group>
      {/* END Form Group */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        {/* BEGIN Form Group */}
        <Form.Group className="mb-0">
          <Controller
            control={control}
            name="remember"
            render={({ onChange, onBlur, value, name, ref }) => (
              <CustomInput
                type="switch"
                size="lg"
                id="remember"
                label="Remember me"
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
          Don't have an account ? <Link href="/pages/register/register-1">Sign Up</Link>
        </span>
        <Button type="submit" variant="label-primary" size="lg" width="widest">
          Login
        </Button>
      </div>
    </Form>
  )
}

export default withAuth(withLayout(Login1Page, "blank"))
