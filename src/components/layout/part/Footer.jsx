import { Row, Col, Footer, Container } from "@panely/components";

function FooterComponent() {
  const copyrightYear = new Date().getFullYear();

  return (
    <Footer>
      <Container fluid>
        <Row>
          <Col md="6">
            <p className="text-left mb-0">
              Copyright <i className="fas fa-copyright"  />{" "}
              <span>{copyrightYear}</span> Teaching Path.{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.teachingpath.info/"
              >
                Ver más información
              </a>
            </p>
          </Col>
          <Col md="6" className="d-none d-md-block">
            <p className="text-right mb-0">
              Hecho a mano y hecho con <i className="fas fa-heart" />
            </p>
          </Col>
        </Row>
      </Container>
    </Footer>
  );
}

export default FooterComponent;
