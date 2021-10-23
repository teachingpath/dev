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
} from "@panely/components";
import { useForm, Controller } from "react-hook-form";
import {
  firebaseClient,
  firestoreClient,
} from "components/firebase/firebaseClient";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import nookies from "nookies";
import withLayout from "components/layout/withLayout";
import swalContent from "sweetalert2-react-content";
import Router from "next/router";
import Swal from "@panely/sweetalert2";
import Link from "next/link";
import Head from "next/head";
import PAGE from "config/page.config";
import { sendNewRegister } from "consumer/sendemail";

const ReactSwal = swalContent(Swal);

const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

function RegisterPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Register | Teaching Path</title>
      </Head>
      <Container fluid>
        <Row
          noGutters
          className="align-items-center justify-content-center h-100"
        >
          <Col sm="8" md="6" lg="4">
            <Portlet>
              <Portlet.Body>
                <div className="text-center mt-2 mb-4">
                 <a href="/" >
                  <img src="/images/logo.png" alt="teaching path" />
                  </a>
                </div>
                <RegisterForm />
              </Portlet.Body>
            </Portlet>
            <Portlet.Footer>
              <Link href="/catalog">
                <Button pill size="lg" width="widest">
                  Ver catálogo de pathways
                </Button>
              </Link>
            </Portlet.Footer>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

function RegisterForm() {
  // Loading state
  const [loading, setLoading] = React.useState(false);

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor ingrese su apellido"),
    lastName: yup
      .string()
      .min(5, "Ingrese al menos 5 caracteres")
      .required("Por favor ingrese su apellido"),
    email: yup
      .string()
      .email("Su correo eléctronico no es valido")
      .required("Por favor introduzca su correo electrónico"),
    password: yup
      .string()
      .min(6, "Por favor ingrese al menos 6 caracteres")
      .required("Por favor ingrese su contraseña"),
    passwordRepeat: yup
      .string()
      .min(6, "Por favor ingrese al menos 6 caracteres")
      .oneOf([yup.ref("password")], "Tu contraseña no coincide")
      .required("Repite tu contraseña"),
    agreement: yup.boolean().oneOf([true], "Debes aceptar el acuerdo"),
  });

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordRepeat: "",
      agreement: false,
      profile: false,
    },
  });

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password,
    profile,
  }) => {
    setLoading(true);

    await firebaseClient
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return firebaseClient
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            const user = firebaseClient.auth().currentUser;

            return user
              .updateProfile({
                displayName: `${firstName} ${lastName}`,
              })
              .then(() => {
                const credential =
                  firebaseClient.auth.EmailAuthProvider.credential(
                    user.email,
                    password
                  );

                return user
                  .reauthenticateWithCredential(credential)
                  .then(() => {
                    Router.push(
                      Router.query.redirect || PAGE.dashboardPagePath
                    );
                  })
                  .then(() => {
                    return firestoreClient
                      .collection("users")
                      .doc(user.uid)
                      .set({
                        profile: profile === true ? "coach" : "trainee",
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        point: 5,
                      })
                      .then(() => {
                        return sendNewRegister(profile, email, firstName)
                      });
                  })
                  .catch((err) => {
                    swal.fire({ text: err.message, icon: "error" });
                  });
              })
              .catch((err) => {
                swal.fire({ text: err.message, icon: "error" });
              });
          })
          .catch((err) => {
            swal.fire({ text: err.message, icon: "error" });
          });
      })
      .catch((err) => {
        swal.fire({ text: err.message, icon: "error" });
      });

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xs="6">
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
                placeholder="Inserta tu nombre"
              />
              <Label for="first-name">Nombres propio</Label>
              {errors.firstName && (
                <Form.Feedback children={errors.firstName.message} />
              )}
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
                placeholder="Inserta tu apellido"
              />
              <Label for="last-name">Apellidos propio</Label>
              {errors.lastName && (
                <Form.Feedback children={errors.lastName.message} />
              )}
            </FloatLabel>
          </Form.Group>
        </Col>
      </Row>
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
            placeholder="Por favor, ingrese su email"
          />
          <Label for="email">Email</Label>
          {errors.email && <Form.Feedback children={errors.email.message} />}
        </FloatLabel>
      </Form.Group>

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
            placeholder="Por favor ingrese una contraseña"
          />
          <Label for="password">Contraseña</Label>
          {errors.password && (
            <Form.Feedback children={errors.password.message} />
          )}
        </FloatLabel>
      </Form.Group>
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
            placeholder="Repita su contraseña"
          />
          <Label for="passwordRepeat">Confirme su contraseña</Label>
          {errors.passwordRepeat && (
            <Form.Feedback children={errors.passwordRepeat.message} />
          )}
        </FloatLabel>
      </Form.Group>
      <Form.Group>
        <Controller
          control={control}
          name="profile"
          render={({ onChange, onBlur, value, name, ref }) => (
            <CustomInput
              type="switch"
              size="lg"
              id="profile"
              label="Active como Mentor"
              invalid={Boolean(errors.profile)}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.checked)}
              checked={value}
              innerRef={ref}
            />
          )}
        />
      </Form.Group>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Form.Group className="mb-0">
          <Controller
            control={control}
            name="agreement"
            render={({ onChange, onBlur, value, name, ref }) => (
              <CustomInput
                type="checkbox"
                size="lg"
                id="agreement"
                label="Aceptar acuerdo"
                invalid={Boolean(errors.agreement)}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.checked)}
                checked={value}
                innerRef={ref}
              />
            )}
          />
        </Form.Group>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <span>
          ¿Ya tienes una cuenta? <Link href="/login">Iniciar sesión</Link>
        </span>
        <Button
          type="submit"
          variant="label-primary"
          size="lg"
          width="widest"
          disabled={loading}
        >
          {loading ? <Spinner className="mr-2" /> : null} Registrar
        </Button>
      </div>
    </Form>
  );
}

RegisterPage.getInitialProps = async (ctx) => {
  const cookies = nookies.get(ctx);
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

export default withLayout(RegisterPage, "blank");
