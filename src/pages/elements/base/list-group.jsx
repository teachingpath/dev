import { Row, Col, Badge, Portlet, Container, ListGroup } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"
import Link from "next/link"

class ListGroupPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("List Group")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "List Group", link: "/elements/base/list-group" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>List Group | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Variations</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    <strong>List group</strong> is a flexible and powerful component for displaying
                    a series of content. List group has some border versions, look examples below.
                  </p>
                  <Row>
                    <Col md="3">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Default</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN List Group */}
                          <ListGroup>
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                          </ListGroup>
                          {/* END List Group */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="3">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Default</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN List Group */}
                          <ListGroup flush>
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                          </ListGroup>
                          {/* END List Group */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="3">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Bordered</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN List Group */}
                          <ListGroup bordered>
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                          </ListGroup>
                          {/* END List Group */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="3">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Deck bordered</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN List Group */}
                          <ListGroup deck bordered>
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                          </ListGroup>
                          {/* END List Group */}
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
                  <Portlet.Title>States</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add <code>active</code> property to a <code>ListGroup.Item</code> to indicate
                    the current active selection.
                  </p>
                  <p>
                    Add <code>disabled</code> property to a <code>ListGroup.Item</code> to make it{" "}
                    <em>appear</em> disabled. Note: that some elements with <code>disabled</code>{" "}
                    will also require custom JavaScript to fully disable their click events (e.g.,
                    links).
                  </p>
                  {/* BEGIN List Group */}
                  <ListGroup>
                    <ListGroup.Item active>Active</ListGroup.Item>
                    <ListGroup.Item disabled>Disabled</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  {/* END List Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Horizontal</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add <code>horizontal</code> property to change the layout of list group items
                    from vertical to horizontal across all breakpoints. Alternatively, choose a
                    responsive variant by set <code>horizontal</code> property with{" "}
                    <code>.sm|md|lg|xl</code> to make a list group horizontal starting at that
                    breakpoint’s <code>min-width</code>.
                  </p>
                  {/* BEGIN List Group */}
                  <ListGroup horizontal className="mb-4">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                  </ListGroup>
                  {/* END List Group */}
                  {/* BEGIN List Group */}
                  <ListGroup flush horizontal className="mb-4">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                  </ListGroup>
                  {/* END List Group */}
                  {/* BEGIN List Group */}
                  <ListGroup bordered horizontal className="mb-4">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                  </ListGroup>
                  {/* END List Group */}
                  {/* BEGIN List Group */}
                  <ListGroup deck bordered horizontal>
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                  </ListGroup>
                  {/* END List Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Additional content</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add nearly any HTML within, even for linked list groups like the one below, with
                    the help of <strong>flexbox utilities</strong>.
                  </p>
                  {/* BEGIN List Group */}
                  <ListGroup bordered>
                    <ListGroup.Item active>
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">list-group group item heading</h5>
                        <small>3 days ago</small>
                      </div>
                      <p className="mb-1">
                        Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
                        risus varius blandit.
                      </p>
                      <small>Donec id elit non mi porta.</small>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">list-group group item heading</h5>
                        <small>3 days ago</small>
                      </div>
                      <p className="mb-1">
                        Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
                        risus varius blandit.
                      </p>
                      <small>Donec id elit non mi porta.</small>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">list-group group item heading</h5>
                        <small>3 days ago</small>
                      </div>
                      <p className="mb-1">
                        Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
                        risus varius blandit.
                      </p>
                      <small>Donec id elit non mi porta.</small>
                    </ListGroup.Item>
                  </ListGroup>
                  {/* END List Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Links and buttons</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Use <code>{"<a>"}</code>s or <code>{"<button>"}</code>s to create{" "}
                    <em>actionable</em> list group items with hover, disabled, and active states by
                    adding <code>action</code> property. We separate these pseudo-classes to ensure
                    list groups made of non-interactive elements (like <code>{"<li>"}</code>s or{" "}
                    <code>{"<div>"}</code>s) don’t provide a click or tap affordance.
                  </p>
                  <Row>
                    <Col sm="6">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-sm-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Links</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN List Group */}
                          <ListGroup tag="div" bordered>
                            <ListGroup.Item tag="a" href="#" action active>
                              Active
                            </ListGroup.Item>
                            <ListGroup.Item tag="a" href="#" action disabled>
                              Disabled
                            </ListGroup.Item>
                            <ListGroup.Item tag="a" href="#" action>
                              Morbi leo risus
                            </ListGroup.Item>
                            <ListGroup.Item tag="a" href="#" action>
                              Porta ac consectetur ac
                            </ListGroup.Item>
                            <ListGroup.Item tag="a" href="#" action>
                              Vestibulum at eros
                            </ListGroup.Item>
                          </ListGroup>
                          {/* END List Group */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col sm="6">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Buttons</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN List Group */}
                          <ListGroup tag="div" bordered>
                            <ListGroup.Item tag="button" action active>
                              Active
                            </ListGroup.Item>
                            <ListGroup.Item tag="button" action disabled>
                              Disabled
                            </ListGroup.Item>
                            <ListGroup.Item tag="button" action>
                              Morbi leo risus
                            </ListGroup.Item>
                            <ListGroup.Item tag="button" action>
                              Porta ac consectetur ac
                            </ListGroup.Item>
                            <ListGroup.Item tag="button" action>
                              Vestibulum at eros
                            </ListGroup.Item>
                          </ListGroup>
                          {/* END List Group */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                  </Row>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Contextual color</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Use <code>variant</code> property to style list items with a stateful background
                    and color.
                  </p>
                  {/* BEGIN List Group */}
                  <ListGroup action>
                    <ListGroup.Item>Dapibus ac facilisis inspect</ListGroup.Item>
                    <ListGroup.Item variant="primary">
                      A simple primary list-group group item
                    </ListGroup.Item>
                    <ListGroup.Item variant="secondary">
                      A simple secondary list-group group item
                    </ListGroup.Item>
                    <ListGroup.Item variant="success">
                      A simple success list-group group item
                    </ListGroup.Item>
                    <ListGroup.Item variant="danger">
                      A simple danger list-group group item
                    </ListGroup.Item>
                    <ListGroup.Item variant="warning">
                      A simple warning list-group group item
                    </ListGroup.Item>
                    <ListGroup.Item variant="info">
                      A simple info list-group group item
                    </ListGroup.Item>
                    <ListGroup.Item variant="light">
                      A simple light list-group group item
                    </ListGroup.Item>
                    <ListGroup.Item variant="dark">
                      A simple dark list-group group item
                    </ListGroup.Item>
                  </ListGroup>
                  {/* END List Group */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Badges</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add <Link href="/elements/base/badge">badges</Link> to any list group item to
                    show unread counts, activity, and more with the help of some{" "}
                    <strong>utilities</strong>.
                  </p>
                  {/* BEGIN List Group */}
                  <ListGroup bordered>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      Cras justo odio
                      <Badge pill variant="primary">
                        14
                      </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      Dapibus ac facilisis in
                      <Badge pill variant="primary">
                        2
                      </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      Morbi leo risus
                      <Badge pill variant="primary">
                        1
                      </Badge>
                    </ListGroup.Item>
                  </ListGroup>
                  {/* END List Group */}
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(ListGroupPage)))
