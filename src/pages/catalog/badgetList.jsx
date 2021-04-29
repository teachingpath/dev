import { Card } from "@panely/components";
import {
  firestoreClient,
  firebaseClient,
} from "components/firebase/firebaseClient";
import CardColumns from "@panely/components/CardColumns";

class BadgetListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    if (this.props.journeyId) {
      firestoreClient
        .collection("journeys")
        .doc(this.props.journeyId)
        .collection("badgets")
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const list = [];
            querySnapshot.forEach((doc) => {
              list.push(doc.data());
            });
            this.setState({ data: list });
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } else {
      const user = firebaseClient.auth().currentUser;
      firestoreClient
        .collection("journeys")
        .where("userId", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              firestoreClient
                .collection("journeys")
                .doc(doc.id)
                .collection("badgets")
                .where("disabled", "==", false)
                .get()
                .then((querySnapshot) => {
                  if (!querySnapshot.empty) {
                    const list = this.state.data;
                    querySnapshot.forEach((doc) => {
                      list.push(doc.data());
                    });
                    this.setState({ data: list });
                  }
                });
            });
          }
        });
    }
  }
  render() {
    return (
      <>
        <div>
          <h4>Badgets</h4>
          {this.state.data.length === 0 && <p className="text-center text-muted">Empty badgets</p>}

          <CardColumns columns={5}>
            {this.state.data.map((data) => {
              if (data.disabled) {
                return (
                  <Card className="text-center bg-light">
                    <Card.Img
                      top
                      className=" mg-thumbnail avatar-circle p-5 border border-warning"
                      src={data.image}
                      alt="Badget Image"
                    />
                    <Card.Body>
                      <Card.Title>Not available</Card.Title>
                    </Card.Body>
                  </Card>
                );
              } else {
                return (
                  <Card className="text-center">
                    <Card.Img
                      top
                      className=" mg-thumbnail avatar-circle p-5"
                      src={data.image}
                      alt="Badget Image"
                    />
                    <Card.Body>
                      <Card.Title>{data.name}</Card.Title>
                      <Card.Text>
                        <small className="text-muted">{data.description}</small>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              }
            })}
          </CardColumns>
        </div>
      </>
    );
  }
}

export default BadgetListComponent;
