import { Row, Col, Button } from "@panely/components";
import Router from "next/router";
import Card from "@panely/components/Card";
import { firestoreClient } from "components/firebase/firebaseClient";
import Link from "next/link";

class PathwayResume extends React.Component {
  state = { data: {} };
  componentDidMount() {
    firestoreClient
      .collection("pathways")
      .doc(this.props.pathwayId)
      .get()
      .then((doc) => {
        this.setState({ data: doc.data() });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
  render() {
    const { data } = this.state;
    return (
      <Card>
        <Row noGutters>
          <Col md="2">
            <Link href={"/catalog/pathway?id=" + this.props.pathwayId}>
              <Card.Img
                className="avatar-circle p-3"
                src={data?.trophy?.image}
                alt="Card Image"
              />
            </Link>
          </Col>
          <Col md="10">
            <Card.Body>
              <Card.Title>
                <a href={"/catalog/pathway?id=" + this.props.pathwayId}>
                  {data?.name}
                </a>
              </Card.Title>
              <Card.Text>{data?.description}</Card.Text>
              <Card.Text>
                <small className="text-muted">
                  {data?.trophy?.description}
                </small>
              </Card.Text>
              <Button
                onClick={() => {
                  Router.push("/catalog/pathway?id=" + this.props.pathwayId);
                }}
              >
                Iniciar pathway
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default PathwayResume;
