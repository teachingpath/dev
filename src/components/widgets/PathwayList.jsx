import { Badge, Button, Dropdown, Portlet, RichList } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";

import swalContent from "sweetalert2-react-content";
import Swal from "@panely/sweetalert2";
import Spinner from "@panely/components/Spinner";
import {
  deletePathway,
  getMyPathways,
  publishPathway,
  unpublushPathway,
} from "consumer/pathway";

const ReactSwal = swalContent(Swal);
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

class PathwaysComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    getMyPathways(
      (data) => {
        this.setState(data);
      },
      () => {}
    );
  }

  onPublishPathway(pathwayId) {
    publishPathway(
      pathwayId,
      (data) => {
        this.componentDidMount();
        this.props.activityChange({
          type: "publish_pathway",
          pathwayId: pathwayId,
          msn: 'The pathway "' + data.name + '" is published.',
        });
      },
      (error) => {
        swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      }
    );
  }

  onUnpublishPathway(pathwayId) {
    unpublushPathway(pathwayId).then(() => {
      this.componentDidMount();
    });
  }

  onDelete(pathwayId) {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.value) {
          deletePathway(pathwayId)
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
            {this.state.data === null && <Spinner />}
            {this.state.data && this.state.data.length === 0 && (
              <p className="text-center">Empty pathways</p>
            )}
            {this.state.data &&
              this.state.data.map((data, index) => {
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
                      {this.getAddon(id, draft)}
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

  getAddon(id, draft) {
    return (
      <>
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
              Add trophy
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                Router.push({
                  pathname: "/pathway/group",
                  query: { pathwayId: id },
                });
              }}
              icon={<FontAwesomeIcon icon={SolidIcon.faObjectGroup} />}
            >
              Add group
            </Dropdown.Item>
            {draft ? (
              <Dropdown.Item
                onClick={() => this.onPublishPathway(id)}
                icon={<FontAwesomeIcon icon={SolidIcon.faShareSquare} />}
              >
                Publish
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                onClick={() => this.onUnpublishPathway(id)}
                icon={<FontAwesomeIcon icon={SolidIcon.faStop} />}
              >
                Unpublish
              </Dropdown.Item>
            )}

            {draft === false &&  (
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
      </>
    );
  }
}

export default PathwaysComponent;
