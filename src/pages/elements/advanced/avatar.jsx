import {
  Row,
  Col,
  Badge,
  Marker,
  Avatar,
  Portlet,
  Container,
  AvatarGroup,
  DemoWrapper
} from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"
import Link from "next/link"

class AvatarPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Avatar")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Advanced" },
      { text: "Avatar", link: "/elements/advanced/avatar" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Avatar | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Basic</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    <strong>Avatar</strong> can be used for displaying image, icon, or character on
                    square or circle shaped elements. Put image, icon, or character into{" "}
                    <code>Avatar.Display</code> or add <code>display</code> property to{" "}
                    <code>Avatar</code> component. Look the example below.
                  </p>
                  {/* BEGIN Avatars */}
                  <DemoWrapper>
                    <Avatar display>
                      <FontAwesomeIcon icon={SolidIcon.faUser} />
                    </Avatar>
                    <Avatar display>
                      <img src="/images/avatar/blank.webp" alt="Avatar Image" />
                    </Avatar>
                    <Avatar display>C</Avatar>
                  </DemoWrapper>
                  {/* END Avatars */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Circle version</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Extend default avatar element with <code>circle</code> property to change its
                    shape to be circular.
                  </p>
                  {/* BEGIN Avatars */}
                  <DemoWrapper>
                    <Avatar display circle>
                      <FontAwesomeIcon icon={SolidIcon.faUser} />
                    </Avatar>
                    <Avatar display circle>
                      <img src="/images/avatar/blank.webp" alt="Avatar Image" />
                    </Avatar>
                    <Avatar display circle>
                      C
                    </Avatar>
                  </DemoWrapper>
                  {/* END Avatars */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Sizing</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    If you want to change avatar size, you can use <code>size</code> property with{" "}
                    <code>sm|lg</code> values.
                  </p>
                  {/* BEGIN Avatars */}
                  <DemoWrapper>
                    <Avatar display variant="primary" size="sm">
                      A
                    </Avatar>
                    <Avatar display variant="primary">
                      B
                    </Avatar>
                    <Avatar display variant="primary" size="lg">
                      C
                    </Avatar>
                    <Avatar display circle variant="primary" size="sm">
                      A
                    </Avatar>
                    <Avatar display circle variant="primary">
                      B
                    </Avatar>
                    <Avatar display circle variant="primary" size="lg">
                      C
                    </Avatar>
                  </DemoWrapper>
                  {/* END Avatars */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Group</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Wrap a series of avatar elements into <code>AvatarGroup</code> to group the
                    elements. Instead of applying avatar sizing classes to every avatar in a group,
                    just set <code>size</code> property to each <code>AvatarGroup</code>
                  </p>
                  <DemoWrapper>
                    {/* BEGIN Avatar Group */}
                    <AvatarGroup size="sm">
                      <Avatar display circle variant="primary">
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                      <Avatar display circle variant="secondary">
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                      <Avatar display circle variant="success">
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                      <Avatar display circle variant="danger">
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                    </AvatarGroup>
                    {/* END Avatar Group */}
                    {/* BEGIN Avatar Group */}
                    <AvatarGroup>
                      <Avatar display circle variant="primary">
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                      <Avatar display circle variant="secondary">
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                      <Avatar display circle variant="success">
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                      <Avatar display circle variant="danger">
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                    </AvatarGroup>
                    {/* END Avatar Group */}
                    {/* BEGIN Avatar Group */}
                    <AvatarGroup size="lg">
                      <Avatar display circle variant="primary">
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                      <Avatar display circle variant="secondary">
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                      <Avatar display circle variant="success">
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                      <Avatar display circle variant="danger">
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                    </AvatarGroup>
                    {/* END Avatar Group */}
                  </DemoWrapper>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Contextual colors</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>Change avatar color for functionality, check examples below.</p>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Solid</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        You can use those by setting <code>variant</code> property to avatar element
                      </p>
                      {/* BEGIN Avatars */}
                      <DemoWrapper>
                        <Avatar display variant="primary">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="secondary">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="info">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="success">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="warning">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="danger">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="light">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="dark">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                      </DemoWrapper>
                      {/* END Avatars */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Header bordered>
                      <Portlet.Title>Label</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        For these variant, you can use <code>label-(color)</code> in{" "}
                        <code>variant</code> property
                      </p>
                      {/* BEGIN Avatars */}
                      <DemoWrapper>
                        <Avatar display variant="label-primary">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="label-secondary">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="label-info">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="label-success">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="label-warning">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="label-danger">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="label-light">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        <Avatar display variant="label-dark">
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                      </DemoWrapper>
                      {/* END Avatars */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Addon</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Addon can be replaced to <strong>top-left</strong> or{" "}
                    <strong>bottom-right</strong> of avatar element. Use <code>Avatar.Addon</code>{" "}
                    and you must set <code>position</code> property to set placement. You can put{" "}
                    <Link href="/elements/base/badge">badge</Link> or{" "}
                    <Link href="/elements/base/marker">marker</Link> into avatar addon.
                  </p>
                  {/* BEGIN Avatars */}
                  <DemoWrapper>
                    <Avatar variant="primary">
                      <Avatar.Addon position="top">
                        <Marker type="dot" variant="success" />
                      </Avatar.Addon>
                      <Avatar.Display>
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar.Display>
                    </Avatar>
                    <Avatar variant="primary">
                      <Avatar.Display>
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar.Display>
                      <Avatar.Addon position="bottom">
                        <Marker type="dot" variant="success" />
                      </Avatar.Addon>
                    </Avatar>
                    <Avatar circle variant="primary">
                      <Avatar.Addon position="top">
                        <Avatar.Icon variant="danger">
                          <FontAwesomeIcon icon={SolidIcon.faCheck} />
                        </Avatar.Icon>
                      </Avatar.Addon>
                      <Avatar.Display>
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar.Display>
                    </Avatar>
                    <Avatar variant="primary">
                      <Avatar.Display>
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar.Display>
                      <Avatar.Addon position="bottom">
                        <Avatar.Icon variant="success">
                          <FontAwesomeIcon icon={SolidIcon.faStar} />
                        </Avatar.Icon>
                      </Avatar.Addon>
                    </Avatar>
                    <Avatar variant="primary">
                      <Avatar.Addon position="top">
                        <Avatar.Badge pill variant="danger">
                          9+
                        </Avatar.Badge>
                      </Avatar.Addon>
                      <Avatar.Display>
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar.Display>
                    </Avatar>
                    <Avatar variant="primary">
                      <Avatar.Display>
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar.Display>
                      <Avatar.Addon position="bottom">
                        <Avatar.Badge pill variant="success">
                          9+
                        </Avatar.Badge>
                      </Avatar.Addon>
                    </Avatar>
                  </DemoWrapper>
                  {/* END Avatars */}
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(AvatarPage)))
