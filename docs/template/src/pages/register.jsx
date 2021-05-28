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

function RegisterPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Register | Panely</title>
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
                <RegisterForm />
              </Portlet.Body>
            </Portlet>
            {/* END Portlet */}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

function RegisterForm() {
  // Loading state
  const [loading, setLoading] = React.useState(false)

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
    password: yup
      .string()
      .min(6, "Please enter at least 6 characters")
      .required("Please provide your password"),
    passwordRepeat: yup
      .string()
      .min(6, "Please enter at least 6 characters")
      .oneOf([yup.ref("password")], "Your password not match")
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
      password: "",
      passwordRepeat: "",
      agreement: false,
    }
  })

  // Handle form submit event
  const onSubmit = async ({ firstName, lastName, email, password }) => {
    // Show loading indicator
    setLoading(true)

    // Trying to register user account to firebase
    await firebaseClient
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Trying to login with the user account that been registered before
        return firebaseClient
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            const user = firebaseClient.auth().currentUser

            // Trying to update user name
            return user.updateProfile({
              displayName: `${firstName} ${lastName}`
            }).then(() => {
              // Set the user login credential data
              const credential = firebaseClient.auth.EmailAuthProvider.credential(
                user.email,
                password
              )

              // Trying to reauthenticate user account
              return user.reauthenticateWithCredential(credential).then(() => {
                // Redirect to dashboard page
                Router.push(Router.query.redirect || PAGE.dashboardPagePath)
              }).catch(err => {
                // Show the error message if reauthentication is failed
                swal.fire({ text: err.message, icon: "error" })
              })
            }).catch(err => {
              // Show the error message if update user data is failed
              swal.fire({ text: err.message, icon: "error" })
            })
          })
          .catch(err => {
            // Show the error message if login is failed
            swal.fire({ text: err.message, icon: "error" })
          })
      })
      .catch(err => {
        // Show the error message if register is failed
        swal.fire({ text: err.message, icon: "error" })
      })

    // Hide loading indicator
    setLoading(false)
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
            id="password"
            name="password"
            control={control}
            invalid={Boolean(errors.password)}
            placeholder="Please provide your password"
          />
          <Label for="password">Password</Label>
          {errors.password && <Form.Feedback children={errors.password.message} />}
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
            id="passwordRepeat"
            name="passwordRepeat"
            control={control}
            invalid={Boolean(errors.passwordRepeat)}
            placeholder="Repeat your password"
          />
          <Label for="passwordRepeat">Confirm password</Label>
          {errors.passwordRepeat && <Form.Feedback children={errors.passwordRepeat.message} />}
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
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <span>
          Already have an account ? <Link href="/login">Sign In</Link>
        </span>
        <Button type="submit" variant="label-primary" size="lg" width="widest" disabled={loading}>
          {loading ? <Spinner className="mr-2" /> : null} Register
        </Button>
      </div>
    </Form>
  )
}

RegisterPage.getInitialProps = async ctx => {
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

export default withLayout(RegisterPage, "blank")
