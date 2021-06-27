import { Row, Col, Card, Button } from "@panely/components";
import { getUser } from "consumer/user";

import React from "react";

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
          <Col md="4">
            <Card.Img
              className="avatar-circle p-3"
              src={data?.image || "/images/avatar/blank.webp"}
              alt="Profile Image"
            />
          </Col>
          <Col md="8">
            <Card.Body>
              <Card.Title>
                Teacher: {data?.firstName} {data?.lastName}
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
                Contact
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Teacher;
