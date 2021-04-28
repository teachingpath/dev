import { Badge, Portlet, Dropdown, RichList, Button } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import { firestoreClient } from "components/firebase/firebaseClient";

import swalContent from "sweetalert2-react-content";
import Swal from "@panely/sweetalert2";

const ReactSwal = swalContent(Swal);

// Set SweetAlert options
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

class Widget14Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    firestoreClient
      .collection("pathways")
      .where("leaderId", "==", this.props.firebase.user_id)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.setState({ data: list });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  publishPathway(pathwayId) {
    firestoreClient
      .collection("pathways")
      .doc(pathwayId)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          const data = doc.data();

          if (!Object.keys(data.trophy || {}).length) {
            swal.fire({
              icon: "error",
              title: "Oops...",
              text: "The pathway requires a trophy to publish it.",
            });
            return;
          }
          const runners = await firestoreClient
            .collection("runners")
            .where("pathwayId", "==", pathwayId)
            .orderBy("level")
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

          for (const key in runners) {
            if (!Object.keys(runners[key].badget || {}).length) {
              swal.fire({
                icon: "error",
                title: "Oops...",
                text:
                  'The runner "' +
                  runners[key].name +
                  '" requires a badget to publish this pathway.',
              });
              return;
            }

            const tracks = await firestoreClient
              .collection("runners")
              .doc(runners[key].id)
              .collection("tracks")
              .orderBy("level")
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

            if (tracks.length < 2) {
              swal.fire({
                icon: "error",
                title: "Oops...",
                text:
                  'The runner "' +
                  runners[key].name +
                  '" requires a minimum of 3 tracks to be able to publish the pathway.',
              });
              return;
            }
          }

          this.onPublish(pathwayId, data.name);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  onPublish(pathwayId, name) {
    firestoreClient
      .collection("pathways")
      .doc(pathwayId)
      .update({ draft: false })
      .then(() => {
        console.log("Document successfully deleted!");
        this.componentDidMount();
        this.props.activityChange({
          type: "publish_pathway",
          pathwayId: pathwayId,
          msn: 'The pathway "' + name + '" is published.',
        });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  onDelete(pathwayId) {
    firestoreClient
      .collection("pathways")
      .doc(pathwayId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.componentDidMount();
        this.props.activityChange({
          type: "delete_pathway",
          pathwayId: pathwayId,
          msn: "The pathway deleted.",
        });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    return (
      <Portlet>
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faRoute} />
          </Portlet.Icon>
          <Portlet.Title>Pathways</Portlet.Title>
          <Portlet.Addon>
            <Button
              onClick={() => {
                Router.push("/pathway/create");
              }}
            >
              New
            </Button>
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Rich List */}
          <RichList bordered action>
            {this.state.data.length === 0 && (
              <p className="text-center">Empty pathways</p>
            )}
            {this.state.data.map((data, index) => {
              const { name, description, id, draft } = data;
              return (
                <RichList.Item key={index}>
                  <RichList.Content
                    onClick={() => {
                      Router.push({
                        pathname: "/pathway/edit",
                        query: { pathwayId: id },
                      });
                    }}
                  >
                    <RichList.Title children={name.toUpperCase()} />
                    <RichList.Subtitle children={description} />
                    <RichList.Subtitle
                      children={
                        draft ? (
                          <Badge variant="label-info">In draft</Badge>
                        ) : (
                          <Badge variant="label-success">Published</Badge>
                        )
                      }
                    />
                  </RichList.Content>
                  <RichList.Addon addonType="append">
                    {/* BEGIN Dropdown */}
                    <Dropdown.Uncontrolled>
                      <Dropdown.Toggle icon variant="text-secondary">
                        <FontAwesomeIcon icon={SolidIcon.faEllipsisH} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu right animated>
                        <Dropdown.Item
                          onClick={() => {
                            Router.push({
                              pathname: "/pathway/edit",
                              query: { pathwayId: id },
                            });
                          }}
                          icon={<FontAwesomeIcon icon={SolidIcon.faEdit} />}
                        >
                          Editar
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            this.onDelete(id);
                          }}
                          icon={<FontAwesomeIcon icon={SolidIcon.faTrashAlt} />}
                        >
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          onClick={() => {
                            Router.push({
                              pathname: "/runner/create",
                              query: { pathwayId: id },
                            });
                          }}
                          icon={<FontAwesomeIcon icon={SolidIcon.faRunning} />}
                        >
                          Add runner
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            Router.push({
                              pathname: "/pathway/trophy",
                              query: { pathwayId: id },
                            });
                          }}
                          icon={<FontAwesomeIcon icon={SolidIcon.faTrophy} />}
                        >
                          Add Trophy
                        </Dropdown.Item>

                        {draft ? (
                          <Dropdown.Item
                            onClick={() => this.publishPathway(id)}
                            icon={
                              <FontAwesomeIcon icon={SolidIcon.faShareSquare} />
                            }
                          >
                            Publish
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={() => {
                              Router.push({
                                pathname: "/catalog/pathway/",
                                query: { id: id },
                              });
                            }}
                            icon={<FontAwesomeIcon icon={SolidIcon.faThList} />}
                          >
                            Catalog
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown.Uncontrolled>
                    {/* END Dropdown */}
                  </RichList.Addon>
                </RichList.Item>
              );
            })}
          </RichList>
          {/* END Rich List */}
        </Portlet.Body>
      </Portlet>
    );
  }
}

export default Widget14Component;
