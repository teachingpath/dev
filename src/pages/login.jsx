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
  FloatLabel,
} from "@panely/components";
import { useForm, Controller } from "react-hook-form";
import nookies from "nookies";
import { firebaseClient } from "components/firebase/firebaseClient";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import withLayout from "components/layout/withLayout";
import swalContent from "sweetalert2-react-content";
import Router from "next/router";
import Swal from "@panely/sweetalert2";
import Link from "next/link";
import Head from "next/head";
import PAGE from "config/page.config";

// Use SweetAlert React Content library
const ReactSwal = swalContent(Swal);

// Set SweetAlert options
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

function LoginPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Login | Teaching Path</title>
      </Head>
      <Container fluid>
        <Row
          noGutters
          className="align-items-center justify-content-center h-100"
        >
          <Col sm="8" md="6" lg="4">
            {/* BEGIN Portlet */}
            <Col md="12">
              <Portlet.Body className="d-flex flex-column justify-content-center align-items-start h-100 bg-primary text-white">
                <h2>Welcome back!</h2>
                <p>
                  In this site you can find the best science and technology
                  pathways, learn programming, English and calculus, etc. Also
                  create your pathways and help others to follow your path.
                </p>
                <Link href="/catalog">
                  <Button pill variant="outline-light" size="lg" width="widest">
                    See catalog
                  </Button>
                </Link>
              </Portlet.Body>
            </Col>
            <Col md="12">
              <Portlet>
                <Portlet.Body className="h-100">
                  <div className="text-center mt-2 mb-4">
                    {/* BEGIN Widget */}
                    <img src="/images/logo.png" alt="teaching path" />
                    {/* END Widget */}
                  </div>
                  <Label>Sing in</Label>
                  <LoginForm />
                </Portlet.Body>
              </Portlet>
            </Col>
            {/* END Portlet */}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

function LoginForm() {
  // Loading state
  const [loading, setLoading] = React.useState(false);

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
  });

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submit event
  const onSubmit = async ({ email, password }) => {
    setLoading(true);

    await firebaseClient
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((ref) => {
        Router.push(Router.query.redirect || PAGE.dashboardPagePath);
      })
      .catch((err) => {
        swal.fire({ text: err.message, icon: "error" });
      });

    setLoading(false);
  };

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
          {errors.password && (
            <Form.Feedback children={errors.password.message} />
          )}
        </FloatLabel>
      </Form.Group>
      {/* END Form Group */}
      <div className="d-flex align-items-center justify-content-between">
        <span>
          Don't have an account ? <Link href="/register">Sign Up</Link>
        </span>
        <Button
          type="submit"
          variant="label-primary"
          size="lg"
          width="widest"
          disabled={loading}
        >
          {loading ? <Spinner className="mr-2" /> : null} Login
        </Button>
      </div>
    </Form>
  );
}

LoginPage.getInitialProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  // Redirect to dashboard page if the user has logged in
  if (cookies?.token) {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: ctx.query.redirect || PAGE.dashboardPagePath,
      });
      ctx.res.end();
    } else {
      Router.push(Router.query.redirect || PAGE.dashboardPagePath);
    }
  }

  return { firebase: null };
};

export default withLayout(LoginPage, "blank");
