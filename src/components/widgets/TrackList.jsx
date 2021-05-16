import { RichList, Dropdown, Avatar } from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import Badge from "@panely/components/Badge";

import Swal from "@panely/sweetalert2"
import swalContent from "sweetalert2-react-content"
const ReactSwal = swalContent(Swal)
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1"
  },
  buttonsStyling: false
});


class TrackList extends React.Component {
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
      .collection("tracks")
      .orderBy("level")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            title: doc.data().name,
            subtitle: doc.data().description,
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

  onDelete(trackId) {
    swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        firestoreClient
            .collection("runners")
            .doc(this.props.runnerId)
            .collection("tracks")
            .doc(trackId)
            .delete()
            .then(() => {
              console.log("Document successfully deleted!");
              this.componentDidMount();
            })
            .catch((error) => {
              console.error("Error removing document: ", error);
            });
      }
    })

  }

  onSortList(list) {
    list.forEach((item, level) => {
      firestoreClient
        .collection("runners")
        .doc(this.props.runnerId)
        .collection("tracks")
        .doc(item.id)
        .update({
          level: level,
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    });
    this.setState({ data: list });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data?.trackId !== nextProps.data?.trackId) {
      this.componentDidMount();
    }
    return true;
  }

  render() {
    return (
      <RichList bordered action>
        {this.state.data.length === 0 && (
          <p className="text-center">Empty tracks</p>
        )}
        <ReactSortable list={this.state.data} setList={this.onSortList}>
          {this.state.data.map((data, index) => {
            const { title, subtitle, type, id } = data;

            return (
              <RichList.Item key={index}>
                <RichList.Addon addonType="prepend">
                  {/* BEGIN Avatar */}
                  <Avatar display>
                    <FontAwesomeIcon icon={SolidIcon.faSort} />
                  </Avatar>
                  {/* END Avatar */}
                </RichList.Addon>
                <RichList.Content>
                  <RichList.Title
                    onClick={() => {
                      Router.push({
                        pathname: "/track/edit",
                        query: {
                          trackId: id,
                          runnerId: this.props.runnerId,
                          pathwayId: this.props.pathwayId,
                        },
                      });
                    }}
                  >
                    {title}
                  </RichList.Title>
                  <RichList.Subtitle>{subtitle}</RichList.Subtitle>
                  <RichList.Subtitle>
                    <Badge variant="label-info">{type}</Badge>
                  </RichList.Subtitle>
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
                            pathname: "/track/edit",
                            query: {
                              trackId: id,
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
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Uncontrolled>
                  {/* END Dropdown */}
                </RichList.Addon>
              </RichList.Item>
            );
          })}
        </ReactSortable>
      </RichList>
    );
  }
}

export default TrackList;
