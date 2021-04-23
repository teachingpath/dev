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
import { firestoreClient } from "components/firebase/firebaseClient";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import Badge from "@panely/components/Badge";

class CatalogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    const q = Router.query.q;
    const tags = Router.query.tags;

    this.props.pageChangeHeaderTitle("Pathways");
    this.props.breadcrumbChange([
      { text: "Catalog", link: "/catalog" },
      { text: "Pathways" },
    ]);
    let db = firestoreClient.collection("pathways").where("draft", "==", false);
    if (q) {
      db = db.where("name", ">=", q).where("name", "<=", q + "\uf8ff");
    }
    if (tags) {
      db = db.where("tags", "array-contains", tags);
    }
    db.get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.setState({ data: list });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Pathway | Teaching Path</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="12">
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Available pathways</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    You can see the pathways here but in order to apply you must
                    have a user account.
                  </p>
                  <CardColumns>
                    {this.state.data.map((data, index) => {
                      return (
                        <Card id={"pathwayId-" + index}>
                          <Card.Img top src={data.image} alt="Pathway Image" />
                          <Card.Body>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>{data.description}</Card.Text>
                            <Button
                              className="float-right"
                              onClick={() => {
                                Router.push({
                                  pathname: "/catalog/pathway",
                                  query: {
                                    id: data.id,
                                  },
                                });
                              }}
                            >
                              Start
                            </Button>

                            <Card.Text>
                              <span className="text-muted">
                                Tags:{" "}
                                {data.tags.map((tag, index) => {
                                  return (
                                    <Badge variant="label-info" className="mr-1">
                                      <Link href={"/catalog?tag=" + tag}>
                                        {tag}
                                      </Link>
                                    </Badge>
                                  );
                                })}
                              </span>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </CardColumns>
                </Portlet.Body>
              </Portlet>
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