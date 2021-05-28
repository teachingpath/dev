import { Row, Col, Chat, Avatar, Portlet, RichList, Container } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as RegularIcon from "@fortawesome/free-regular-svg-icons"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Link from "next/link"
import Head from "next/head"

class ChatPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Chat")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Advanced" },
      { text: "Chat", link: "/elements/advanced/chat" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Chat | Panely</title>
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
                    <strong>Chat</strong> elements as the name suggests can be used for messaging.
                    To make chat bubbles use <code>Chat.Bubble</code> component. Wrap your chat
                    bubbles into <code>Chat.Content</code>. You must set chat items alignment by
                    extend <code>Chat.Item</code> component with <code>align</code> property.
                  </p>
                  {/* BEGIN Chat */}
                  <Chat>
                    <Chat.Item content align="right">
                      <Chat.Author>Me</Chat.Author>
                      <Chat.Bubble>
                        consectetur adipisicing elit, sed do eiusmod tempor.
                      </Chat.Bubble>
                      <Chat.Bubble>Lorem ipsum dolor sit amet.</Chat.Bubble>
                      <Chat.Time>1 hrs ago</Chat.Time>
                    </Chat.Item>
                    <Chat.Item content align="left">
                      <Chat.Author>Charlie</Chat.Author>
                      <Chat.Bubble>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in.
                      </Chat.Bubble>
                      <Chat.Time>2 hrs ago</Chat.Time>
                    </Chat.Item>
                  </Chat>
                  {/* END Chat */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Avatar</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    You can put your <Link href="/elements/advanced/avatar">avatar</Link> into the
                    chat elements. Use <code>Chat.Avatar</code> component instead the default avatar
                    component.
                  </p>
                  {/* BEGIN Chat */}
                  <Chat>
                    <Chat.Item align="right">
                      {/* BEGIN Avatar */}
                      <Chat.Avatar display circle>
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Chat.Avatar>
                      {/* END Avatar */}
                      <Chat.Content>
                        <Chat.Author>Me</Chat.Author>
                        <Chat.Bubble>
                          consectetur adipisicing elit, sed do eiusmod tempor.
                        </Chat.Bubble>
                        <Chat.Bubble>Lorem ipsum dolor sit amet.</Chat.Bubble>
                        <Chat.Time>1 hrs ago</Chat.Time>
                      </Chat.Content>
                    </Chat.Item>
                    <Chat.Item align="left">
                      {/* BEGIN Avatar */}
                      <Chat.Avatar display circle>
                        <img src="/images/avatar/blank.webp" alt="Avatar Image" />
                      </Chat.Avatar>
                      {/* END Avatar */}
                      <Chat.Content>
                        <Chat.Author>Charlie</Chat.Author>
                        <Chat.Bubble>
                          Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                          et dolore magna aliqua.
                        </Chat.Bubble>
                        <Chat.Time>2 hrs ago</Chat.Time>
                      </Chat.Content>
                    </Chat.Item>
                  </Chat>
                  {/* END Chat */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Section</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Chat section is an element that can be used for marking time section, look the
                    example.
                  </p>
                  {/* BEGIN Chat */}
                  <Chat>
                    <Chat.Item content align="right">
                      <Chat.Author>Me</Chat.Author>
                      <Chat.Bubble>
                        consectetur adipisicing elit, sed do eiusmod tempor.
                      </Chat.Bubble>
                      <Chat.Bubble>Lorem ipsum dolor sit amet.</Chat.Bubble>
                      <Chat.Time>1 hrs ago</Chat.Time>
                    </Chat.Item>
                    <Chat.Section>17 August</Chat.Section>
                    <Chat.Item content align="left">
                      <Chat.Author>Charlie</Chat.Author>
                      <Chat.Bubble>
                        Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </Chat.Bubble>
                      <Chat.Time>2 hrs ago</Chat.Time>
                    </Chat.Item>
                  </Chat>
                  {/* END Chat */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Colors</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Change the bubble color with <code>variant</code> property to differentiate each
                    chat bubbles.
                  </p>
                  {/* BEGIN Chat */}
                  <Chat>
                    <Chat.Item content align="right">
                      <Chat.Author>Me</Chat.Author>
                      <Chat.Bubble variant="primary">
                        consectetur adipisicing elit, sed do eiusmod tempor.
                      </Chat.Bubble>
                      <Chat.Bubble variant="primary">Lorem ipsum dolor sit amet.</Chat.Bubble>
                      <Chat.Time>1 hrs ago</Chat.Time>
                    </Chat.Item>
                    <Chat.Item content align="left">
                      <Chat.Author>Charlie</Chat.Author>
                      <Chat.Bubble variant="success">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in.
                      </Chat.Bubble>
                      <Chat.Time>2 hrs ago</Chat.Time>
                    </Chat.Item>
                  </Chat>
                  {/* END Chat */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>More content</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    You can put chat bubble into another bubble to make mentioned message. Insert
                    images or any elements to make more rich messages.
                  </p>
                  {/* BEGIN Chat */}
                  <Chat>
                    <Chat.Item align="right">
                      {/* BEGIN Avatar */}
                      <Chat.Avatar display circle>
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Chat.Avatar>
                      {/* END Avatar */}
                      <Chat.Content>
                        <Chat.Author>Me</Chat.Author>
                        <Chat.Bubble variant="primary">
                          <Chat.Img src="/images/banner/400x240.webp" alt="User Image" />
                          <p className="mb-0">Lorem ipsum dolor sit amet.</p>
                        </Chat.Bubble>
                        <Chat.Bubble variant="primary">Duis aute irure dolor in</Chat.Bubble>
                        <Chat.Time>1 hrs ago</Chat.Time>
                      </Chat.Content>
                    </Chat.Item>
                    <Chat.Item align="left">
                      {/* BEGIN Avatar */}
                      <Chat.Avatar display circle>
                        <img src="/images/avatar/blank.webp" alt="Avatar image" />
                      </Chat.Avatar>
                      {/* END Avatar */}
                      <Chat.Content>
                        <Chat.Author>Charlie</Chat.Author>
                        <Chat.Bubble variant="success">
                          <Chat.Bubble variant="primary">Duis aute irure dolor in</Chat.Bubble>
                          <p className="mb-0">
                            Excepteur sint occaecat cupidatat non proident, sunt in.
                          </p>
                        </Chat.Bubble>
                        <Chat.Time>2 hrs ago</Chat.Time>
                      </Chat.Content>
                    </Chat.Item>
                    <Chat.Item align="right">
                      {/* BEGIN Avatar */}
                      <Avatar display circle>
                        <FontAwesomeIcon icon={SolidIcon.faUser} />
                      </Avatar>
                      {/* END Avatar */}
                      <Chat.Content>
                        <Chat.Author>Me</Chat.Author>
                        <Chat.Bubble variant="primary">
                          <Chat.Bubble variant="primary">
                            {/* BEGIN Rich List */}
                            <RichList.Item className="p-0">
                              <RichList.Addon addonType="prepend">
                                {/* BEGIN Avatar */}
                                <Avatar display variant="label-primary">
                                  <FontAwesomeIcon icon={RegularIcon.faFile} />
                                </Avatar>
                                {/* END Avatar */}
                              </RichList.Addon>
                              <RichList.Content>
                                <RichList.Title>Porta.zip</RichList.Title>
                                <RichList.Subtitle>Cras justo odio</RichList.Subtitle>
                              </RichList.Content>
                            </RichList.Item>
                            {/* END Rich List */}
                          </Chat.Bubble>
                          <p className="mb-0">Lorem ipsum dolor sit amet.</p>
                        </Chat.Bubble>
                        <Chat.Bubble variant="primary">Duis aute irure dolor in</Chat.Bubble>
                        <Chat.Time>1 hrs ago</Chat.Time>
                      </Chat.Content>
                    </Chat.Item>
                  </Chat>
                  {/* END Chat */}
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(ChatPage)))
