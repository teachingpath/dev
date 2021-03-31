import { Row, Col, Portlet, Container } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Quill from "@panely/quill"
import Head from "next/head"

class EditorBasicPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Basic Editor")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Editor" },
      { text: "Basic", link: "/editor/basic" }
    ])
  }

  state = {
    // Initial editor content
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod."
  }

  // Handle editor change event
  handleChange = value => {
    this.setState({ content: value })
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Basic Editor | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Basic editor</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Quill
                    value={this.state.content}
                    onChange={this.handleChange}
                    style={{ minHeight: "20rem" }}
                  />
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(EditorBasicPage)))
