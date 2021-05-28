import {
  Row,
  Col,
  Chat,
  Caret,
  Badge,
  Avatar,
  Portlet,
  RichList,
  Container
} from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class RichListPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Rich List")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Advanced" },
      { text: "Rich List", link: "/elements/advanced/rich-list" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Rich List | Panely</title>
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
                    <strong>Rich list</strong> is a flexible and powerful component for displaying a
                    series of content. Basic rich list has <code>RichList.Item</code> where wrapping
                    content or any elements.
                  </p>
                  {/* BEGIN Rich List */}
                  <RichList>
                    <RichList.Item content>
                      <RichList.Title>Porta</RichList.Title>
                      <RichList.Subtitle>Cras justo odio</RichList.Subtitle>
                    </RichList.Item>
                    <RichList.Item content>
                      <RichList.Title>Consectetur</RichList.Title>
                      <RichList.Subtitle>Dapibus ac facilisis in</RichList.Subtitle>
                    </RichList.Item>
                    <RichList.Item content>
                      <RichList.Title>Vestibulum</RichList.Title>
                      <RichList.Subtitle>Morbi leo risus</RichList.Subtitle>
                    </RichList.Item>
                  </RichList>
                  {/* END Rich List */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Border variants</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    By default, rich list component has 2 border versions, like the examples below.
                  </p>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Flush</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      {/* BEGIN Rich List */}
                      <RichList flush>
                        <RichList.Item>
                          <RichList.Addon addonType="prepend">
                            {/* BEGIN Avatar */}
                            <Avatar display>
                              <FontAwesomeIcon icon={SolidIcon.faUser} />
                            </Avatar>
                            {/* END Avatar */}
                          </RichList.Addon>
                          <RichList.Content>
                            <RichList.Title>Porta</RichList.Title>
                            <RichList.Subtitle>Cras justo odio</RichList.Subtitle>
                          </RichList.Content>
                          <RichList.Addon addonType="append">
                            <Caret className="mx-2" />
                          </RichList.Addon>
                        </RichList.Item>
                        <RichList.Item>
                          <RichList.Addon addonType="prepend">
                            {/* BEGIN Avatar */}
                            <Avatar display>
                              <FontAwesomeIcon icon={SolidIcon.faUser} />
                            </Avatar>
                            {/* END Avatar */}
                          </RichList.Addon>
                          <RichList.Content>
                            <RichList.Title>Consectetur</RichList.Title>
                            <RichList.Subtitle>Dapibus ac facilisis in</RichList.Subtitle>
                          </RichList.Content>
                          <RichList.Addon addonType="append">
                            <Badge variant="label-success">9+</Badge>
                          </RichList.Addon>
                        </RichList.Item>
                        <RichList.Item>
                          <RichList.Addon addonType="prepend">
                            {/* BEGIN Avatar */}
                            <Avatar display>
                              <FontAwesomeIcon icon={SolidIcon.faUser} />
                            </Avatar>
                            {/* END Avatar */}
                          </RichList.Addon>
                          <RichList.Content>
                            <RichList.Title>Vestibulum</RichList.Title>
                            <RichList.Subtitle>Morbi leo risus</RichList.Subtitle>
                          </RichList.Content>
                          <RichList.Addon addonType="append">
                            <Badge variant="primary">new</Badge>
                          </RichList.Addon>
                        </RichList.Item>
                      </RichList>
                      {/* END Rich List */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Flush</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      {/* BEGIN Rich List */}
                      <RichList bordered>
                        <RichList.Item>
                          <RichList.Addon addonType="prepend">
                            {/* BEGIN Avatar */}
                            <Avatar display>
                              <FontAwesomeIcon icon={SolidIcon.faUser} />
                            </Avatar>
                            {/* END Avatar */}
                          </RichList.Addon>
                          <RichList.Content>
                            <RichList.Title>Porta</RichList.Title>
                            <RichList.Subtitle>Cras justo odio</RichList.Subtitle>
                          </RichList.Content>
                          <RichList.Addon addonType="append">
                            <Caret className="mx-2" />
                          </RichList.Addon>
                        </RichList.Item>
                        <RichList.Item>
                          <RichList.Addon addonType="prepend">
                            {/* BEGIN Avatar */}
                            <Avatar display>
                              <FontAwesomeIcon icon={SolidIcon.faUser} />
                            </Avatar>
                            {/* END Avatar */}
                          </RichList.Addon>
                          <RichList.Content>
                            <RichList.Title>Consectetur</RichList.Title>
                            <RichList.Subtitle>Dapibus ac facilisis in</RichList.Subtitle>
                          </RichList.Content>
                          <RichList.Addon addonType="append">
                            <Badge variant="label-success">9+</Badge>
                          </RichList.Addon>
                        </RichList.Item>
                        <RichList.Item>
                          <RichList.Addon addonType="prepend">
                            {/* BEGIN Avatar */}
                            <Avatar display>
                              <FontAwesomeIcon icon={SolidIcon.faUser} />
                            </Avatar>
                            {/* END Avatar */}
                          </RichList.Addon>
                          <RichList.Content>
                            <RichList.Title>Vestibulum</RichList.Title>
                            <RichList.Subtitle>Morbi leo risus</RichList.Subtitle>
                          </RichList.Content>
                          <RichList.Addon addonType="append">
                            <Badge variant="primary">new</Badge>
                          </RichList.Addon>
                        </RichList.Item>
                      </RichList>
                      {/* END Rich List */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Addon</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Put other elements inside rich list within <code>RichList.Addon</code>
                  </p>
                  {/* BEGIN Rich List */}
                  <RichList>
                    <RichList.Item>
                      <RichList.Addon addonType="prepend">
                        {/* BEGIN Avatar */}
                        <Avatar display>
                          <FontAwesomeIcon icon={SolidIcon.faCog} />
                        </Avatar>
                        {/* END Avatar */}
                      </RichList.Addon>
                      <RichList.Content>
                        <RichList.Title>Porta</RichList.Title>
                        <RichList.Subtitle>Cras justo odio</RichList.Subtitle>
                      </RichList.Content>
                      <RichList.Addon addonType="append">
                        <Caret className="mx-2" />
                      </RichList.Addon>
                    </RichList.Item>
                    <RichList.Item>
                      <RichList.Addon addonType="prepend">
                        {/* BEGIN Avatar */}
                        <Avatar variant="success" display circle>
                          <FontAwesomeIcon icon={SolidIcon.faWrench} />
                        </Avatar>
                        {/* END Avatar */}
                      </RichList.Addon>
                      <RichList.Content>
                        <RichList.Title>Consectetur</RichList.Title>
                        <RichList.Subtitle>Dapibus ac facilisis in</RichList.Subtitle>
                      </RichList.Content>
                      <RichList.Addon addonType="append">
                        <Badge variant="label-success">9+</Badge>
                      </RichList.Addon>
                    </RichList.Item>
                    <RichList.Item>
                      <RichList.Addon addonType="prepend">
                        {/* BEGIN Avatar */}
                        <Avatar variant="label-primary" display>
                          <FontAwesomeIcon icon={SolidIcon.faPaperPlane} />
                        </Avatar>
                        {/* END Avatar */}
                      </RichList.Addon>
                      <RichList.Content>
                        <RichList.Title>Vestibulum</RichList.Title>
                        <RichList.Subtitle>Morbi leo risus</RichList.Subtitle>
                      </RichList.Content>
                      <RichList.Addon addonType="append">
                        <Badge variant="primary">new</Badge>
                      </RichList.Addon>
                    </RichList.Item>
                  </RichList>
                  {/* END Rich List */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Action</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    If you want to make your rich list has clickable behavior, you must add{" "}
                    <code>action</code> property.
                  </p>
                  {/* BEGIN Rich List */}
                  <RichList bordered action>
                    <RichList.Item href="#">
                      <RichList.Addon addonType="prepend">
                        {/* BEGIN Avatar */}
                        <Avatar display>
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        {/* END Avatar */}
                      </RichList.Addon>
                      <RichList.Content>
                        <RichList.Title>Porta</RichList.Title>
                        <RichList.Subtitle>Cras justo odio</RichList.Subtitle>
                      </RichList.Content>
                      <RichList.Addon addonType="append">
                        <Caret className="mx-2" />
                      </RichList.Addon>
                    </RichList.Item>
                    <RichList.Item href="#">
                      <RichList.Addon addonType="prepend">
                        {/* BEGIN Avatar */}
                        <Avatar display>
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        {/* END Avatar */}
                      </RichList.Addon>
                      <RichList.Content>
                        <RichList.Title>Consectetur</RichList.Title>
                        <RichList.Subtitle>Dapibus ac facilisis in</RichList.Subtitle>
                      </RichList.Content>
                      <RichList.Addon addonType="append">
                        <Badge variant="label-success">9+</Badge>
                      </RichList.Addon>
                    </RichList.Item>
                    <RichList.Item href="#">
                      <RichList.Addon addonType="prepend">
                        {/* BEGIN Avatar */}
                        <Avatar display>
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        {/* END Avatar */}
                      </RichList.Addon>
                      <RichList.Content>
                        <RichList.Title>Vestibulum</RichList.Title>
                        <RichList.Subtitle>Morbi leo risus</RichList.Subtitle>
                      </RichList.Content>
                      <RichList.Addon addonType="append">
                        <Badge variant="primary">new</Badge>
                      </RichList.Addon>
                    </RichList.Item>
                  </RichList>
                  {/* END Rich List */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>States</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    We provide <code>active</code> and <code>disabled</code> states for{" "}
                    <code>RichList.Item</code>, look the example
                  </p>
                  {/* BEGIN Rich List */}
                  <RichList bordered action>
                    <RichList.Item href="#" active>
                      <RichList.Addon addonType="prepend">
                        {/* BEGIN Avatar */}
                        <Avatar display>
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        {/* END Avatar */}
                      </RichList.Addon>
                      <RichList.Content>
                        <RichList.Title>Active state</RichList.Title>
                        <RichList.Subtitle>Cras justo odio</RichList.Subtitle>
                      </RichList.Content>
                      <RichList.Addon addonType="append">
                        <Caret className="mx-2" />
                      </RichList.Addon>
                    </RichList.Item>
                    <RichList.Item href="#" disabled>
                      <RichList.Addon addonType="prepend">
                        {/* BEGIN Avatar */}
                        <Avatar display>
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        {/* END Avatar */}
                      </RichList.Addon>
                      <RichList.Content>
                        <RichList.Title>Disabled state</RichList.Title>
                        <RichList.Subtitle>Dapibus ac facilisis in</RichList.Subtitle>
                      </RichList.Content>
                      <RichList.Addon addonType="append">
                        <Badge variant="label-success">9+</Badge>
                      </RichList.Addon>
                    </RichList.Item>
                    <RichList.Item href="#">
                      <RichList.Addon addonType="prepend">
                        {/* BEGIN Avatar */}
                        <Avatar display>
                          <FontAwesomeIcon icon={SolidIcon.faUser} />
                        </Avatar>
                        {/* END Avatar */}
                      </RichList.Addon>
                      <RichList.Content>
                        <RichList.Title>Vestibulum</RichList.Title>
                        <RichList.Subtitle>Morbi leo risus</RichList.Subtitle>
                      </RichList.Content>
                      <RichList.Addon addonType="append">
                        <Badge variant="primary">new</Badge>
                      </RichList.Addon>
                    </RichList.Item>
                  </RichList>
                  {/* END Rich List */}
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(RichListPage)))
