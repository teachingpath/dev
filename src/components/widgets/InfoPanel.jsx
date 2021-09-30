import {
  Avatar,
  Modal,
  Portlet,
  RichList,
  Widget10,
  Widget8,
  Dropdown,
} from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { firestoreClient } from "../firebase/firebaseClient";
import Button from "@panely/components/Button";
import React from "react";
import Progress from "@panely/components/Progress";
import { groupBy } from "components/helpers/array";
import Accordion from "@panely/components/Accordion";
import Collapse from "@panely/components/Collapse";
import Card from "@panely/components/Card";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import { deleteJourney } from "consumer/journey";
import Router from "next/router";
const ReactSwal = swalContent(Swal);
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

class InfoPanelComponent extends React.Component {
  state = {
    isOpenTraineesRunning: false,
    data: [
      {
        title: "100%",
        subtitle: "Popularidad",
        avatar: () => (
          <Widget8.Avatar
            display
            circle
            variant="label-primary"
            className="m-0"
          >
            <FontAwesomeIcon icon={SolidIcon.faRocket} />
          </Widget8.Avatar>
        ),
        data: [],
      },
      {
        title: "0",
        subtitle: "Corriendo (con seguimiento)",
        avatar: () => (
          <Widget8.Avatar
            display
            circle
            variant="label-success"
            className="m-0"
          >
            <FontAwesomeIcon icon={SolidIcon.faRunning} />
          </Widget8.Avatar>
        ),
        data: [],
      },
      {
        title: "0",
        subtitle: "Finalizado (con seguimiento)",
        avatar: () => (
          <Widget8.Avatar display circle variant="label-danger" className="m-0">
            <FontAwesomeIcon icon={SolidIcon.faCheck} />
          </Widget8.Avatar>
        ),
        data: [],
      },
    ],
  };

