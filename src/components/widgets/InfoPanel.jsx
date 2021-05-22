import {
  Avatar,
  Modal,
  Portlet,
  RichList,
  Widget10,
  Widget8,
} from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { firestoreClient } from "../firebase/firebaseClient";
import Button from "@panely/components/Button";
import React from "react";
import Progress from "@panely/components/Progress";


class InfoPanelComponent extends React.Component {
  state = {
    isOpenTraineesRunning: false,
    data: [
      {
        title: "100%",
        subtitle: "Popularity",
        avatar: () => (
          <Widget8.Avatar
            display
            circle
            variant="label-primary"
            className="m-0"
          >
            <FontAwesomeIcon icon={SolidIcon.faRocket} />
          </Widget8.Avatar>
        ),
        data: [],
      },
      {
        title: "0",
        subtitle: "Trainees running",
        avatar: () => (
          <Widget8.Avatar
            display
            circle
            variant="label-success"
            className="m-0"
          >
            <FontAwesomeIcon icon={SolidIcon.faRunning} />
          </Widget8.Avatar>
        ),
        data: [],
      },
      {
        title: "0",
        subtitle: "Trainees finished",
        avatar: () => (
          <Widget8.Avatar display circle variant="label-danger" className="m-0">
            <FontAwesomeIcon icon={SolidIcon.faCheck} />
          </Widget8.Avatar>
        ),
        data: [],
      },
    ],
  };

  componentDidMount() {
    firestoreClient
      .collection("pathways")
      .where("leaderId", "==", this.props.firebase.user_id)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.id);
        });
        firestoreClient
          .collection("journeys")
          .where("pathwayId", "in", list)
          .get()
          .then((querySnapshot) => {
            const finisheds = [];
            const inRunning = [];
            querySnapshot.forEach(async (doc) => {
              const data = doc.data();
              if (data.progress >= 100) {
                finisheds.push(data);
              } else {
                inRunning.push(data);
              }
              const dataSummary = this.state.data;
              dataSummary[1].data = inRunning;
              dataSummary[2].data = finisheds;
              this.setState({
                data: dataSummary,
              });
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    return (
      <Portlet>
        <Widget10 vertical="md">
          {this.state.data.map((data, index) => {
            const { title, subtitle, avatar: WidgetAvatar } = data;

            return (
              <Widget10.Item key={index}>
                <Widget10.Content>
                  <Widget10.Title
                    children={
                      data.data.length ? (
                        <InfoModal
                          key={index}
                          title={title}
                          data={data.data}
                          subtitle={subtitle}
                        />
                      ) : (
                        title
                      )
                    }
                  />
                  <Widget10.Subtitle children={subtitle} />
                </Widget10.Content>
                <Widget10.Addon>
                  <WidgetAvatar />
                </Widget10.Addon>
              </Widget10.Item>
            );
          })}
        </Widget10>
      </Portlet>
    );
  }
}

class InfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <React.Fragment>
        <a href={"#"} onClick={this.toggle}>
          {this.props.data.length}
        </a>

        <Modal
          scrollable
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          className="modal-xl"
        >
          <Modal.Header toggle={this.toggle}>
            {this.props.subtitle}
          </Modal.Header>
          <Modal.Body>
            <RichList bordered action>
              {this.props.data.map((data, index) => {
                const { name, date, progress, id, user } = data;
                const dateUpdated = new Date(
                  (date.seconds + date.nanoseconds * 10 ** -9) * 1000
                );
                return (
                  <>
                    <h4 className="mt-3"> {user.displayName.toUpperCase()}</h4>
                    <RichList.Item key={index} title={"User: " + user.email}>
                      <RichList.Addon addonType="prepend">
                        {/* BEGIN Avatar */}
                        <Avatar block>
                          <FontAwesomeIcon icon={SolidIcon.faUserAlt} />
                        </Avatar>

                        {/* END Avatar */}
                      </RichList.Addon>
                      <RichList.Content>
                        <RichList.Title
                          children={
                            <Progress
                              striped
                              className="mr-2 mb-2"
                              value={progress.toFixed(2)}
                            >
                              {progress.toFixed(2)}%
                            </Progress>
                          }
                        />

                        <RichList.Title children={name.toUpperCase()} />
                        <RichList.Subtitle
                          children={
                            "Date: " +
                            dateUpdated.toLocaleDateString() +
                            " " +
                            dateUpdated.toLocaleTimeString()
                          }
                        />
                      </RichList.Content>
                    </RichList.Item>
                  </>
                );
              })}
            </RichList>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="mr-2"
              title={"Close modal"}
              onClick={() => {
                this.toggle();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </React.Fragment>
    );
  }
}

export default InfoPanelComponent;
