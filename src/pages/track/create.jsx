import { Container, Row, Dropdown, Col, Portlet } from "@panely/components";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
  pageShowAlert
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import Router from "next/router";
import TrackList from "components/widgets/TrackList";
import TrackForm from "components/widgets/TrackForm";
import { create } from "consumer/track";
import { updateToDraft } from "consumer/pathway";



class TrackCreatePage extends React.Component {
  constructor(props) {
    super(props);

    if (!Router.query.runnerId) {
      Router.push("/pathway/create");
    }
    this.state = {
      pathwayId: Router.query.pathwayId,
      runnerId: Router.query.runnerId,
      saved: false,
    };

    this.toggle = this.toggle.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  componentDidMount() {
    this.props.pageChangeHeaderTitle("Actualizar");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      {
        text: "Pathway",
        link: "/pathway/edit?pathwayId=" + Router.query.pathwayId,
      },
      {
        text: "Runner",
        link:
          "/runner/edit?pathwayId=" +
          Router.query.pathwayId +
          "&runnerId=" +
          Router.query.runnerId,
      },
      { text: "Track" },
    ]);
  }

  onCreate(data) {
    const { runnerId, pathwayId, extend } = this.state;
    const { pageShowAlert, activityChange } = this.props;
    return create(runnerId, data)
      .then((docRef) => {
        this.setState({
          pathwayId,
          runnerId,
          trackId: docRef.id,
          extend,
          ...data,
        });
        pageShowAlert("Track fue creado correctamente");
        activityChange({
          pathwayId: pathwayId,
          type: "new_track",
          msn: 'El track "' + data.name + '" fue creado.',
        });
        return updateToDraft(pathwayId);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        pageShowAlert("Error al crear el track", "error");
      });
  }

  toggle() {
    this.setState({
      ...this.state,
      extend: !this.state.extend,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Track | Create</title>
        </Head>
        <Container fluid={!this.state.extend}>
          <Row>
            <Col md={this.state.extend ? "12" : "4"}>
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Track | Nuevo</Portlet.Title>
                  <Portlet.Addon>
                    <TrackAddon
                      extend={this.state.extend}
                      toggle={this.toggle}
                    />
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <div>
                    Cree cada track para evaluar las competencias dentro del
                    runner.{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://docs.teachingpath.info/concepts/track"
                    >
                      Ver más información
                    </a>{" "}
                    acerca de los tracks
                  </div>
                  <hr />
                  <TrackForm
                    onSave={this.onCreate}
                    onExtend={() => {
                      if (!this.state.extend) {
                        this.toggle();
                      }
                    }}
                  />
                </Portlet.Body>
              </Portlet>
            </Col>

            <Col md={this.state.extend ? "12" : "8"}>
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Tracks</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <TrackList
                    runnerId={this.state.runnerId}
                    pathwayId={this.state.pathwayId}
                    data={this.state}
                  />
                </Portlet.Body>
              </Portlet>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const TrackAddon = ({ extend, toggle }) => {
  return (
    <>
      <Dropdown.Uncontrolled>
        <Dropdown.Toggle icon variant="text-secondary">
          <FontAwesomeIcon icon={SolidIcon.faEllipsisV} />
        </Dropdown.Toggle>
        <Dropdown.Menu right animated>
          <Dropdown.Item
            onClick={toggle}
            icon={<FontAwesomeIcon icon={SolidIcon.faExpand} />}
          >
            {extend ? "Colapsar" : "Expandir"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
    </>
  );
};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange, pageShowAlert },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(TrackCreatePage)));
