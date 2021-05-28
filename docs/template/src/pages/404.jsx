import { Row, Col, Button, Container, Widget14, Widget15 } from "@panely/components"
import Link from "next/link"
import Head from "next/head"

function ErrorPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Not Found | Panely</title>
      </Head>
      <Container fluid>
        <Row noGutters className="align-items-center justify-content-center h-100">
          <Col md="8" lg="6" className="text-center">
            <Widget15>404</Widget15>
            <h2 className="mb-3">Page Not Found!</h2>
            <p className="mb-4">
              Sorry we can't seem to find the page you're looking for. There may be amisspelling in
              the URL entered, or the page you are looking for may no longer exist.
            </p>
            <Link href="/">
              <Button variant="label-primary" size="lg" width="widest">
                Back to home
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

// Set custom page layout property
export async function getStaticProps() {
  return {
    props: {
      layout: "blank"
    }
  }
}

export default ErrorPage
