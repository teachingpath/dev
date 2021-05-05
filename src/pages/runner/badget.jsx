import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  FloatLabel,
  ImageEditor,
  Container,
  Portlet, Dropdown
} from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import withAuth from "components/firebase/firebaseWithAuth";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import React, { useRef, useState } from "react";
import Spinner from "@panely/components/Spinner";
import Router from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

const ReactSwal = swalContent(Swal);
const toast = ReactSwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", ReactSwal.stopTimer);
    toast.addEventListener("mouseleave", ReactSwal.resumeTimer);
  },
});

// Set SweetAlert options
const alert = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});
function BadgetForm({ runnerId, saved, data, activityChange, pathwayId }) {
  const { badget } = data;
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Define Yup schema for form validation
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your name"),
    description: yup
      .string()
      .min(5, "Please enter at least 5 characters")
      .required("Please enter your description")
  });

  const { control, handleSubmit, errors } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
    defaultValues: {
      name: badget?.name || "",
      description: badget?.description || "",
    },
  });

  function saveBadget(data) {
    firestoreClient
        .collection("runners")
        .doc(runnerId)
        .update({
          badget: {
            ...data,
          },
        })
        .then((docRef) => {
          toast.fire({
            icon: "success",
            title: "Badget saved successfully",
          });
          activityChange({
            pathwayId: pathwayId,
            type: "edit_runner",
            msn: 'The "' + data.name + '" badget was changed.',
          });
          setLoading(false);
        })
        .catch((error) => {
          toast.fire({
            icon: "error",
            title: "Creation badget",
          });
          setLoading(false);

        });
  }

// Handle form submit event
  const onSubmit = (data) => {
    getQuestions(runnerId).then((questions) => {
      if(questions.length >= 4) {
        saveBadget(data);
      } else {
        alert.fire({
          icon: "error",
          title: "Oops...",
          text:'To create the badget there must be a quiz with more than 3 questions.',
        });
        setLoading(false);
      }
    });

  };


  const getQuestions =  (runnerId) => {
     return firestoreClient.collection("runners")
        .doc(runnerId)
        .collection("questions")
        .get()
        .then((querySnapshot) => {
          const list = [];
          querySnapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return list;
        });
  }

  return (
    <Form
      onSubmit={handleSubmit((data) => {
        setLoading(true);
        imageRef.current.getImage().then((url) => {
          onSubmit({ ...data, image: url });
        });
      })}
    >
      <Form.Group>
        <ImageEditor ref={imageRef} image={badget?.image} withPreview />
      </Form.Group>
      <Row>

        <Col xs="12">
          {/* BEGIN Form Group */}
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="text"
                id="badget-name"
                name="name"
                control={control}
                invalid={Boolean(errors.name)}
                placeholder="Insert your name"
              />
              <Label for="badget-name">Name</Label>
              {errors.name && <Form.Feedback children={errors.name.message} />}
            </FloatLabel>
          </Form.Group>
          {/* END Form Group */}

          {/* BEGIN Form Group */}
          <Form.Group>
            <FloatLabel>
              <Controller
                as={Input}
                type="textarea"
                id="badget-description"
                name="description"
                control={control}
                invalid={Boolean(errors.description)}
                placeholder="Insert your description"
              />
              <Label for="badget-description">Description</Label>
              {errors.description && (
                <Form.Feedback children={errors.description.message} />
              )}
            </FloatLabel>
          </Form.Group>
          {/* END Form Group */}

        </Col>
      </Row>
      <Button type="submit" variant="label-primary" size="lg" width="widest" disabled={!saved}>
        {loading && <Spinner className="mr-2" />} Save
      </Button>
      <Button
          type="button"
          className="ml-2"
          variant="label-secondary"
          size="lg"
          width="widest"
          onClick={() => {
            Router.back();
          }}
      >
        Cancel
      </Button>
    </Form>
  );
}


class FormBasePage extends React.Component {
  constructor(props) {
    super(props);
    if (!Router.query.runnerId) {
      Router.push("/pathway/create");
    }
    this.state = {
      runnerId: Router.query.runnerId,
      pathwayId: Router.query.pathwayId,
      saved: false,
    };
  }

  componentDidMount() {
    this.props.pageChangeHeaderTitle("Update Pathway");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      {
        text: "Pathway",
        link: "/pathway/edit?pathwayId=" + Router.query.pathwayId,
      },
      {
        text: "Runner",
        link: "/runner/create?pathwayId=" + Router.query.pathwayId,
      },
      { text: "Badget" },
    ]);
    firestoreClient
      .collection("runners")
      .doc(this.state.runnerId).get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({
            id: this.state.runnerId,
            pathwayId: this.state.pathwayId,
            saved: true,
            ...doc.data(),
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        toast.fire({
          icon: "error",
          title: "Getting a runner",
        });
      });
  }

  render() {
    if (!this.state.saved) {
      return <Spinner>Loading</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Runner | Badget</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Badget | Update</Portlet.Title>
                  <Portlet.Addon>
                    <BadgetAddon id={this.state.runnerId}  pathwayId={this.state.pathwayId}/>
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    This badge is awarded to the trainee if they successfully
                    complete the Quiz.{" "}
                  </p>
                  <hr />
                  <BadgetForm
                    activityChange={this.props.activityChange}
                    saved={this.state.saved}
                    runnerId={this.state.runnerId}
                    pathwayId={this.state.pathwayId}
                    data={this.state}
                  />
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const BadgetAddon  = ({id, pathwayId}) =>{
  return <>
    <Dropdown.Uncontrolled>
      <Dropdown.Toggle icon variant="text-secondary">
        <FontAwesomeIcon icon={SolidIcon.faEllipsisV} />
      </Dropdown.Toggle>
      <Dropdown.Menu right animated>
        <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/runner/quiz/create",
                query: {
                  runnerId: id,
                  pathwayId: pathwayId,
                },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faQuestion} />}
        >
          Add Quiz
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Uncontrolled>
  </>;
}

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(FormBasePage)));


