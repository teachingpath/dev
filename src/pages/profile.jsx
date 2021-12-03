import {
  Button,
  FloatLabel,
  Input,
  Form,
  Label,
  Portlet,
  Container,
  Spinner,
} from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import { firestoreClient } from "components/firebase/firebaseClient";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import Head from "next/head";
import Col from "../../docs/template/src/modules/components/Col";
import { ImageEditor } from "@panely/components";
import { useRef } from "react";
import { getUser } from "consumer/user";

class ProfilePage extends React.Component {
  state = { data: {}, id: null };

  componentDidMount() {
    this.props.pageChangeHeaderTitle("Profile");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      { text: "Perfil" },
    ]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.id) {
      getUser(this.props.user.uid).then(({ data, id }) => {
        if (data) {
          console.log(data);
          this.setState({ data: data, id: id });
          this.props.pageChangeHeaderTitle(
            data.firstName.toUpperCase() || "Perfil"
          );
        } else {
          console.log("No found user");
        }
      });
    }
  }

  render() {
    const { data, id } = this.state;
    return (
      <React.Fragment>
        <Head>
          <title>Profile | Teaching Path</title>
        </Head>
        <Container fluid>
          <Col md="6">
            <Portlet>
              <Portlet.Body className="h-100">
                {id && <ProfileForm data={data} id={id} />}
              </Portlet.Body>
            </Portlet>
          </Col>
        </Container>
      </React.Fragment>
    );
  }
}

function ProfileForm({ data, id }) {
  const [loading, setLoading] = React.useState(false);
  const imageRef = useRef(null);

  const schema = yup.object().shape({
    specialty: yup
      .string()
      .min(6, "Por favor ingrese al menos 6 caracteres"),
    lastName: yup
      .string()
      .min(3, "Por favor ingrese al menos 3 caracteres")
      .required("Por favor proporcione su segundo nombre"),
    firstName: yup
      .string()
      .min(3, "Por favor ingrese al menos 3 caracteres")
      .required("Por favor proporcione su primer nombre"),
    bio: yup
      .string()
      .min(6, "Por favor ingrese al menos 6 caracteres")
  });

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      specialty: data?.specialty || "",
      bio: data?.bio || "",
      phone: data?.phone || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    imageRef.current.getImage().then((url) => {
      firestoreClient
        .collection("users")
        .doc(id)
        .update({ ...data, image: url })
        .then((doc) => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <ImageEditor ref={imageRef} image={data?.image} />
      </Form.Group>
      <Form.Group>
        <Label>
          Hola, {data?.firstName} {data?.lastName} ({data?.email})
        </Label>
      </Form.Group>
      <Form.Group>
        <FloatLabel>
          <Controller
            as={Input}
            type="text"
            id="firstName"
            name="firstName"
            control={control}
            invalid={Boolean(errors.firstName)}
            placeholder="Por favor inserte su primer nombre"
          />
          <Label for="firstName">Primer nombre</Label>
          {errors.firstName && (
            <Form.Feedback children={errors.firstName.message} />
          )}
        </FloatLabel>
      </Form.Group>
      <Form.Group>
        <FloatLabel>
          <Controller
            as={Input}
            type="text"
            id="lastName"
            name="lastName"
            control={control}
            invalid={Boolean(errors.lastName)}
            placeholder="Por favor inserte su apellido"
          />
          <Label for="lastName">Apellido</Label>
          {errors.lastName && (
            <Form.Feedback children={errors.lastName.message} />
          )}
        </FloatLabel>
      </Form.Group>
      <Form.Group>
        <FloatLabel>
          <Controller
            as={Input}
            type="text"
            id="specialty"
            name="specialty"
            control={control}
            invalid={Boolean(errors.specialty)}
            placeholder="Por favor inserte su especialidad"
          />
          <Label for="specialty">Especialidad</Label>
          {errors.specialty && (
            <Form.Feedback children={errors.specialty.message} />
          )}
        </FloatLabel>
      </Form.Group>
      <Form.Group>
        <FloatLabel>
          <Controller
            as={Input}
            type="number"
            id="phone"
            name="phone"
            control={control}
            invalid={Boolean(errors.phone)}
            placeholder="Por favor inserte su teléfono"
          />
          <Label for="specialty">Teléfono</Label>
          {errors.phone && <Form.Feedback children={errors.phone.message} />}
        </FloatLabel>
      </Form.Group>
      <Form.Group>
        <FloatLabel>
          <Controller
            as={Input}
            type="textarea"
            id="bio"
            name="bio"
            control={control}
            invalid={Boolean(errors.bio)}
            placeholder="Por favor inserte su biografía"
          />
          <Label for="bio">Biografía</Label>
          {errors.bio && <Form.Feedback children={errors.bio.message} />}
        </FloatLabel>
      </Form.Group>
      <div className="d-flex align-items-center justify-content-between">
        <Button
          type="submit"
          variant="label-primary"
          width="widest"
          disabled={loading}
        >
          {loading ? <Spinner className="mr-2" /> : null} Guardar
        </Button>
      </div>
    </Form>
  );
}

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withAuth(withLayout(ProfilePage)));
