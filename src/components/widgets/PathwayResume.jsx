import { Row, Col, Button } from "@panely/components";
import Router from "next/router";
import Card from "@panely/components/Card";
import Link from "next/link";
import { get } from "consumer/pathway";

class PathwayResume extends React.Component {
  state = { data: {name: "--"} };
  componentDidMount() {
    get(
      this.props.pathwayId,
      (data) => {
        this.setState({  data });
      },
      () => {
        console.log("No pudo conseguir el pathway");
      }
    );
  }

  render() {
    const { data } = this.state;
    const renderButton = () => {
      const journeyId = localStorage.getItem("journeyId")
        ? localStorage.getItem("journeyId")
        : null;

      if (journeyId) {
        return (
          <Button
            onClick={() => {
              Router.push("/catalog/journey?id=" + journeyId);
            }}
          >
            Ir al Journey
          </Button>
        );
      }
      return (
        <Button
          onClick={() => {
            Router.push("/catalog/pathway?id=" + this.props.pathwayId);
          }}
        >
          Iniciar pathway
        </Button>
      );
    };
    return (
      <Card>
        <Row noGutters>
          {data?.trophy?.image && (
            <Col md="2">
              <Link href={"/catalog/pathway?id=" + this.props.pathwayId}>
                <Card.Img
                  className="avatar-circle p-3"
                  src={data?.trophy?.image}
                  alt="Profile Image"
                />
              </Link>
            </Col>
          )}
          <Col md="10">
            <Card.Body>
              <Card.Title>
                <a href={"/catalog/pathway?id=" + this.props.pathwayId}>
                  Pathway: {data?.name}
                </a>
              </Card.Title>
              <Card.Text>{data?.description}</Card.Text>
              <Card.Text>
                <small className="text-muted">
                  {data?.trophy?.description}
                </small>
              </Card.Text>
              {data?.draft === true && <strong>Aún no disponible</strong>}
              {data?.draft === false && renderButton()}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default PathwayResume;
