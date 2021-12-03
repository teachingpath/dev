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
import { pathwayFollowUp } from "consumer/pathway";
import { createSlug } from "components/helpers/mapper";
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
        title: "...",
        subtitle: "Pathways iniciados",
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
        title: "...",
        subtitle: "Pathways finalizados",
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
    pathwayFollowUp(this.props.firebase.user_id, (result) => {
      const dataSummary = this.state.data;
      dataSummary[1].data = result.inRunning;
      dataSummary[2].data = result.finisheds;
      dataSummary[1].title = result.inRunning.length;
      dataSummary[2].title = result.finisheds.length;

      this.setState({
        data: dataSummary,
        loading: false,
      });
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
  state = {
    isOpen: false,
    activeCard: -1,
  };
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
    const dataList = groupBy(this.props.data, "groupName");
    return (
      <React.Fragment>
        <a href={"#"} onClick={this.toggle}>
          {this.props.data.length}
        </a>

        <Modal
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          className="modal-xl"
        >
          <Modal.Header toggle={this.toggle}>
            {this.props.subtitle}
          </Modal.Header>
          <Modal.Body>
            {Object.keys(dataList).map((group, index) => {
              const data = groupBy(dataList[group], "name");

              return (
                <div key={"group-id" + index}>
                  <h5>{group.toUpperCase()}</h5>
                  <ListItemGroup
                    dataList={data}
                    toggleAccordion={this.toggleAccordion}
                    onDelete={this.onDelete}
                    activeCard={activeCard}
                  />
                </div>
              );
            })}
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

const ListItemGroup = ({ dataList, onDelete, activeCard, toggleAccordion }) => {
  return (
    <RichList bordered action>
      <Accordion>
        {Object.keys(dataList).map((group, index) => {
          return (
            <Card key={createSlug(group)+"-" + index}>
              <Card.Header
                title="Click para expandir"
                collapsed={!(activeCard === createSlug(group)+"-" + index)}
                onClick={() => toggleAccordion(createSlug(group)+"-" + index)}
              >
                <Card.Title>{group.toUpperCase()}</Card.Title>
              </Card.Header>

              <Collapse isOpen={activeCard === createSlug(group)+"-" + index}>
                <Portlet.Addon className="float-right">
                  <Dropdown.Uncontrolled>
                    <Dropdown.Toggle icon variant="text-secondary">
                      <FontAwesomeIcon icon={SolidIcon.faCog} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu right animated>
                      <Dropdown.Item
                        onClick={() => {
                          swal
                            .fire({
                              title:
                                "¿Estas seguro/segura que deseas enviar reporte?",
                              text: "Se enviará un reporte a todos los suscritos",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "¡Sí, enviar!",
                            })
                            .then((result) => {
                              if (result.value) {
                                const pathwayId = dataList[group][0].pathwayId;
                                const url =
                                  "/api/resumen?pathwayId=" + pathwayId;
                                fetch(url).then((res) => {
                                  swal.fire({
                                    text: "Se envio un correo con el reporte a todos los inscriptos al pathway.",
                                    icon: "info",
                                  });
                                });
                              }
                            });
                        }}
                        icon={<FontAwesomeIcon icon={SolidIcon.faReply} />}
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
                    <Card.Body className="m-0" key={"group" + index}>
                      <h5 className="mt-3">{user.displayName}</h5>
                      <RichList.Item title={"Usuario: " + user.email}>
                        <RichList.Addon addonType="prepend">
                          <Avatar block={true}>
                            <FontAwesomeIcon icon={SolidIcon.faUserAlt} />
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
                              onDelete(id);
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
  );
};

export default InfoPanelComponent;
