import { Badge, Portlet, Dropdown, RichList, Button } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import { firestoreClient } from "components/firebase/firebaseClient";
import Progress from "@panely/components/Progress";

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
              Search
            </Button>
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Rich List */}
          <RichList bordered action>
            {this.state.data.map((data, index) => {
              const { name, description, progress, id, pathwayId } = data;

              return (
                <RichList.Item key={index}>
                  <RichList.Content onClick={() => {
                    Router.push({
                      pathname: "/catalog/pathway",
                      query: {
                        id: pathwayId,
                      },
                    });
                  }}>
                    <RichList.Title
                      children={
                        <Progress
                          striped
                          className="mr-2 mb-2"
                          value={progress}
                        >
                          {progress}%
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
                      Go to journey
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
