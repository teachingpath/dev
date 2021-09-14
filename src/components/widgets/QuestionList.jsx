import { RichList, Dropdown, Avatar } from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import Badge from "@panely/components/Badge";

import Swal from "@panely/sweetalert2"
import swalContent from "sweetalert2-react-content"
import { escapeHtml } from "components/helpers/mapper";
const ReactSwal = swalContent(Swal)
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1"
  },
  buttonsStyling: false
});

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
    this.onSortList = this.onSortList.bind(this);
  }

  componentDidMount() {
    firestoreClient
      .collection("runners")
      .doc(this.props.runnerId)
      .collection("questions")
     .orderBy("position")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const options = doc.data().options.length;
          const optionsCorrects = doc.data().options.filter(it => it.isCorrect).length;
          list.push({
            id: doc.id,
            title: doc.data().question,
            subtitle: "Opciones: "+options+"/"+optionsCorrects,
            type: doc.data().type,
          });
        });
        this.setState({
          ...this.state,
          data: list,
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }


  onDelete(questionId) {
    swal.fire({
      title: "¿Estas seguro/segura?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then(result => {
      if (result.value) {
        firestoreClient
            .collection("runners")
            .doc(this.props.runnerId)
            .collection("questions")
            .doc(questionId)
            .delete()
            .then(() => {
              this.componentDidMount();
            })
            .catch((error) => {
              console.error("Error removing document: ", error);
            });
      }
    })

  }

  onSortList(list) {
    list.forEach((item, position) => {
      firestoreClient
        .collection("runners")
        .doc(this.props.runnerId)
        .collection("questions")
        .doc(item.id)
        .update({
          position: position,
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    });
    this.setState({ data: list });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data?.questionId !== nextProps.data?.questionId) {
      this.componentDidMount();
    }
    return true;
  }

  render() {
    return (
      <RichList bordered action>
        {this.state.data.length === 0 && (
          <p className="text-center">Aún no tiene preguntas.</p>
        )}
        <ReactSortable list={this.state.data} setList={this.onSortList} className="list">
          {this.state.data.map((data, index) => {
            const { title, subtitle, type, id } = data;

            return (
              <RichList.Item key={index}>
                <RichList.Addon addonType="prepend">
                  <Avatar display>
                    <FontAwesomeIcon icon={SolidIcon.faSort} />
                  </Avatar>
                </RichList.Addon>
                <RichList.Content>
                  <RichList.Title
                    onClick={() => {
                      Router.push({
                        pathname: "/runner/quiz/edit",
                        query: {
                          questionId: id,
                          runnerId: this.props.runnerId,
                          pathwayId: this.props.pathwayId,
                        },
                      });
                    }}
                  >
                    {index +1}. {escapeHtml(title)}
                  </RichList.Title>
                  <RichList.Subtitle>{subtitle}</RichList.Subtitle>
                  <RichList.Subtitle>
                    <Badge variant="label-info">{type}</Badge>
                  </RichList.Subtitle>
                </RichList.Content>
                <RichList.Addon addonType="append">
                  <Dropdown.Uncontrolled>
                    <Dropdown.Toggle icon variant="text-secondary">
                      <FontAwesomeIcon icon={SolidIcon.faEllipsisH} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu right animated>
                      <Dropdown.Item
                        onClick={() => {
                          Router.push({
                            pathname: "/runner/quiz/edit",
                            query: {
                              questionId: id,
                              runnerId: this.props.runnerId,
                              pathwayId: this.props.pathwayId,
                            },
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
                    </Dropdown.Menu>
                  </Dropdown.Uncontrolled>
                </RichList.Addon>
              </RichList.Item>
            );
          })}
        </ReactSortable>
      </RichList>
    );
  }
}

export default QuestionList;
