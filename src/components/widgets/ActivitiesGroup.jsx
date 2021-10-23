import { Marker, Portlet, Timeline } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Spinner from "@panely/components/Spinner";
import { getActivitiesForGroup } from "consumer/user";

class ActivitiesComponent extends React.Component {
  state = { data: null };

  componentDidMount() {
    getActivitiesForGroup(
      this.props.group,
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
          <Portlet.Title>Actividades de la Sala</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body className="list">
          {this.state.data === null && <Spinner />}
          {this.state.data && this.state.data.length === 0 && (
            <p className="text-center">No hay activiades aún.</p>
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
