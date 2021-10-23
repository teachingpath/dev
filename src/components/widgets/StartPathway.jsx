import { Widget1, Progress } from "@panely/components";
import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import Router from "next/router";
import Button from "@panely/components/Button";
import uuid from "components/helpers/uuid";
import Spinner from "@panely/components/Spinner";
import React from "react";
import swalContent from "sweetalert2-react-content";
import Swal from "@panely/sweetalert2";
import Modal from "@panely/components/Modal";
import RichList from "@panely/components/RichList";
import { createSlug } from "components/helpers/mapper";
import { sendStartPathway } from "consumer/sendemail";
const ReactSwal = swalContent(Swal);

const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

class StartPathway extends React.Component {
  state = {
    journeyId: null,
    loading: null,
  };
  componentDidMount() {
    const { pathwayId } = this.props;
    const user = firebaseClient.auth().currentUser;
    if (user) {
      firestoreClient
        .collection("journeys")
        .where("userId", "==", user.uid)
        .where("pathwayId", "==", pathwayId)
        .limit(1)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const queryDocumentSnapshot = querySnapshot.docs[0];
            this.setState({
              journeyId: queryDocumentSnapshot.id,
              ...queryDocumentSnapshot.data(),
            });
          } else {
            console.log("No such journeys!");
          }
        })
        .catch((error) => {
          console.log("Error getting journeys: ", error);
        });
    }
  }

  onCreateJourney(leaderId, pathwayId, journeyId, trophy, name, group) {
    const user = firebaseClient.auth().currentUser;
    const tabs = this.props.runnersRef.current.state.tabs;
    const breadcrumbs = this.createBreadcrumbsBy(tabs, journeyId);
    return this.createJourney(
      leaderId,
      group,
      breadcrumbs,
      journeyId,
      name,
      trophy,
      pathwayId,
      user
    );
  }

  createJourney(
    leaderId,
    group,
    breadcrumbs,
    journeyId,
    name,
    trophy,
    pathwayId,
    user
  ) {
    return Promise.all(breadcrumbs).then((dataResolved) => {
      const groupSlug = createSlug(name + " " + group);
      return firestoreClient
        .collection("journeys")
        .doc(journeyId)
        .set({
          leaderId: leaderId,
          group: groupSlug,
          groupName: group,
          name: name,
          trophy: trophy,
          progress: 1,
          pathwayId: pathwayId,
          userId: user.uid,
          user: {
            email: user.email,
            displayName: user.displayName,
          },
          date: new Date(),
          current: 0,
          breadcrumbs: dataResolved,
        })
        .then((doc) => {
          const linkResume = journeyId
            ? '<i><a href="/pathway/resume?id=' +
              journeyId +
              '">' +
              user.displayName +
              "</a></i>"
            : "<i>" + user.displayName + "</i>";

          this.props.activityChange({
            type: "start_pathway",
            msn: 'Inicia pathway "' + name + '".',
            msnForGroup:
              linkResume + ' inició el pathway "<b>' + name + '</b>".',
            group: groupSlug,
          });

          Router.push({
            pathname: "/catalog/journey",
            query: {
              id: journeyId,
            },
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    });
  }

  createBreadcrumbsBy(tabs, journeyId) {
    const breadcrumbs = tabs.map(async (data, runnerIndex) => {
      const quiz = await this.getQuizFromRunner(data);
      await this.saveJourneyForBadge(journeyId, data);

      return {
        id: data.id,
        name: data.title,
        description: data.subtitle,
        feedback: data.feedback,
        current: runnerIndex === 0 ? 0 : null,
        quiz: quiz,
        tracks: data.data.map((item, trackIndex) => {
          return {
            ...item,
            timeLimit: item.time,
            time: item.time * 10 * 60000,
            status: runnerIndex === 0 && trackIndex === 0 ? "process" : "wait",
          };
        }),
      };
    });
    return breadcrumbs;
  }

  async saveJourneyForBadge(journeyId, data) {
    await firestoreClient
      .collection("journeys")
      .doc(journeyId)
      .collection("badge")
      .doc(data.id)
      .set({
        ...data.badge,
        disabled: true,
      });
  }

  async getQuizFromRunner(data) {
    const quiz = await firestoreClient
      .collection("runners")
      .doc(data.id)
      .collection("questions")
      .get()
      .then((querySnapshot) => {
        const questions = [];
        querySnapshot.forEach((doc) => {
          questions.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        return questions;
      });
    return quiz;
  }

  render() {
    const user = firebaseClient.auth().currentUser;
    const { pathwayId, trophy, name, leaderId } = this.props;
    const { loading } = this.state;
    const journeyId = uuid();

    if (!user) {
      return <Login />;
    }

    return this.state.journeyId ? (
      <StatusProgress
        progress={this.state.progress.toFixed(2)}
        journeyId={this.state.journeyId}
      />
    ) : (
      <StartPathwayButton
        loading={loading}
        pathwayId={pathwayId}
        onStart={(group) => {
          this.setState({
            ...this.state,
            loading: true,
          });
          sendStartPathway(user.email, name).then(() => {
            this.onCreateJourney(
              leaderId,
              pathwayId,
              journeyId,
              trophy,
              name,
              group
            );
          });
        }}
      />
    );
  }
}

const StatusProgress = ({ progress, journeyId }) => {
  return (
    <Widget1.Group>
      <Widget1.Title>
        Progress
        <Progress striped variant="dark" value={progress} className="mr-5 w-50">
          {progress}%
        </Progress>
      </Widget1.Title>
      <Widget1.Addon>
        <Button
          onClick={() => {
            Router.push({
              pathname: "/catalog/journey",
              query: {
                id: journeyId,
              },
            });
          }}
        >
          Ir al journey
        </Button>
      </Widget1.Addon>
    </Widget1.Group>
  );
};

const Login = () => {
  return (
    <Button
      className="w-25"
      onClick={() => {
        Router.push({
          pathname: "/login",
          query: {
            redirect: window.location.href,
          },
        });
      }}
    >
      Iniciar Pathway
    </Button>
  );
};

class StartPathwayButton extends React.Component {
  state = { isOpen: false, data: [] };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  componentDidMount() {
    firestoreClient
      .collection("pathways")
      .doc(this.props.pathwayId)
      .get()
      .then((doc) => {
        const groups = doc.data()?.groups || [];
        this.setState({ ...this.state, data: groups });
      });
  }

  onSubmitPathwayGroup = () => {
    swal
      .fire({
        title: "Seleccione una sala",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Buscar",
        showLoaderOnConfirm: true,
        preConfirm: (group) => {
          return Promise.resolve({
            groups: this.state.data,
            group: this.state.data.filter(
              (g) => g.name === group || g.slug === group
            ),
            status: this.state.data.some(
              (g) => g.name === group || g.slug === group
            ),
          });
        },
        allowOutsideClick: () => !swal.isLoading(),
      })
      .then((result) => {
        if (result.value && result.value.status) {
          this.props.onStart(result.value.group[0].slug);
        } else {
          swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La sala no existe para este pathway.",
          });
        }
      });
  };

  render() {
    return (
      <>
        <Button onClick={this.toggle} className="w-25">
          Iniciar Pathway
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <Modal.Header toggle={this.toggle}>Selecciona una sala</Modal.Header>
          <Modal.Body>
            <p className="mb-0">
              {this.props.loading && <Spinner className="mr-2" />}
              Seleccione una sala para trabajar el pathway como grupo
            </p>
            <RichList bordered action>
              {this.state.data === null && <Spinner className="mr-2" />}

              {this.state.data && this.state.data.length === 0 && (
                <p className="text-center">No existe salas para este pathway</p>
              )}
              {this.state.data
                .filter((item) => item.isPrivate !== true)
                .map((data, index) => {
                  const { name, slug } = data;
                  return (
                    <RichList.Item key={index}>
                      <RichList.Content
                        onClick={() => {
                          this.props.onStart(slug);
                        }}
                      >
                        <RichList.Title children={name.toUpperCase()} />
                      </RichList.Content>
                    </RichList.Item>
                  );
                })}
            </RichList>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="mr-2"
              onClick={this.onSubmitPathwayGroup}
            >
              Ingrese una sala privada
            </Button>
            <Button variant="outline-danger" onClick={this.toggle}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </>
    );
  }
}

export default StartPathway;
