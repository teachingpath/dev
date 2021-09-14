import { Marker, Portlet, Timeline } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { firestoreClient } from "components/firebase/firebaseClient";
import Spinner from "@panely/components/Spinner";
import { escapeHtml } from "components/helpers/mapper";

class ActivitiesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    let activities = firestoreClient.collection("activities");
    if (this.props.filterByGroup) {
      activities = activities
        .where("leaderId", "==", this.props.firebase.user_id)
        .where("group", "==", this.props.filterByGroup);
    } else {
      activities =  activities.where("leaderId", "==", this.props.firebase.user_id);
    }
    activities
      .orderBy("date", "desc")
      .limit(25)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const time = new Date(data.date.seconds * 1000).toLocaleTimeString(
            "es-ES",
            { hour12: false }
          );

          list.push({
            time: time.substr(0, time.lastIndexOf(":")),
            date: new Date(data.date.seconds * 1000),
            color: data.color || "info",
            content: () => <p className="mb-0">{escapeHtml(data.msn)}</p>,
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
      <Portlet>
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faClipboardList} />
          </Portlet.Icon>
          <Portlet.Title>Actividades recientes</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body className="list">
          {this.state.data === null && <Spinner />}
          {this.state.data && this.state.data.length === 0 && (
            <p className="text-center">No hay actividadedes en este momento</p>
          )}
          <Timeline timed>
            {this.state.data &&
              this.state.data.map((data, index) => {
                const { time, date, color, content: Content } = data;

                return (
                  <Timeline.Item
                    key={index}
                    date={date}
                    time={time}
                    pin={<Marker type="circle" variant={color} />}
                  >
                    <Content />
                  </Timeline.Item>
                );
              })}
          </Timeline>
        </Portlet.Body>
      </Portlet>
    );
  }
}

export default ActivitiesComponent;
