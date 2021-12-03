import { Portlet, RichList, Button } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import { firestoreClient } from "components/firebase/firebaseClient";
import Progress from "@panely/components/Progress";
import { deleteJourney } from "consumer/journey";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
const ReactSwal = swalContent(Swal);
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

class JourneyListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    firestoreClient
      .collection("journeys")
      .where("userId", "==", this.props.user.uid)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach(async (doc) => {
          const data = doc.data();
          const pathway = await firestoreClient
            .collection("pathways")
            .doc(data.pathwayId)
            .get()
            .then((data) => {
              return data.data();
            });
          list.push({
            id: doc.id,
            ...data,
            ...pathway,
          });
          this.setState({ data: list });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

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
            this.componentDidMount();
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
                Router.push("/catalog");
              }}
            >
              Buscar
            </Button>
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Rich List */}
          <RichList bordered action>
            {this.state.data.length === 0 && (
              <p className="text-center">
                No hay pathways iniciados. <br />Te invito a buscar dentro del
                catalogo de pathways <a href="/catalog">aquí</a>
              </p>
            )}
            {this.state.data.map((data, index) => {
              const { name, description, progress, id, pathwayId } = data;

              return (
                <RichList.Item key={index}>
                  <RichList.Content
                    onClick={() => {
                      Router.push({
                        pathname: "/pathway/resume",
                        query: {
                          id: id,
                          pathwayId: pathwayId,
                        },
                      });
                    }}
                  >
                    <RichList.Title
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

                    <RichList.Title children={name} />
                    <RichList.Subtitle children={description} />
                  </RichList.Content>
                  <RichList.Addon addonType="append">
                    <Button
                      onClick={() => {
                        Router.push({
                          pathname: "/catalog/journey",
                          query: {
                            id: id,
                          },
                        });
                      }}
                    >
                      Ir al Journey
                    </Button>
                    <Button
                      type="button"
                      className="ml-2"
                      onClick={() => {
                        this.onDelete(id);
                      }}
                    >
                      <FontAwesomeIcon icon={SolidIcon.faTrash} />
                    </Button>
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

export default JourneyListComponent;
