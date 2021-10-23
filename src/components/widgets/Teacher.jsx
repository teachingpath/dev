import { Row, Col, Card, Button } from "@panely/components";
import { getUser } from "consumer/user";
import React from "react";
import ReactWhatsapp from "react-whatsapp";

class Teacher extends React.Component {
  state = { data: {} };
  componentDidMount() {
    getUser(
      this.props.leaderId,
      (data) => {
        this.setState(data);
      },
      () => {}
    );
  }
  render() {
    const { data } = this.state;
    return (
      <Card>
        <Row noGutters>
          <Col md="3">
            <Card.Img
            className={"text-center"}
              style={{ maxWidth: "150px" }}
              className=" p-3"
              src={data?.image || "/images/avatar/blank.webp"}
              alt="Profile Image"
            />
          </Col>
          <Col md="9">
            <Card.Body>
              <Card.Title>
                Mentor: {data?.firstName} {data?.lastName}
              </Card.Title>
              <Card.Text>
                <small className="text-muted">{data?.specialty}</small>
              </Card.Text>
              <Card.Text>{data?.bio}</Card.Text>
              <Button
                onClick={() => {
                  window.location = "mailto:" + data.email;
                }}
              >
                {" "}
                <i className="fas fa-envelope"></i> Contactar
              </Button>
              {data?.phone && (
                <ReactWhatsapp
                  className="ml-2 btn btn-primary"
                  number={data?.phone}
                  message="Hola Mentor, te hablo desde Teaching Path."
                >
                  <i className="fab fa-whatsapp"></i> Chat
                </ReactWhatsapp>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Teacher;
