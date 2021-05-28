import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Portlet,
  Container,
  FloatLabel,
  CustomInput,
  Widget12
} from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import * as BrandsIcon from "@fortawesome/free-brands-svg-icons"
import * as yup from "yup"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Link from "next/link"
import Head from "next/head"

function Login2Page() {
  return (
    <React.Fragment>
      <Head>
        <title>Login 2 | Panely</title>
      </Head>
      <Container fluid>
        <Row noGutters className="align-items-center justify-content-center h-100">
          <Col lg="8" xl="6">
            {/* BEGIN Portlet */}
            <Portlet className="overflow-hidden">
              <Row noGutters>
                <Col md="6">
                  <Portlet.Body className="d-flex flex-column justify-content-center align-items-start h-100 bg-primary text-white">
                    <h2>Welcome back!</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, temporibus,
                      repudiandae. Voluptate tempore, expedita placeat rem labore iste eveniet
                      ratione.
                    </p>
                    <Link href="/pages/register/register-2">
                      <Button
                        pill
                        variant="outline-light"
                        size="lg"
                        width="widest"
                      >
                        Register
                      </Button>
                    </Link>
                  </Portlet.Body>
                </Col>
                <Col md="6">
                  <Portlet.Body className="h-100">
                    <div className="d-flex justify-content-center mb-4">
                      <Button pill variant="label-primary">
                        <FontAwesomeIcon icon={BrandsIcon.faFacebook} className="mr-2" />
                        Facebook
                      </Button>
                      <Button pill variant="label-info" className="mx-2">
                        <FontAwesomeIcon icon={BrandsIcon.faGoogle} className="mr-2" />
                        Google
                      </Button>
                      <Button pill variant="label-danger" className="mx-2">
                        <FontAwesomeIcon icon={BrandsIcon.faPinterest} className="mr-2" />
                        Pinterest
                      </Button>
                    </div>
                    <Login2Form />
                  </Portlet.Body>
                </Col>
              </Row>
            </Portlet>
            {/* END Portlet */}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

function Login2Form() {
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
      <div className="d-flex align-items-center justify-content-between mb-4">
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
      <Button block type="submit" variant="label-primary" size="lg">
        Login
      </Button>
    </Form>
  )
}

export default withAuth(withLayout(Login2Page, "blank"))
