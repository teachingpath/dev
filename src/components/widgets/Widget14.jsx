import { Badge, Portlet, Dropdown, RichList, Button } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import { firestoreClient } from "components/firebase/firebaseClient";

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

  onDelete(pathwayId) {
    firestoreClient
      .collection("pathways")
      .doc(pathwayId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.componentDidMount();
        this.props.activityChange({
          type: "edit_pathway",
          pathwayId: pathwayId,
          type: "delete_pathway"
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
          <Portlet.Addon>
            {/* BEGIN Dropdown */}
            <Dropdown.Uncontrolled>
              <Dropdown.Toggle caret variant="label-primary">
                Status
              </Dropdown.Toggle>
              <Dropdown.Menu right animated>
                <Dropdown.Item href="#">
                  <Badge variant="label-success">Published</Badge>
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <Badge variant="label-info">In draft</Badge>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Uncontrolled>
            {/* END Dropdown */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Rich List */}
          <RichList bordered action>
            {this.state.data.map((data, index) => {
              const { name, description, id } = data;

              return (
                <RichList.Item key={index}>
                  <RichList.Content>
                    <RichList.Title children={name} />
                    <RichList.Subtitle children={description} />
                  </RichList.Content>
                  <RichList.Addon addonType="append">
                    {/* BEGIN Dropdown */}
                    <Dropdown.Uncontrolled>
                      <Dropdown.Toggle icon variant="text-secondary">
                        <FontAwesomeIcon icon={SolidIcon.faEllipsisH} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu right animated>
                 
                        <Dropdown.Item
                           href="javascript:void(0)"
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
                              pathname: "/runner/create",
                              query: { pathwayId: id },
                            });
                          }}
                          icon={<FontAwesomeIcon icon={SolidIcon.faRunning} />}
                        >
                          Add runner
                        </Dropdown.Item>
                        <Dropdown.Item
                           href="javascript:void(0)"
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
