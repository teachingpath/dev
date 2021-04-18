import {
  Row,
  Col,
  Card,
  Portlet,
  Container,
  CardColumns,
  Button
} from "@panely/components";
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreClient } from "components/firebase/firebaseClient";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import Router from "next/router";

class CatalogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Pathways");
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Catalog", link: "/catalog" },
      { text: "Pathways" },
    ]);
    firestoreClient
      .collection("pathways")
      //      .where("leaderId", "==", this.props.firebase.user_id)
      .get()
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
                            <Button className="float-right" onClick={() => {
                              Router.push({
                                pathname: "/catalog/pathway",
                                query: {
                                  id: data.id,
                                },
                              });
                            }}>Start</Button>

                            <Card.Text>
                              <small className="text-muted">
                                Tags: {data.tags}
                              </small>
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
