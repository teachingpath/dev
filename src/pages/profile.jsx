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
import {
  firebaseClient,
  firestoreClient,
} from "components/firebase/firebaseClient";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import Head from "next/head";
import Col from "../../docs/template/src/modules/components/Col";
import { ImageEditor } from "@panely/components";
import { useRef } from "react";

class ProfilePage extends React.Component {
  state = { data: {}, id: null };

  componentDidMount() {
    const user = firebaseClient.auth().currentUser;
    this.props.pageChangeHeaderTitle("Profile");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      { text: "Perfil" },
    ]);

    firestoreClient
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        console.log(doc.data());
        this.setState({ data: doc.data(), id: user.uid });
        this.props.pageChangeHeaderTitle(
          this.state.data?.firstName.toUpperCase() || "Perfil"
        );
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
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
      .min(6, "Por favor ingrese al menos 6 caracteres")
      .required("Por favor proporcione su especialidad"),
    bio: yup
      .string()
      .min(6, "Por favor ingrese al menos 6 caracteres")
      .required("Por favor proporcione su biografía"),
  });

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
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
        <ImageEditor ref={imageRef} image={data?.image} withPreview />
      </Form.Group>
      <Form.Group>
        <Label>
          Hola, {data?.firstName} {data?.lastName} ({data?.email})
        </Label>
      </Form.Group>
      <Form.Group>
        <FloatLabel size="lg">
          <Controller
            as={Input}
            type="text"
            id="specialty"
            name="specialty"
            size="lg"
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
        <FloatLabel size="lg">
          <Controller
            as={Input}
            type="number"
            id="phone"
            name="phone"
            size="lg"
            control={control}
            invalid={Boolean(errors.specialty)}
            placeholder="Por favor inserte su teléfono"
          />
          <Label for="specialty">Teléfono</Label>
          {errors.phone && <Form.Feedback children={errors.phone.message} />}
        </FloatLabel>
      </Form.Group>
      <Form.Group>
        <FloatLabel size="lg">
          <Controller
            as={Input}
            type="textarea"
            id="bio"
            name="bio"
            size="lg"
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
          size="lg"
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
