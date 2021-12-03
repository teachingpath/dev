import {
  Row,
  Col,
  Card,
  Portlet,
  Container,
  CardColumns,
} from "@panely/components";
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import Router from "next/router";
import Spinner from "@panely/components/Spinner";
import Link from "next/link";
import { getRunners } from "consumer/runner";

class CatalogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    const pathwayId = Router.query.pathwayId;

    this.props.pageChangeHeaderTitle("Pathways");
    this.props.breadcrumbChange([
      { text: "Catálogo", link: "/catalog" },
      { text: "Rutas" },
    ]);
    getRunners(pathwayId, (data) => {
      this.setState({data: data.list});
    }, () => {})
  }

  render() {
    if (this.state.data === null) {
      return <Spinner className="m-5">Loading</Spinner>;
    }

    return (
      <React.Fragment>
        <Head>
          <title>Rutas | Teaching Path</title>
          <script src="/script.js"></script>
        </Head>
        <Container fluid>
          <Row>
            <Col md="12">
              <div>
                <Portlet.Header bordered>
                  <Portlet.Title>Rutas disponibles </Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                  Puedes ver las RUTAS aquí pero para postularte debes
                     tener una cuenta de usuario.
                  </p>
                  <CardColumns>
                    {this.state.data.length === 0 && (
                      <p className="p-5">No hay coincidencias para mostrar.</p>
                    )}
                    {this.state.data.map((data, index) => {
                      const title =   (index+1)+". "+data.name.toUpperCase();
                      return (
                        <Card key={"runnerId-" + index}>
                          <Card.Body>
                            <Card.Title>
                              <Link href={"/catalog/runner?id=" + data.id}>
                                {title}
                              </Link>
                            </Card.Title>
                            <Card.Text>{data.description}</Card.Text>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </CardColumns>
                </Portlet.Body>
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withLayout(CatalogPage, "public"));
