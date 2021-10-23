import { Marker, Portlet, Timeline } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Spinner from "@panely/components/Spinner";
import { getActivities } from "consumer/user";

class ActivitiesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    getActivities(
      this.props.firebase.user_id,
      this.props.filterByGroup,
      (data) => {
        this.setState(data);
      },
      () => {}
    );
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
