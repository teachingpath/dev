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
        <title>Forget | Teaching Path</title>
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
                  <img src="/images/logo.png" alt="teaching path" />
                </div>
                <p>
                  Ingrese su correo electrónico para poder enviarle un enlace a
                  su correo, con ese enlace puedes hacer cambio de contraseña de
                  forma muy facil.
                </p>
                <ForgetForm />
                <small>
                  Si no le llega en enlace en los proximos minutos, ponerse en
                  contacto al correo teachingpath.dev@gmail.com
                </small>
              </Portlet.Body>
            </Portlet>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

function ForgetForm() {
  // Loading state
  const [loading, setLoading] = React.useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Su correo eléctronico no es valido")
      .required("Por favor introduzca su correo electrónico"),
  });

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }) => {
    setLoading(true);

    await firebaseClient
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        swal.fire({ text: "Revise su correo electrónico", icon: "success" });
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
            placeholder="Por favor, ingrese su email"
          />
          <Label for="email">Email</Label>
          {errors.email && <Form.Feedback children={errors.email.message} />}
        </FloatLabel>
      </Form.Group>

      <div className="d-flex align-items-center justify-content-between">
      
        <Button
          type="submit"
          variant="label-primary"
          size="lg"
          width="widest"
          disabled={loading}
        >
          {loading ? <Spinner className="mr-2" /> : null} Enviar
        </Button>
        <span>
          Volver a <Link href="/login">iniciar sesión</Link>
        </span>
      </div>
    </Form>
  );
}

RegisterPage.getInitialProps = async (ctx) => {
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

export default withLayout(RegisterPage, "blank");
