import {
  Nav,
  Tab,
  Portlet,
  RichList,
  Widget2,
} from "@panely/components";

import Spinner from "@panely/components/Spinner";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Badge from "@panely/components/Badge";
import {
  timeConvert,
  timePowerTen,
  timeShortPowerTen,
} from "components/helpers/time";
import { getRunners } from "consumer/runner";
import { getTracks } from "consumer/track";

class RunnerTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tabs: props.data || [],
      estimation: 0,
    };
  }

  toggle = (id) => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id });
    }
  };

  componentDidMount() {
    const list = this.state.tabs;
    getRunners(
      this.props.pathwayId,
      async (runners) => {
        runners.list.forEach(async (runner) => {
          const tracks = await getTracks(runner.id);
          const listMapped = tracks.map((doc) => ({
            id: doc.id,
            title: doc.name,
            subtitle: doc.description,
            time: doc.timeLimit,
            type: doc.type,
          }));

          list.push({
            id: runner.id,
            pathwayId: this.props.pathwayId,
            title: runner.name,
            subtitle: runner.description,
            feedback: runner.feedback,
            badge: runner.badge,
            data: listMapped,
          });
          const estimation = listMapped
            .map((el) => el.time)
            .reduce((a, b) => a + b, 0);

          this.setState({
            ...this.state,
            tabs: list,
            estimation: this.state.estimation + estimation,
          });
        });
      },
      () => {}
    );
  }

  render() {
    return (
      <React.Fragment>
        <p>
          Tiempo estimado aproximadamente:{" "}
          <strong>{timeConvert(timePowerTen(this.state.estimation))}</strong>
        </p>
        {this.state.tabs.length === 0 && <Spinner />}
        <Widget2 justified size="lg" className="mb-4">
          {this.state.tabs.map((data, index) => (
            <Nav.Item
              key={index}
              active={this.state.activeTab === index}
              onClick={() => this.toggle(index)}
              children={index + 1 + ". " + data.title.toUpperCase()}
              title={data.subtitle}
            />
          ))}
        </Widget2>
        <Tab activeTab={this.state.activeTab}>
          {this.state.tabs.map((tab, index) => (
            <Tab.Pane key={index} tabId={index}>
              <Portlet className="mb-0">
                <Portlet.Header bordered>
                  <Portlet.Title>Tracks</Portlet.Title>
                  <Portlet.Addon>
                    Estimación:{" "}
                    <strong>
                      {timeConvert(
                        timePowerTen(
                          tab.data.map((t) => t.time).reduce((a, b) => a + b, 0)
                        )
                      )}
                    </strong>
                  </Portlet.Addon>
                </Portlet.Header>
                <RichList flush>
                  {tab.data.map((data, indexTrack) => {
                    const { subtitle, title, time, type, id } = data;
                    const titleLink =
                      index + 1 + "." + (indexTrack + 1) + ". " + title;
                    return (
                      <RichList.Item key={"runnerTab"+indexTrack}>
                        <RichList.Content>
                          <RichList.Title children={titleLink} />
                          <RichList.Subtitle children={subtitle} />
                        </RichList.Content>
                        <RichList.Addon addonType="append">
                          <Badge className="mr-2">{type}</Badge>
                          {timeShortPowerTen(time)}
                          <FontAwesomeIcon
                            className={"ml-2"}
                            icon={SolidIcon.faStopwatch}
                          />
                        </RichList.Addon>
                      </RichList.Item>
                    );
                  })}
                </RichList>
              </Portlet>
            </Tab.Pane>
          ))}
        </Tab>
      </React.Fragment>
    );
  }
}

export default RunnerTab;
