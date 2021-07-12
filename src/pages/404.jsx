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
            Lo sentimos, parece que no podemos encontrar la página que estás buscando. Es posible que haya errores de ortografía en la URL ingresada o que la página que está buscando ya no exista.
            </p>
            <Link href="/">
              <Button variant="label-primary" size="lg" width="widest">
                Volver a Home
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
