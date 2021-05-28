import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Portlet,
  Spinner,
  Container,
  CustomInput,
  FloatLabel,
  Widget12
} from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm, Controller } from "react-hook-form"
import { firebaseClient } from "components/firebase/firebaseClient"
import { yupResolver } from "@hookform/resolvers"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import * as yup from "yup"
import verifyCookie from "components/firebase/firebaseVerifyCookie"
import withLayout from "components/layout/withLayout"
import swalContent from "sweetalert2-react-content"
import Router from "next/router"
import Swal from "@panely/sweetalert2"
import Link from "next/link"
import Head from "next/head"
import PAGE from "config/page.config"

// Use SweetAlert React Content library
const ReactSwal = swalContent(Swal)

// Set SweetAlert options
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1"
  },
  buttonsStyling: false
})

function LoginPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Login | Panely</title>
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
                <LoginForm />
              </Portlet.Body>
            </Portlet>
            {/* END Portlet */}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

function LoginForm() {
  // Loading state
  const [loading, setLoading] = React.useState(false)

  // Define Yup schema for form validation
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Your email is not valid")
      .required("Please enter your email"),
    password: yup
      .string()
      .min(6, "Please enter at least 6 characters")
      .required("Please provide your password")
  })

  const { control, handleSubmit, errors } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
    defaultValues: {
      email: "",
      password: ""
    }
  })

  // Handle form submit event
  const onSubmit = async ({ email, password }) => {
    // Show loading indicator
    setLoading(true)

    // Trying to login with email and password with firebase
    await firebaseClient
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // Redirect to dashboard page
        Router.push(Router.query.redirect || PAGE.dashboardPagePath)
      })
      .catch(err => {
        // Show the error message if authentication is failed
        swal.fire({ text: err.message, icon: "error" })
      })

    // Hide loading indicator
    setLoading(false)
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
      <div className="d-flex align-items-center justify-content-between">
        <span>
          Don't have an account ? <Link href="/register">Sign Up</Link>
        </span>
        <Button type="submit" variant="label-primary" size="lg" width="widest" disabled={loading}>
          {loading ? <Spinner className="mr-2" /> : null} Login
        </Button>
      </div>
    </Form>
  )
}

LoginPage.getInitialProps = async ctx => {
  const result = await verifyCookie(ctx)

  // Redirect to dashboard page if the user has logged in
  if (result) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: ctx.query.redirect || PAGE.dashboardPagePath })
      ctx.res.end()
    } else {
      Router.push(Router.query.redirect || PAGE.dashboardPagePath)
    }
  }

  return { firebase: null }
}

export default withLayout(LoginPage, "blank")
