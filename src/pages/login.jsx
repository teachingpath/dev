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
import {
  firebaseClient,
  firestoreClient,
} from "components/firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import withLayout from "components/layout/withLayout";
import swalContent from "sweetalert2-react-content";
import Router from "next/router";
import Swal from "@panely/sweetalert2";
import Link from "next/link";
import Head from "next/head";
import PAGE from "config/page.config";
import { getUser } from "consumer/user";
import { sendNewRegister } from "consumer/sendemail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

// Use SweetAlert React Content library
const ReactSwal = swalContent(Swal);
const auth = firebaseClient.auth();

// Set SweetAlert options
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

function LoginPage() {
  const [user] = useAuthState(auth);

  if (user) {
    getUser(user.uid).then(({ data = null }) => {
      if (!data) {
        const { email, displayName, phoneNumber, photoURL } = user;
        firestoreClient
          .collection("users")
          .doc(user.uid)
          .set({
            profile: "trainee",
            email: email,
            firstName: displayName,
            lastName: "",
            point: 5,
            image: photoURL,
            phone: phoneNumber,
          })
          .then(() => {
            return sendNewRegister(trainee, email, displayName);
          })
          .then(() => {
            Router.push("/");
          });
      } else {
        Router.push("/");
      }
    });
  }

  return (
    <React.Fragment>
      <Head>
        <title>Login | Teaching Path</title>
      </Head>
      <Container fluid>
        <Row
          noGutters
          className="align-items-center justify-content-center m-5"
        >
          <Col sm="12" md="8" lg="6">
            {/* BEGIN Portlet */}
            <Col md="12">
              <Portlet.Body className="d-flex flex-column justify-content-center align-items-start h-100 bg-primary text-white">
                <h2>¡Bienvenido/Bienvenida!</h2>
                <p>
                  En este sitio puedes encontrar los mejores pathway de ciencia
                  y tecnología, aprender programación, inglés y cálculo, etc.
                  También crea tus pathway y ayuda a otros a seguir tu camino
                  hacia el conocimiento.
                </p>

                <Link
                  href="https://docs.teachingpath.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button pill variant="outline-light" size="lg" width="widest">
                    <i className="fas fa-info-circle mr-2"></i>
                    Ver más información
                  </Button>
                </Link>
              </Portlet.Body>
            </Col>

            <Col md="12">
              <Portlet>
                <Portlet.Body className="h-100">
                  <div className="text-center mt-2 mb-4">
                    <a href="/">
                      <img src="/images/logo.png" alt="teaching path" />
                    </a>
                  </div>
                  <h6>Iniciar sesión</h6>
                  <div className="pb-3">
                    <SignIn />
                  </div>
                  <h6>Con usuario/contraseña</h6>
                  <LoginForm />
                </Portlet.Body>
                <Portlet.Footer>
                  <Link href="/catalog">
                    <Button pill size="lg" width="widest">
                      <i className="mr-2 fas fa-book-open"></i>
                      Ver catálogo de pathways
                    </Button>
                  </Link>
                </Portlet.Footer>
              </Portlet>
            </Col>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

function LoginForm() {
  // Loading state
  const [loading, setLoading] = React.useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Su correo eléctronico no es valido")
      .required("Por favor introduzca su correo electrónico"),
    password: yup
      .string()
      .min(6, "Por favor ingrese al menos 6 caracteres")
      .required("Por favor ingrese su contraseña"),
  });

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }) => {
    setLoading(true);

    await auth
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
            placeholder="Por favor inserte su correo electrónico"
          />
          <Label for="email">Email</Label>
          {errors.email && <Form.Feedback children={errors.email.message} />}
        </FloatLabel>
      </Form.Group>
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
            placeholder="Por favor ingrese su contraseña"
          />
          <Label for="password">Contraseña</Label>
          {errors.password && (
            <Form.Feedback children={errors.password.message} />
          )}
        </FloatLabel>
      </Form.Group>
      {/* END Form Group */}
      <Link href="/forget"> ¿Olvido usuario/contraseña? </Link>
      <div className="d-flex align-items-center justify-content-between">
        <span>
          ¿No tienes una cuenta? <Link href="/register">Crear Cuenta</Link>
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

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebaseClient.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <Button className="button right" onClick={signInWithGoogle}>
      Iniciar con Google <i className="fab fa-google ml-2" />
    </Button>
  );
}

LoginPage.getInitialProps = async (ctx) => {
  const cookies = nookies.get(ctx);
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