  componentDidMount() {
    firestoreClient
      .collection("pathways")
      .where("leaderId", "==", this.props.firebase.user_id)
      .where("isFollowUp", "==", true)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.id);
        });
        firestoreClient
          .collection("journeys")
          .where("pathwayId", "in", list)
          .orderBy("date", "desc")
          .get()
          .then((querySnapshot) => {
            const finisheds = [];
            const inRunning = [];
            querySnapshot.forEach(async (doc) => {
              const data = doc.data();
              data.id = doc.id;
              if (data.progress >= 100) {
                finisheds.push(data);
              } else {
                inRunning.push(data);
              }
              const dataSummary = this.state.data;
              dataSummary[1].data = inRunning;
              dataSummary[2].data = finisheds;

              this.setState({
                data: dataSummary,
              });
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    return (
      <Portlet>
        <Widget10 vertical="md">
          {this.state.data.map((data, index) => {
            const { title, subtitle, avatar: WidgetAvatar } = data;

            return (
              <Widget10.Item key={index}>
                <Widget10.Content>
                  <Widget10.Title
                    children={
                      data.data.length ? (
                        <InfoModal
                          title={title}
                          data={data.data}
                          subtitle={subtitle}
                        />
                      ) : (
                        title
                      )
                    }
                  />
                  <Widget10.Subtitle children={subtitle} />
                </Widget10.Content>
                <Widget10.Addon>
                  <WidgetAvatar />
                </Widget10.Addon>
              </Widget10.Item>
            );
          })}
        </Widget10>
      </Portlet>
    );
  }
}

class InfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeCard: -1,
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleAccordion = (id) => {
    if (this.state.activeCard === id) {
      this.setState({ ...this.state, activeCard: null });
    } else {
      this.setState({ ...this.state, activeCard: id });
    }
  };

  onDelete(id) {
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
          deleteJourney(id).then(() => {
            Router.reload();
          });
        }
      });
  }

  render() {
    const activeCard = this.state.activeCard;
    const dataList = groupBy(this.props.data, "group");
    return (
      <React.Fragment>
        <a href={"#"} onClick={this.toggle}>
          {this.props.data.length}
        </a>

        <Modal
          scrollable
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          className="modal-xl"
        >
          <Modal.Header toggle={this.toggle}>
            {this.props.subtitle}
          </Modal.Header>
          <Modal.Body>
            <RichList bordered action>
              <Accordion>
                {Object.keys(dataList).map((group, index) => {
                  return (
                    <Card key={"accordion-"+index}>
                      <Card.Header
                        title="Click para expandir"
                        collapsed={!(activeCard === index)}
                        onClick={() => this.toggleAccordion(index)}
                      >
                        <Card.Title>{group.toUpperCase()}</Card.Title>
                      </Card.Header>

                      <Collapse isOpen={activeCard === index}>
                      <Portlet.Addon className="float-right">
                          <Dropdown.Uncontrolled>
                            <Dropdown.Toggle icon variant="text-secondary">
                              <FontAwesomeIcon icon={SolidIcon.faEllipsisH} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu right animated>
                              <Dropdown.Item
                                onClick={() => {
                                  swal
                                    .fire({
                                      title:"¿Estas seguro/segura que deseas enviar reporte?",
                                      text: "Se enviará un reporte a todos los suscritos",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "¡Sí, enviar!",
                                    })
                                    .then((result) => {
                                      if (result.value) {
                                        const pathwayId =  dataList[group][0].pathwayId;
                                        const url = "/api/resumen?pathwayId=" + pathwayId;
                                        fetch(url).then((res) => {
                                          swal.fire({
                                            text: "Se envio un correo con el reporte a todos los inscriptos al pathway.",
                                            icon: "info",
                                          });
                                        });
                            
                                      }
                                    });
                                }}
                                icon={
                                  <FontAwesomeIcon icon={SolidIcon.faReply} />
                                }
                              >
                                Enviar reporte a todos los aprendices
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown.Uncontrolled>
                        </Portlet.Addon>
                        {dataList[group].map((data, index) => {
                          const { name, date, progress, id, user } = data;
                          const dateUpdated = new Date(
                            (date.seconds + date.nanoseconds * 10 ** -9) * 1000
                          );
                          return (
                            <Card.Body className="m-0" key={"group"+index}>
                              <h5 className="mt-3">{user.displayName}</h5>
                              <RichList.Item
                                title={"Usuario: " + user.email}
                              >
                                <RichList.Addon addonType="prepend">
                                  <Avatar block={true}>
                                    <FontAwesomeIcon
                                      icon={SolidIcon.faUserAlt}
                                    />
                                  </Avatar>
                                </RichList.Addon>
                                <RichList.Content>
                                  <RichList.Title
                                    onClick={() => {
                                      Router.push("/pathway/resume?id=" + id);
                                    }}
                                    children={
                                      <Progress
                                        striped
                                        className="mr-2 mb-2"
                                        value={progress.toFixed(2)}
                                      >
                                        {progress.toFixed(2)}%
                                      </Progress>
                                    }
                                  />

                                  <RichList.Title
                                    children={name}
                                    onClick={() => {
                                      Router.push("/pathway/resume?id=" + id);
                                    }}
                                  />
                                  <RichList.Subtitle
                                    children={
                                      "Fecha: " +
                                      dateUpdated.toLocaleDateString() +
                                      " " +
                                      dateUpdated.toLocaleTimeString()
                                    }
                                  />
                                </RichList.Content>
                                <RichList.Addon addonType="prepend">
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      this.onDelete(id);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={SolidIcon.faTrash} />
                                  </Button>
                                </RichList.Addon>
                              </RichList.Item>
                            </Card.Body>
                          );
                        })}
                      </Collapse>
                    </Card>
                  );
                })}
              </Accordion>
            </RichList>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="mr-2"
              title={"Close modal"}
              onClick={() => {
                this.toggle();
              }}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default InfoPanelComponent;
