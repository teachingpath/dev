import { Row, Col, Card, Badge, Portlet, Collapse, Container, Accordion } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"
import Link from "next/link"

class AccordionPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Accordion")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Accordion", link: "/elements/base/accordion" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Accordion | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>{this.props.message}Accordion</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    <strong>Accordion</strong> is collapsible elements extended from{" "}
                    <Link href="/elements/base/card">card</Link>, inside accordion you can put any
                    elements. We have two versions of the accordion, like examples below. The first
                    one is the default accordion appearance. To appear your accordion like the
                    second one, you just need to add <code>flush</code> property to default
                    accordion.
                  </p>
                  <Row>
                    <Col sm="6" className="mb-3 mb-sm-0">
                      <AccordionComponent />
                    </Col>
                    <Col sm="6">
                      <AccordionComponent flush />
                    </Col>
                  </Row>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

class AccordionComponent extends React.Component {
  // Default active card id
  state = { activeCard: 2 }

  // Handle toggling accordion
  toggle = id => {
    if (this.state.activeCard === id) {
      this.setState({ activeCard: null })
    } else {
      this.setState({ activeCard: id })
    }
  }

  render() {
    const { activeCard } = this.state

    return (
      <Accordion {...this.props}>
        {/* BEGIN Card */}
        <Card>
          <Card.Header collapsed={!(activeCard === 1)} onClick={() => this.toggle(1)}>
            <Card.Title>Home</Card.Title>
          </Card.Header>
          <Collapse isOpen={activeCard === 1}>
            <Card.Body>
              <p className="mb-0">
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
            </Card.Body>
          </Collapse>
        </Card>
        {/* END Card */}
        {/* BEGIN Card */}
        <Card>
          <Card.Header collapsed={!(activeCard === 2)} onClick={() => this.toggle(2)}>
            <Card.Title>Profile</Card.Title>
            <Card.Addon>
              <Accordion.Caret />
            </Card.Addon>
          </Card.Header>
          <Collapse isOpen={activeCard === 2}>
            <Card.Body>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </Card.Body>
          </Collapse>
        </Card>
        {/* END Card */}
        {/* BEGIN Card */}
        <Card>
          <Card.Header collapsed={!(activeCard === 3)} onClick={() => this.toggle(3)}>
            <Card.Icon>
              <FontAwesomeIcon icon={SolidIcon.faNewspaper} />
            </Card.Icon>
            <Card.Title>Blog</Card.Title>
            <Card.Addon>
              <Accordion.Caret />
            </Card.Addon>
          </Card.Header>
          <Collapse isOpen={activeCard === 3}>
            <Card.Body>
              <p className="mb-0">
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
            </Card.Body>
          </Collapse>
        </Card>
        {/* END Card */}
        {/* BEGIN Card */}
        <Card>
          <Card.Header collapsed={!(activeCard === 4)} onClick={() => this.toggle(4)}>
            <Card.Icon>
              <FontAwesomeIcon icon={SolidIcon.faCog} />
            </Card.Icon>
            <Card.Title>Settings</Card.Title>
            <Card.Addon>
              <Badge pill variant="warning">
                9+
              </Badge>
            </Card.Addon>
          </Card.Header>
          <Collapse isOpen={activeCard === 4}>
            <Card.Body>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </Card.Body>
          </Collapse>
        </Card>
        {/* END Card */}
        {/* BEGIN Card */}
        <Card>
          <Card.Header collapsed={!(activeCard === 5)} onClick={() => this.toggle(5)}>
            <Card.Icon>
              <FontAwesomeIcon icon={SolidIcon.faBullhorn} />
            </Card.Icon>
            <Card.Title>Contact</Card.Title>
            <Card.Addon>
              <Accordion.Caret />
            </Card.Addon>
          </Card.Header>
          <Collapse isOpen={activeCard === 5}>
            <Card.Body>
              <p className="mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containLorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </Card.Body>
          </Collapse>
        </Card>
        {/* END Card */}
      </Accordion>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(AccordionPage)))
