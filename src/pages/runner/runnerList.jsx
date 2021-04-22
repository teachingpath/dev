import { RichList, Dropdown, Avatar } from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import { ReactSortable } from "react-sortablejs";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";

class RunnerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data || [],
    };

    this.onSortList = this.onSortList.bind(this);
  }

  componentDidMount() {
    firestoreClient
      .collection("runners")
      .where("pathwayId", "==", this.props.pathwayId)
      .orderBy("level")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            title: doc.data().name,
            subtitle: doc.data().description,
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

  onDelete(runnerId) {
    firestoreClient
      .collection("runners")
      .doc(runnerId)
      .delete()
      .then(() => {
        this.componentDidMount();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  onSortList(list) {
    list.forEach((item, level) => {
      firestoreClient
        .collection("runners")
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
    if (this.props.item?.runnerId !== nextProps.item?.runnerId) {
      this.componentDidMount();
    }
    return true;
  }

  render() {
    return (
      <RichList bordered action>
        <ReactSortable list={this.state.data} setList={this.onSortList}>
          {this.state.data.map((data, index) => {
            const { title, subtitle, id } = data;

            return (
              <RichList.Item key={index} href="javascript:void(0)">
                <RichList.Addon addonType="prepend">
                  {/* BEGIN Avatar */}
                  <Avatar display>
                    <FontAwesomeIcon icon={SolidIcon.faSort} />
                  </Avatar>
                  {/* END Avatar */}
                </RichList.Addon>
                <RichList.Content>
                  <RichList.Title>{title}</RichList.Title>
                  <RichList.Subtitle>{subtitle}</RichList.Subtitle>
                </RichList.Content>
                <RichList.Addon addonType="append">
                  {/* BEGIN Dropdown */}
                  <Dropdown.Uncontrolled>
                    <Dropdown.Toggle
                      icon
                      variant="text-secondary"
                      href="javascript:void(0)"
                    >
                      <FontAwesomeIcon icon={SolidIcon.faEllipsisH} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu right animated>
                      <Dropdown.Item
                        href="javascript:void(0)"
                        onClick={() => {
                          Router.push({
                            pathname: "/runner/edit",
                            query: {
                              runnerId: id,
                              pathwayId: this.props.pathwayId,
                            },
                          });
                        }}
                        icon={<FontAwesomeIcon icon={SolidIcon.faEdit} />}
                      >
                        Editar
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="javascript:void(0)"
                        onClick={() => {
                          this.onDelete(id);
                        }}
                        icon={<FontAwesomeIcon icon={SolidIcon.faTrashAlt} />}
                      >
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        href="javascript:void(0)"
                        onClick={() => {
                          Router.push({
                            pathname: "/runner/quiz",
                            query: {
                              runnerId: id,
                              pathwayId: this.props.pathwayId,
                            },
                          });
                        }}
                        icon={<FontAwesomeIcon icon={SolidIcon.faQuestion} />}
                      >
                        Add Quiz (Badget)
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="javascript:void(0)"
                        onClick={() => {
                          Router.push({
                            pathname: "/track/create",
                            query: {
                              runnerId: id,
                              pathwayId: this.props.pathwayId,
                            },
                          });
                        }}
                        icon={<FontAwesomeIcon icon={SolidIcon.faListOl} />}
                      >
                        Add Tracks
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

export default RunnerList;
