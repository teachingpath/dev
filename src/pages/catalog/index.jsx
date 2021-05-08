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
import Spinner from "@panely/components/Spinner";

class CatalogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    const q = Router.query.q;
    const tags = Router.query.tag;

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
      console.log(tags);
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
    if (this.state.data === null) {
      return <Spinner className="m-5">Loading</Spinner>;
    }
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
                    {this.state.data.length === 0 && (
                      <p className="p-5">
                        There is no match to display.
                      </p>
                    )}
                    {this.state.data.map((data, index) => {
                      return (
                        <Card key={"pathwayId-" + index}>
                          <Card.Img top src={data.image} alt="Pathway Image" />
                          <Card.Body>
                            <Card.Title>{data.name.toUpperCase()}</Card.Title>
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
                                    <Badge
                                      variant="label-info"
                                      className="mr-1"
                                    >
                                      <a href={"/catalog?tag=" + tag} >
                                        {tag}
                                      </a>
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
