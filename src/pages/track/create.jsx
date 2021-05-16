import { Container, Row, Dropdown, Col, Portlet } from "@panely/components";
import { firestoreClient } from "components/firebase/firebaseClient";
import {
  pageChangeHeaderTitle,
  breadcrumbChange,
  activityChange,
} from "store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import withLayout from "components/layout/withLayout";
import withAuth from "components/firebase/firebaseWithAuth";
import Head from "next/head";
import uuid from "components/helpers/uuid";
import Router from "next/router";
import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import TrackList from "../../components/widgets/TrackList";
import TrackForm from "../../components/widgets/TrackForm";

const ReactSwal = swalContent(Swal);
const toast = ReactSwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", ReactSwal.stopTimer);
    toast.addEventListener("mouseleave", ReactSwal.resumeTimer);
  },
});

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
    this.props.pageChangeHeaderTitle("Update Pathway");
    this.props.breadcrumbChange([
      { text: "Home", link: "/" },
      {
        text: "Pathway",
        link: "/pathway/edit?pathwayId=" + Router.query.pathwayId,
      },
      {
        text: "Runner",
        link: "/runner/edit?pathwayId=" + Router.query.pathwayId+"&runnerId="+Router.query.runnerId
      },
      { text: "Track" },
    ]);
  }

  onCreate(data) {
    const trackId = uuid();
    const runnersDb = firestoreClient
      .collection("runners")
      .doc(this.state.runnerId);

    return runnersDb
      .collection("tracks")
      .doc(trackId)
      .set({
        level: 1,
        ...data,
      })
      .then((docRef) => {
        this.setState({
          pathwayId: this.state.pathwayId,
          runnerId: this.state.runnerId,
          trackId: trackId,
          extend: this.state.extend,
          ...data,
        });
        toast.fire({
          icon: "success",
          title: "Track saved successfully",
        });
        this.props.activityChange({
          pathwayId: this.state.pathwayId,
          type: "new_track",
          msn: 'The "' + data.name + '" track was created.',
          ...data,
        });
        return firestoreClient
          .collection("pathways")
          .doc(Router.query.pathwayId)
          .update({
            draft: true
          })
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.fire({
          icon: "error",
          title: "Creation track",
        });
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
          <Col md={this.state.extend ? "12" : "6"}>
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Track | Create</Portlet.Title>
                  <Portlet.Addon>
                    <TrackAddon
                      extend={this.state.extend}
                      toggle={this.toggle}
                    />
                  </Portlet.Addon>
                </Portlet.Header>
                <Portlet.Body>
                  <div>
                    Create each track to evaluate the competencies within the
                    runner.
                  </div>
                  <hr />
                  <TrackForm onSave={this.onCreate}  onExtend={() => {
                    if(!this.state.extend){
                      this.toggle()
                    }
                  }} />
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
            </Col>

            <Col md={this.state.extend ? "12" : "6"}>
              {/* BEGIN Portlet */}
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
            {extend ? "Collapse":"Expand"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
    </>
  );
};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange, activityChange },
    dispatch
  );
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(TrackCreatePage)));
