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
import { firestoreClient } from "components/firebase/firebaseClient";
import withLayout from "components/layout/withLayout";
import Head from "next/head";
import Router from "next/router";
import Spinner from "@panely/components/Spinner";
import Link from "next/link";

class CatalogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    const pathwayId = Router.query.pathwayId;

    this.props.pageChangeHeaderTitle("Pathways");
    this.props.breadcrumbChange([
      { text: "Catalog", link: "/catalog" },
      { text: "Runners" },
    ]);
    firestoreClient
      .collection("runners")
      .where("pathwayId", "==", pathwayId)
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
    if (this.state.data === null) {
      return <Spinner className="m-5">Loading</Spinner>;
    }
    return (
      <React.Fragment>
        <Head>
          <title>Runners | Teaching Path</title>
        </Head>
        <Container fluid>
          <Row>
            <Col md="12">
              <div>
                <Portlet.Header bordered>
                  <Portlet.Title>Available runners</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    You can see the runners here but in order to apply you must
                    have a user account.
                  </p>
                  <CardColumns>
                    {this.state.data.length === 0 && (
                      <p className="p-5">There is no match to display.</p>
                    )}
                    {this.state.data.map((data, index) => {
                      return (
                        <Card key={"runnerId-" + index}>
                          <Card.Body>
                            <Card.Title>
                              <Link href={"/catalog/runner?id=" + data.id}>
                                {data.name.toUpperCase()}
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
