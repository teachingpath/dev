import { Row, Col, Portlet, Blockquote, Container } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class TypoghrapyPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Typoghrapy")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Typoghrapy", link: "/elements/base/type" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Typhography | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="6">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Headings</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    All HTML headings, <code>{"<h1>"}</code> through <code>{"<h6>"}</code>, are
                    available.
                  </p>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header>
                      <Portlet.Title>Headings</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <h1>Heading 1</h1>
                      <h2>Heading 2</h2>
                      <h3>Heading 3</h3>
                      <h4>Heading 4</h4>
                      <h5>Heading 5</h5>
                      <h6>Heading 6</h6>
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Body>
                      <h3 className="mb-0">
                        Fancy display heading{" "}
                        <small className="text-muted">With faded secondary text</small>
                      </h3>
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Blockquote</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    For quoting blocks of content from another source within your document. Wrap{" "}
                    <code>Blockquote</code> around any HTML as the quote.
                  </p>
                  {/* BEGIN Blockquote */}
                  <Blockquote>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat
                      a ante.
                    </p>
                  </Blockquote>
                  {/* END Blockquote */}
                  {/* BEGIN Blockquote */}
                  <Blockquote>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat
                      a ante.
                    </p>
                    <Blockquote.Footer>
                      <cite title="Source Title">Source Title</cite>
                    </Blockquote.Footer>
                  </Blockquote>
                  {/* END Blockquote */}
                  {/* BEGIN Blockquote */}
                  <Blockquote align="center" className="mb-0">
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat
                      a ante.
                    </p>
                    <Blockquote.Footer>
                      <cite title="Source Title">Source Title</cite>
                    </Blockquote.Footer>
                  </Blockquote>
                  {/* END Blockquote */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Abbreviations</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Stylized abbreviations implementation of HTML’s <code>{"<abbr>"}</code> element
                  </p>
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Body>
                      <p>
                        <abbr title="attribute">attr</abbr>
                      </p>
                      <p className="mb-0">
                        <abbr title="HyperText Markup Language" className="initialism">
                          HTML
                        </abbr>
                      </p>
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
                  <Portlet.Title>Display</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    When you need a heading to stand out, consider using a{" "}
                    <strong>display heading</strong>—a larger, slightly more opinionated heading
                    style
                  </p>
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Body>
                      <h1 className="display-1">Display 1</h1>
                      <h1 className="display-2">Display 2</h1>
                      <h1 className="display-3">Display 3</h1>
                      <h1 className="display-4">Display 4</h1>
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Lead</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Make a paragraph stand out by adding <code>.lead</code>.
                  </p>
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Body>
                      <p className="lead mb-0">
                        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis
                        mollis, est non commodo luctus.
                      </p>
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Inline text styles</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>Styling for common inline HTML5 elements.</p>
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Body>
                      <p>
                        You can use the mark tag to <mark>highlight</mark> text.
                      </p>
                      <p>
                        <del>This line of text is meant to be treated as deleted text.</del>
                      </p>
                      <p>
                        <s>This line of text is meant to be treated as no longer accurate.</s>
                      </p>
                      <p>
                        <ins>
                          This line of text is meant to be treated as an addition to the document.
                        </ins>
                      </p>
                      <p>
                        <u>This line of text will render as underlined</u>
                      </p>
                      <p>
                        <small>This line of text is meant to be treated as fine print.</small>
                      </p>
                      <p>
                        <strong>This line rendered as bold text.</strong>
                      </p>
                      <p className="mb-0">
                        <em>This line rendered as italicized text.</em>
                      </p>
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(TypoghrapyPage)))
