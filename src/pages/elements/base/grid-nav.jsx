import { Row, Col, GridNav, Portlet, Container } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as RegularIcon from "@fortawesome/free-regular-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class GridNavPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Grid Navigation")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Grid Navigation", link: "/elements/base/grid-nav" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Grid Navigation | Panely</title>
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
                    <strong>Grid navigation</strong> has 3 versions of the border, like example
                    below
                  </p>
                  <Row>
                    <Col md="4">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Basic</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN Grid Nav */}
                          <GridNav>
                            <GridNav.Row>
                              <GridNav.Item
                                icon={<FontAwesomeIcon icon={RegularIcon.faAddressCard} />}
                              >
                                Profile
                              </GridNav.Item>
                              <GridNav.Item
                                icon={<FontAwesomeIcon icon={RegularIcon.faComments} />}
                              >
                                Messages
                              </GridNav.Item>
                              <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faClone} />}>
                                Activities
                              </GridNav.Item>
                            </GridNav.Row>
                          </GridNav>
                          {/* END Grid Nav */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="4">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-md-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Flush</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN Grid Nav */}
                          <GridNav flush>
                            <GridNav.Row>
                              <GridNav.Item
                                icon={<FontAwesomeIcon icon={RegularIcon.faAddressCard} />}
                              >
                                Profile
                              </GridNav.Item>
                              <GridNav.Item
                                icon={<FontAwesomeIcon icon={RegularIcon.faComments} />}
                              >
                                Messages
                              </GridNav.Item>
                              <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faClone} />}>
                                Activities
                              </GridNav.Item>
                            </GridNav.Row>
                          </GridNav>
                          {/* END Grid Nav */}
                        </Portlet.Body>
                      </Portlet>
                      {/* END Portlet */}
                    </Col>
                    <Col md="4">
                      {/* BEGIN Portlet */}
                      <Portlet className="mb-0">
                        <Portlet.Header bordered>
                          <Portlet.Title>Bordered</Portlet.Title>
                        </Portlet.Header>
                        <Portlet.Body>
                          {/* BEGIN Grid Nav */}
                          <GridNav bordered>
                            <GridNav.Row>
                              <GridNav.Item
                                icon={<FontAwesomeIcon icon={RegularIcon.faAddressCard} />}
                              >
                                Profile
                              </GridNav.Item>
                              <GridNav.Item
                                icon={<FontAwesomeIcon icon={RegularIcon.faComments} />}
                              >
                                Messages
                              </GridNav.Item>
                              <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faClone} />}>
                                Activities
                              </GridNav.Item>
                            </GridNav.Row>
                          </GridNav>
                          {/* END Grid Nav */}
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
                  <Portlet.Title>More content</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    You can add multiple rows and more content by using <code>GridNav.Title</code>{" "}
                    and <code>GridNav.Subtitle</code>
                  </p>
                  {/* BEGIN Grid Nav */}
                  <GridNav bordered>
                    <GridNav.Row>
                      <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faAddressCard} />}>
                        <GridNav.Title>Profile</GridNav.Title>
                        <GridNav.Subtitle>Edit your profile</GridNav.Subtitle>
                      </GridNav.Item>
                      <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faComments} />}>
                        <GridNav.Title>Messages</GridNav.Title>
                        <GridNav.Subtitle>Check new messages</GridNav.Subtitle>
                      </GridNav.Item>
                      <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faClone} />}>
                        <GridNav.Title>Activities</GridNav.Title>
                        <GridNav.Subtitle>Show last activity</GridNav.Subtitle>
                      </GridNav.Item>
                    </GridNav.Row>
                    <GridNav.Row>
                      <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faCalendarCheck} />}>
                        <GridNav.Title>Tasks</GridNav.Title>
                        <GridNav.Subtitle>Remind my tasks</GridNav.Subtitle>
                      </GridNav.Item>
                      <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faStickyNote} />}>
                        <GridNav.Title>Notes</GridNav.Title>
                        <GridNav.Subtitle>Show my notes</GridNav.Subtitle>
                      </GridNav.Item>
                      <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faBell} />}>
                        <GridNav.Title>Notification</GridNav.Title>
                        <GridNav.Subtitle>Check all notification</GridNav.Subtitle>
                      </GridNav.Item>
                    </GridNav.Row>
                  </GridNav>
                  {/* END Grid Nav */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Action</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Apply hover and focus states by adding <code>action</code> property. Use{" "}
                    <code>active</code> property to appear clicked effect to individual link and use{" "}
                    <code>disabled</code> property for disabled appearance.
                  </p>
                  {/* BEGIN Grid Nav */}
                  <GridNav bordered action>
                    <GridNav.Row>
                      <GridNav.Item
                        href="#"
                        icon={<FontAwesomeIcon icon={RegularIcon.faAddressCard} />}
                        active
                      >
                        <GridNav.Title>Profile</GridNav.Title>
                        <GridNav.Subtitle>Edit your profile</GridNav.Subtitle>
                      </GridNav.Item>
                      <GridNav.Item
                        href="#"
                        icon={<FontAwesomeIcon icon={RegularIcon.faComments} />}
                        disabled
                      >
                        <GridNav.Title>Messages</GridNav.Title>
                        <GridNav.Subtitle>Check new messages</GridNav.Subtitle>
                      </GridNav.Item>
                      <GridNav.Item href="#" icon={<FontAwesomeIcon icon={RegularIcon.faClone} />}>
                        <GridNav.Title>Activities</GridNav.Title>
                        <GridNav.Subtitle>Show last activity</GridNav.Subtitle>
                      </GridNav.Item>
                    </GridNav.Row>
                    <GridNav.Row>
                      <GridNav.Item
                        href="#"
                        icon={<FontAwesomeIcon icon={RegularIcon.faCalendarCheck} />}
                      >
                        <GridNav.Title>Tasks</GridNav.Title>
                        <GridNav.Subtitle>Remind my tasks</GridNav.Subtitle>
                      </GridNav.Item>
                      <GridNav.Item
                        href="#"
                        icon={<FontAwesomeIcon icon={RegularIcon.faStickyNote} />}
                      >
                        <GridNav.Title>Notes</GridNav.Title>
                        <GridNav.Subtitle>Show my notes</GridNav.Subtitle>
                      </GridNav.Item>
                      <GridNav.Item href="#" icon={<FontAwesomeIcon icon={RegularIcon.faBell} />}>
                        <GridNav.Title>Notification</GridNav.Title>
                        <GridNav.Subtitle>Check all notification</GridNav.Subtitle>
                      </GridNav.Item>
                    </GridNav.Row>
                  </GridNav>
                  {/* END Grid Nav */}
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(GridNavPage)))
