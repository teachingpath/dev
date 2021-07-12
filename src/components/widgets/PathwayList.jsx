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
          msn: 'El pathway "' + data.name + '" está publicado.',
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
        title: "¿Estas seguro/segura?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, bórralo!",
      })
      .then((result) => {
        if (result.value) {
          deletePathway(pathwayId)
            .then(() => {
              this.componentDidMount();
              this.props.activityChange({
                type: "delete_pathway",
                pathwayId: pathwayId,
                msn: "El pathway fue eliminado.",
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
              Nuevo
            </Button>
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          <RichList bordered action>
            {this.state.data === null && <Spinner />}
            {this.state.data && this.state.data.length === 0 && (
              <p className="text-center">No hay pathways aún.</p>
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
                            <Badge variant="label-info">En borrador</Badge>
                          ) : (
                            <Badge variant="label-success">Publicado</Badge>
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
              Eliminar
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
              Agregar Runner
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
              Agregar Trofeo
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
              Agregar Grupo
            </Dropdown.Item>
            {draft ? (
              <Dropdown.Item
                onClick={() => this.onPublishPathway(id)}
                icon={<FontAwesomeIcon icon={SolidIcon.faShareSquare} />}
              >
                Publicar
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                onClick={() => this.onUnpublishPathway(id)}
                icon={<FontAwesomeIcon icon={SolidIcon.faStop} />}
              >
                Despublicar
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
                  Catálogo
                </Dropdown.Item>
              )}
          </Dropdown.Menu>
        </Dropdown.Uncontrolled>
      </>
    );
  }
}

export default PathwaysComponent;
