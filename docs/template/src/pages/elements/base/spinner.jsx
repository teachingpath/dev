import { Row, Col, Button, Spinner, Portlet, Container } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class SpinnerPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Spinner")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Spinner", link: "/elements/base/spinner" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Spinner | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Basic</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    <strong>Spinners</strong> can be used to show the loading state in your
                    projects. You can customize the color with text color utilities
                  </p>
                  <Row>
                    <Col md="6">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Border spinner</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN Spinners */}
                          <Spinner variant="primary" />
                          <Spinner variant="secondary" />
                          <Spinner variant="success" />
                          <Spinner variant="danger" />
                          <Spinner variant="warning" />
                          <Spinner variant="info" />
                          <Spinner variant="light" />
                          <Spinner variant="dark" />
                          {/* END Spinners */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="6">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Growing spinner</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN Spinners */}
                          <Spinner type="grow" variant="primary" />
                          <Spinner type="grow" variant="secondary" />
                          <Spinner type="grow" variant="success" />
                          <Spinner type="grow" variant="danger" />
                          <Spinner type="grow" variant="warning" />
                          <Spinner type="grow" variant="info" />
                          <Spinner type="grow" variant="light" />
                          <Spinner type="grow" variant="dark" />
                          {/* END Spinners */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                  </Row>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
          </Row>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Sizing</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Using <code>size</code> property to make a smaller spinner or, use custom CSS or
                    inline styles to change the dimensions as needed.
                  </p>
                  {/* BEGIN Spinners */}
                  <Spinner size="sm" />
                  <Spinner type="grow" size="sm" />
                  <Spinner style={{ width: "3rem", height: "3rem" }} />
                  <Spinner type="grow" style={{ width: "3rem", height: "3rem" }} />
                  {/* END Spinners */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Buttons</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Use spinners within buttons to indicate an action is currently processing or
                    taking place
                  </p>
                  <Button disabled>
                    <Spinner size="sm" />
                  </Button>{" "}
                  <Button disabled>
                    <Spinner size="sm" /> Loading...
                  </Button>{" "}
                  <Button disabled>
                    <Spinner type="grow" size="sm" />
                  </Button>{" "}
                  <Button disabled>
                    <Spinner type="grow" size="sm" /> Loading...
                  </Button>
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

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(SpinnerPage)))
