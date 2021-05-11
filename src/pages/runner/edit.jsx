import {
  Button,
  Col,
  Container,
  Dropdown,
  Portlet,
  RichList,
  Row,
} from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import {
  activityChange,
  breadcrumbChange,
  pageChangeHeaderTitle,
  loadRunner
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import Router from "next/router";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import Spinner from "@panely/components/Spinner";
import RunnerForm from "../../components/widgets/RunnerForm";
import TrackList from "../../components/widgets/TrackList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import React from "react";

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

class FormBasePage extends React.Component {
  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    if (!Router.query.pathwayId || !Router.query.runnerId) {
      Router.push("/pathway/create");
    }
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
      { text: "Edit" },
    ]);
  }

  onEdit(data) {
    const runner = this.props.runner;
    return firestoreClient
      .collection("runners")
      .doc(runner.runnerId)
      .update({
        ...data,
      })
      .then((docRef) => {
        toast.fire({
          icon: "success",
          title: "Runner saved successfully",
        });
        this.props.activityChange({
          pathwayId: runner.pathwayId,
          type: "edit_runner",
          msn: 'The "' + data.name + '" runner was updated.',
          ...data,
        });  
        this.props.loadRunner({
          runnerId: runner.runnerId, 
          pathwayId: runner.pathwayId,
          ...data
        });
        return firestoreClient
          .collection("pathways")
          .doc(runner.pathwayId)
          .update({
            draft: true,
          });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.fire({
          icon: "error",
          title: "Creation runner",
        });
      });
  }

  render() {
    const runner = this.props.runner;
    if (!runner) {
      return <Spinner>Loading</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Runner | Update</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Runner | Update</Portlet.Title>
                  <Portlet.Addon>
                    <RunnerAddon
                      id={runner.runnerId}
                      pathwayId={runner.pathwayId}
                    />
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    After creating the Pathway you must create the runners to
                    add the tracks.
                  </p>
                  <hr />
                  <RunnerForm onSave={this.onEdit} data={runner} />
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Tracks</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <TrackList
                    runnerId={runner.runnerId}
                    pathwayId={runner.pathwayId}
                    data={runner}
                  />
                </Portlet.Body>
                <Portlet.Footer>
                  <Button
                    type="button"
                    className="float-right"
                    onClick={() => {
                      Router.push({
                        pathname: "/track/create",
                        query: {
                          runnerId: runner.runnerId,
                          pathwayId: runner.pathwayId,
                        },
                      });
                    }}
                  >
                    Add Tracks
                    <FontAwesomeIcon className="ml-2" icon={SolidIcon.faPlus} />
                  </Button>
                </Portlet.Footer>
              </Portlet>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const RunnerAddon = ({ id, pathwayId }) => {
  return (
    <>
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
          <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/runner/badget",
                query: {
                  runnerId: id,
                  pathwayId: pathwayId,
                },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faTrophy} />}
          >
            Add Badget
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              Router.push({
                pathname: "/track/create",
                query: {
                  runnerId: id,
                  pathwayId: pathwayId,
                },
              });
            }}
            icon={<FontAwesomeIcon icon={SolidIcon.faListOl} />}
          >
            Add Tracks
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
    </>
  );
};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange, loadRunner },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    runner: state.pathway.runnerSeleted,
  };
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withAuth(withLayout(FormBasePage)));
