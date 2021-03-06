import {
  Row,
  Col,
  Card,
  Portlet,
  Container,
  CardColumns,
  Button,
} from "@panely/components";
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import Badge from "@panely/components/Badge";
import Spinner from "@panely/components/Spinner";
import { searchPathways } from "consumer/catalog";

class CatalogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    const q = Router.query.q;
    const tags = Router.query.tag;

    this.props.pageChangeHeaderTitle("Pathways");
    this.props.breadcrumbChange([{ text: "Catálogo", link: "/catalog" }]);
    searchPathways(
      tags,
      q,
      (list) => {
        this.setState(list);
      },
      () => {}
    );
  }

  render() {
    if (this.state.data === null) {
      return <Spinner className="m-5">Cargando...</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | Teaching Path</title>
          <script src="/script.js"></script>
        </Head>
        <Container fluid>
          <Row>
            <Col md="12">
              <div>
                <Portlet.Header bordered>
                  <Portlet.Title>Pathways disponibles</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Puede ver los Pathways aquí, pero para postularse debe tener
                    una cuenta de usuario.
                  </p>
                  <CardColumns>
                    {this.state.data.length === 0 && (
                      <p className="p-5">No hay coincidencias para mostrar.</p>
                    )}
                    {this.state.data.map((data, index) => {
                      return (
                        <ItemCatalog data={data} key={"pathwayId-" + index} />
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

const ItemCatalog = ({ data }) => {
  return (
    <Card>
      <Card.Img top src={data.image} alt="Pathway Image" />

      <Card.Body>
        <Card.Title>
          <Link href={"/catalog/pathway?id=" + data.id}>
            {data.name.toUpperCase()}
          </Link>
        </Card.Title>
        <Card.Subtitle>
          <Badge  variant="outline-primary" className="mr-1">
            {{
              "beginner": "Nivel: Principiante",
              "middle": "Nivel: Intermedio",
              "advanced": "Nivel: Avanzado"
            }[data.level]}
          </Badge>
          <Badge href={"/catalog/runners/?pathwayId="+data.id} variant="outline-success" className="mr-1">
           Ver rutuas
          </Badge>
        </Card.Subtitle>
        <Card.Text className="mt-2">{data.description}</Card.Text>
        <Button
          className="float-right mb-2"
          onClick={() => {
            Router.push({
              pathname: "/catalog/pathway",
              query: {
                id: data.id,
              },
            });
          }}
        >
          Iniciar
        </Button>

        <Card.Text>
          <span className="text-muted">
            Tags:{" "}
            {data.tags.map((tag, index) => {
              return (
                <Badge
                  key={"tags-key" + index}
                  variant="label-info"
                  className="mr-1"
                >
                  <a href={"/catalog?tag=" + tag}>{tag}</a>
                </Badge>
              );
            })}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

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
