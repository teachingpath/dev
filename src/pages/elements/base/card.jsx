import {
  Row,
  Col,
  Nav,
  Card,
  Badge,
  Button,
  Portlet,
  CardDeck,
  Container,
  ListGroup,
  CardGroup,
  CardColumns,
  Blockquote
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

class CardPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Card")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Card", link: "/elements/base/card" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Card | Panely</title>
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
                  <p>Below is an example of a basic card with mixed content</p>
                  <p>
                    Card titles are used by using <code>Card.Title</code> component. In the same
                    way, links are added and placed next to each other by using{" "}
                    <code>Card.Link</code> component.
                  </p>
                  <p>
                    Subtitles are used by using a <code>Card.Subtitle</code> component. If the{" "}
                    <code>Card.Title</code> and the <code>Card.Subtitle</code> components are placed
                    in a <code>Card.Body</code> component, the card title and subtitle are aligned
                    nicely.
                  </p>
                  <CardDeck className="align-items-start">
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Img top src="/images/banner/760x480.webp" alt="Card Image" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </Card.Text>
                        <Button>Go somewhere</Button>
                      </Card.Body>
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Subtitle>Card subtitle</Card.Subtitle>
                        <Card.Text>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card link</Card.Link>
                        <Card.Link href="#">Another link</Card.Link>
                      </Card.Body>
                    </Card>
                    {/* END Card */}
                  </CardDeck>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>List group</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Mix and match multiple content types to create the card you need, or throw
                    everything in there. Shown below are image styles, blocks, text styles, and a
                    list group—all wrapped in a fixed-width card.
                  </p>
                  <Row>
                    <Col sm="6">
                      {/* BEGIN Card */}
                      <Card className="mb-3">
                        <ListGroup flush>
                          <ListGroup.Item>Cras justo odio</ListGroup.Item>
                          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                      </Card>
                      {/* END Card */}
                      {/* BEGIN Card */}
                      <Card className="mb-3 mb-sm-0">
                        <Card.Header>Featured</Card.Header>
                        <ListGroup flush>
                          <ListGroup.Item>Cras justo odio</ListGroup.Item>
                          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                      </Card>
                      {/* END Card */}
                    </Col>
                    <Col sm="6">
                      {/* BEGIN Card */}
                      <Card>
                        <Card.Img top src="/images/banner/760x480.webp" alt="Card Image" />
                        <Card.Body>
                          <Card.Title>Card title</Card.Title>
                          <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                          </Card.Text>
                        </Card.Body>
                        <ListGroup flush>
                          <ListGroup.Item>Cras justo odio</ListGroup.Item>
                          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                          <Card.Link href="#">Card link</Card.Link>
                          <Card.Link href="#">Another link</Card.Link>
                        </Card.Body>
                      </Card>
                      {/* END Card */}
                    </Col>
                  </Row>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Navigation</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add some navigation to a card’s header (or block) with{" "}
                    <Link href="/elements/base/nav">nav</Link>.
                  </p>
                  {/* BEGIN Card */}
                  <Card className="text-center mb-3">
                    <Card.Header>
                      {/* BEGIN Nav */}
                      <Nav tabs card>
                        <Nav.Item href="#" active>
                          Active
                        </Nav.Item>
                        <Nav.Item href="#">Link</Nav.Item>
                        <Nav.Item href="#" disabled>
                          Disabled
                        </Nav.Item>
                      </Nav>
                      {/* END Nav */}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Special title treatment</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                      </Card.Text>
                      <Button>Go somewhere</Button>
                    </Card.Body>
                  </Card>
                  {/* END Card */}
                  {/* BEGIN Card */}
                  <Card className="text-center mb-3">
                    <Card.Header>
                      {/* BEGIN Nav */}
                      <Nav pills card>
                        <Nav.Item href="#" active>
                          Active
                        </Nav.Item>
                        <Nav.Item href="#">Link</Nav.Item>
                        <Nav.Item href="#" disabled>
                          Disabled
                        </Nav.Item>
                      </Nav>
                      {/* END Nav */}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Special title treatment</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                      </Card.Text>
                      <Button>Go somewhere</Button>
                    </Card.Body>
                  </Card>
                  {/* END Card */}
                  {/* BEGIN Card */}
                  <Card className="text-center">
                    <Card.Header>
                      {/* BEGIN Nav */}
                      <Nav lines card>
                        <Nav.Item href="#" active>
                          Active
                        </Nav.Item>
                        <Nav.Item href="#">Link</Nav.Item>
                        <Nav.Item href="#" disabled>
                          Disabled
                        </Nav.Item>
                      </Nav>
                      {/* END Nav */}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Special title treatment</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                      </Card.Text>
                      <Button>Go somewhere</Button>
                    </Card.Body>
                  </Card>
                  {/* END Card */}
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
                    Using a combination of grid and utility classes, cards can be made horizontal in
                    a mobile-friendly and responsive way. In the example below, we remove the grid
                    gutters with <code>noGutters</code> property and use <code>Col</code> component
                    to make the card horizontal at the <code>md</code> breakpoint. Further
                    adjustments may be needed depending on your card content.
                  </p>
                  {/* BEGIN Card */}
                  <Card>
                    <Row noGutters>
                      <Col md="4">
                        <Card.Img src="/images/banner/760x480.webp" alt="Card Image" />
                      </Col>
                      <Col md="8">
                        <Card.Body>
                          <Card.Title>Card title</Card.Title>
                          <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                          </Card.Text>
                          <Card.Text>
                            <small className="text-muted">Last updated 3 mins ago</small>
                          </Card.Text>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                  {/* END Card */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Image</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    <code>Card.Img</code> with <code>top</code> property places an image to the top
                    of the card. With <code>Card.Text</code>, text can be added to the card. Text
                    within <code>Card.Text</code> can also be styled with the standard HTML tags.
                  </p>
                  <p>
                    Similar to headers and footers, cards can include top and bottom “image
                    caps”—images at the top or bottom of a card.
                  </p>
                  <CardDeck className="mb-3">
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Img top src="/images/banner/760x480.webp" alt="Card Image" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                        <Card.Text>
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                        <Card.Text>
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Text>
                      </Card.Body>
                      <Card.Img bottom src="/images/banner/760x480.webp" alt="Card Image" />
                    </Card>
                    {/* END Card */}
                  </CardDeck>
                  <p>
                    Turn an image into a card background and overlay your card’s text. Depending on
                    the image, you may or may not need additional styles or utilities.
                  </p>
                  {/* BEGIN Card */}
                  <Card inverse>
                    <Card.Img filter src="/images/banner/1120x480.webp" alt="Card Image" />
                    <Card.ImgOverlay>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                      </Card.Text>
                    </Card.ImgOverlay>
                  </Card>
                  {/* END Card */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Header and footer</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add an optional header and/or footer within a card. Card header can be contain
                    title, icon, or other elements.
                  </p>
                  {/* BEGIN Card */}
                  <Card className="mb-3">
                    <Card.Header>
                      <Card.Title tag="h3">Card Title</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Special title treatment</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                      </Card.Text>
                      <Button>Go somewhere</Button>
                    </Card.Body>
                  </Card>
                  {/* END Card */}
                  {/* BEGIN Card */}
                  <Card className="mb-3">
                    <Card.Header>
                      <Card.Icon>
                        <FontAwesomeIcon icon={SolidIcon.faStar} />
                      </Card.Icon>
                      <Card.Title tag="h3">Card Title</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Special title treatment</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                      </Card.Text>
                      <Button>Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                  </Card>
                  {/* END Card */}
                  {/* BEGIN Card */}
                  <Card>
                    <Card.Header>
                      <Card.Icon>
                        <FontAwesomeIcon icon={SolidIcon.faStar} />
                      </Card.Icon>
                      <Card.Title tag="h3">Card Title</Card.Title>
                      <Card.Addon>
                        <Badge variant="warning">9+</Badge>
                      </Card.Addon>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Special title treatment</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                      </Card.Text>
                      <Button>Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                  </Card>
                  {/* END Card */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Alignment</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    You can quickly change the text alignment of any card—in its entirety or
                    specific parts—with our <strong>text align classes</strong>.
                  </p>
                  {/* BEGIN Card */}
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Special title treatment</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                      </Card.Text>
                      <Button>Go somewhere</Button>
                    </Card.Body>
                  </Card>
                  {/* END Card */}
                  {/* BEGIN Card */}
                  <Card className="text-center mb-3">
                    <Card.Body>
                      <Card.Title>Special title treatment</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                      </Card.Text>
                      <Button>Go somewhere</Button>
                    </Card.Body>
                  </Card>
                  {/* END Card */}
                  {/* BEGIN Card */}
                  <Card className="text-right">
                    <Card.Body>
                      <Card.Title>Special title treatment</Card.Title>
                      <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                      </Card.Text>
                      <Button>Go somewhere</Button>
                    </Card.Body>
                  </Card>
                  {/* END Card */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Card groups</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Use card groups to render cards as a single, attached element with equal width
                    and height columns.
                  </p>
                  <CardGroup>
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Img top src="/images/banner/760x480.webp" alt="Card Image" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Img top src="/images/banner/760x480.webp" alt="Card Image" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Img top src="/images/banner/760x480.webp" alt="Card Image" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </Card.Footer>
                    </Card>
                    {/* END Card */}
                  </CardGroup>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Card decks</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Need a set of equal width and height cards that aren’t attached to one another?
                    Use card decks.
                  </p>
                  <CardDeck>
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Img top src="/images/banner/760x480.webp" alt="Card Image" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a longer card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                        <Card.Text>
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Img top src="/images/banner/760x480.webp" alt="Card Image" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This card has supporting text below as a natural lead-in to additional
                          content.
                        </Card.Text>
                        <Card.Text>
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Img top src="/images/banner/760x480.webp" alt="Card Image" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This card has even longer content than the first to
                          show that equal height action.
                        </Card.Text>
                        <Card.Text>
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    {/* END Card */}
                  </CardDeck>
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Collumns</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Cards can be organized into Masonry-like columns with just CSS by wrapping them
                    in <code>CardColumns</code> component. Cards are built with CSS{" "}
                    <code>column</code> properties instead of flexbox for easier alignment. Cards
                    are ordered from top to bottom and left to right.
                  </p>
                  <CardColumns>
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Img top src="/images/banner/760x480.webp" alt="Card Image" />
                      <Card.Body>
                        <Card.Title>Card title that wraps to a new line</Card.Title>
                        <Card.Text>
                          This is a longer card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card className="p-3">
                      <Card.Body blockquote className="mb-0">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                          erat a ante.
                        </p>
                        <Blockquote.Footer>
                          <small className="text-muted">
                            Someone famous in
                            <cite title="Source Title">Source Title</cite>
                          </small>
                        </Blockquote.Footer>
                      </Card.Body>
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Img top src="/images/banner/760x480.webp" alt="Card Image" />
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This card has supporting text below as a natural lead-in to additional
                          content.
                        </Card.Text>
                        <Card.Text>
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card className="bg-primary text-white text-center p-3">
                      <Blockquote className="mb-0">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                          erat.
                        </p>
                        <Blockquote.Footer className="text-white">
                          <small>
                            Someone famous in
                            <cite title="Source Title">Source Title</cite>
                          </small>
                        </Blockquote.Footer>
                      </Blockquote>
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This card has a regular title and short paragraphy of text below it.
                        </Card.Text>
                        <Card.Text>
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Img top src="/images/banner/760x480.webp" alt="Card Image" />
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card className="text-right p-3">
                      <Blockquote className="mb-0">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                          erat a ante.
                        </p>
                        <Blockquote.Footer>
                          <small>
                            Someone famous in
                            <cite title="Source Title">Source Title</cite>
                          </small>
                        </Blockquote.Footer>
                      </Blockquote>
                    </Card>
                    {/* END Card */}
                    {/* BEGIN Card */}
                    <Card>
                      <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                          This is another card with title and supporting text below. This card has
                          some additional content to make it slightly taller overall.
                        </Card.Text>
                        <Card.Text>
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    {/* END Card */}
                  </CardColumns>
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(CardPage)))
