import { Marker, Portlet, Timeline } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { firestoreClient } from "components/firebase/firebaseClient";
import Spinner from "@panely/components/Spinner";

class ActivitiesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    firestoreClient
      .collection("activities")
      .where("group", "==", this.props.group)
      .orderBy("date", "desc")
      .limit(22)
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
            content: () => <p className="mb-0" dangerouslySetInnerHTML={{ __html: data.msnForGroup}}></p>,
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
          <Portlet.Title>Activities Group</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Timeline */}
          {this.state.data === null && <Spinner />}
          {this.state.data && this.state.data.length === 0 && (
            <p className="text-center">Empty activities</p>
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
          {/* END Timeline */}
        </Portlet.Body>
      </Portlet>
    );
  }
}

export default ActivitiesComponent;
