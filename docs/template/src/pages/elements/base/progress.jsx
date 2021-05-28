import { Row, Col, Portlet, Progress, Container } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class ProgressPage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Progress")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Elements" },
      { text: "Base" },
      { text: "Progress", link: "/elements/base/progress" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Progress | Panely</title>
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
                    <strong>Progress</strong> components are built with two HTML elements, some CSS
                    to set the width, and a few attributes.
                  </p>
                  {/* BEGIN Progresses */}
                  <Progress className="mb-2" />
                  <Progress value={25} className="mb-2" />
                  <Progress value={50} className="mb-2" />
                  <Progress value={75} className="mb-2" />
                  <Progress value={100} />
                  {/* END Progresses */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header>
                  <Portlet.Title>Striped</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Body>
                      <p>
                        Add <code>striped</code> property to any <code>Progress</code> component to
                        apply a stripe via CSS gradient over the progress bar’s background color.
                      </p>
                      {/* BEGIN Progresses */}
                      <Progress striped variant="primary" value={20} className="mb-2" />
                      <Progress striped variant="secondary" value={30} className="mb-2" />
                      <Progress striped variant="info" value={40} className="mb-2" />
                      <Progress striped variant="success" value={50} className="mb-2" />
                      <Progress striped variant="warning" value={60} className="mb-2" />
                      <Progress striped variant="danger" value={70} className="mb-2" />
                      <Progress striped variant="dark" value={80} />
                      {/* END Progresses */}
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Header bordered>
                      <Portlet.Title>Animated</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <p>
                        The striped gradient can also be animated. Add <code>animated</code>{" "}
                        property to <code>Progress</code> component to animate the stripes via CSS3
                        animations.
                      </p>
                      {/* BEGIN Progresses */}
                      <Progress animated variant="primary" value={20} className="mb-2" />
                      <Progress animated variant="secondary" value={30} className="mb-2" />
                      <Progress animated variant="info" value={40} className="mb-2" />
                      <Progress animated variant="success" value={50} className="mb-2" />
                      <Progress animated variant="warning" value={60} className="mb-2" />
                      <Progress animated variant="danger" value={70} className="mb-2" />
                      <Progress animated variant="dark" value={80} />
                      {/* END Progresses */}
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
                  <Portlet.Title>Contextual color</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Use <code>variant</code> property to change the appearance of individual
                    progress bars.
                  </p>
                  {/* BEGIN Progresses */}
                  <Progress variant="primary" value={20} className="mb-2" />
                  <Progress variant="secondary" value={30} className="mb-2" />
                  <Progress variant="info" value={40} className="mb-2" />
                  <Progress variant="success" value={50} className="mb-2" />
                  <Progress variant="warning" value={60} className="mb-2" />
                  <Progress variant="danger" value={70} className="mb-2" />
                  <Progress variant="dark" value={80} />
                  {/* END Progresses */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Label</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Add labels to your progress bars by placing text within the{" "}
                    <code>Progress</code> component.
                  </p>
                  {/* BEGIN Progresses */}
                  <Progress variant="primary" value={20} className="mb-2">20%</Progress>
                  <Progress variant="secondary" value={30} className="mb-2">30%</Progress>
                  <Progress variant="info" value={40} className="mb-2">40%</Progress>
                  <Progress variant="success" value={50} className="mb-2">50%</Progress>
                  <Progress variant="warning" value={60} className="mb-2">60%</Progress>
                  <Progress variant="danger" value={70} className="mb-2">70%</Progress>
                  <Progress variant="dark" value={80}>80%</Progress>
                  {/* END Progresses */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Height</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Use <code>size</code> property to change progress element height.
                  </p>
                  {/* BEGIN Progresses */}
                  <Progress size="sm" value={25} className="mb-2" />
                  <Progress size="lg" value={25} className="mb-2" />
                  {/* END Progresses */}
                  <p>
                    Or you can set a height value on the <code>Progress</code>.
                  </p>
                  {/* BEGIN Progresses */}
                  <Progress style={{ height: "2px" }} value={25} className="mb-2" />
                  <Progress style={{ height: "10px" }} value={25} />
                  {/* END Progresses */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Multiple</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>Include multiple progress bars in a progress component if you need.</p>
                  {/* BEGIN Progress */}
                  <Progress multi>
                    <Progress bar value="15" />
                    <Progress bar variant="success" value="30" />
                    <Progress bar variant="info" value="20" />
                  </Progress>
                  {/* END Progress */}
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

export default connect(null, mapDispathToProps)(withAuth(withLayout(ProgressPage)))
