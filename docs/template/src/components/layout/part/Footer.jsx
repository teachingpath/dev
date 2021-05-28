import { Row, Col, Footer, Container } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as RegularIcon from "@fortawesome/free-regular-svg-icons"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

function FooterComponent() {
  // Get current year and store to the variabke
  const copyrightYear = new Date().getFullYear()

  return (
    <Footer>
      <Container fluid>
        <Row>
          <Col md="6">
            <p className="text-left mb-0">
              Copyright <FontAwesomeIcon icon={RegularIcon.faCopyright} />{" "}
              <span>{copyrightYear}</span> Panely. All rights reserved
            </p>
          </Col>
          <Col md="6" className="d-none d-md-block">
            <p className="text-right mb-0">
              Hand-crafted and made with{" "}
              <FontAwesomeIcon icon={SolidIcon.faHeart} className="text-danger" />
            </p>
          </Col>
        </Row>
      </Container>
    </Footer>
  )
}

export default FooterComponent
