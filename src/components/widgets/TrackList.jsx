import { RichList, Dropdown, Avatar } from "@panely/components";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import Badge from "@panely/components/Badge";

import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import Spinner from "@panely/components/Spinner";
import { getTracks, deleteTrack, updateTrackLevel } from "consumer/track";
import {
  timeConvert,
  timePowerTen,
  timeShortPowerTen,
} from "components/helpers/time";
const ReactSwal = swalContent(Swal);
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

class TrackList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loaded: false,
    };
    this.onSortList = this.onSortList.bind(this);
  }

  componentDidMount() {
    getTracks(this.props.runnerId, (data) => {
      this.setState({
        ...this.state,
        data: data.list.map((item) => ({
          id: item.id,
          title: item.name,
          subtitle: item.description,
          type: item.type,
          time: item.timeLimit,
          typeContent: item.typeContent,
        })),
        loaded: true,
      });
    });
  }

  onDelete(trackId) {
    swal
      .fire({
        title: "¿Estas seguro/segura?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, bórralo!",
      })
      .then((result) => {
        if (result.value) {
          deleteTrack(this.props.runnerId, trackId).then(() => {
            this.componentDidMount();
          });
        }
      });
  }

  onSortList(list) {
    list.forEach((item, level) => {
      updateTrackLevel(this.props.runnerId, item.id, level);
    });
    this.setState({ data: list });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data?.trackId !== nextProps.data?.trackId) {
      this.componentDidMount();
    }
    return true;
  }

  render() {
    const estimation = this.state.data
      .map((el) => el.time)
      .reduce((a, b) => a + b, 0);

    return (
      <RichList bordered action className="list">
        {this.state.loaded === false && <Spinner>loading...</Spinner>}
        {this.state.loaded === true && this.state.data.length === 0 && (
          <p className="text-center">No hay tracks.</p>
        )}
        {this.state.data.length >= 1 && (
          <p>
            Tiempo estimado aproximadamente:{" "}
            <strong>{timeConvert(timePowerTen(estimation))}</strong>
          </p>
        )}

        <ReactSortable list={this.state.data} setList={this.onSortList}>
          {this.state.data.map((data, index) => {
            const { title, subtitle, typeContent, type, id, time } = data;

            return (
              <RichList.Item
                key={"tracks" + index}
                className="d-flex align-items-start"
              >
                <RichList.Addon addonType="prepend">
                  <Avatar display>
                    <FontAwesomeIcon icon={SolidIcon.faSort} />
                  </Avatar>
                </RichList.Addon>
                <RichList.Content>
                  <RichList.Title
                    onClick={() => {
                      Router.push({
                        pathname: "/track/edit",
                        query: {
                          trackId: id,
                          runnerId: this.props.runnerId,
                          pathwayId: this.props.pathwayId,
                        },
                      });
                    }}
                  >
                    {index + 1}. {title}
                  </RichList.Title>
                  <RichList.Subtitle>{subtitle}</RichList.Subtitle>
                  <RichList.Subtitle>
                    <Badge variant="label-info">{type}</Badge>
                    <Badge variant="label-info" className="ml-2">
                      {typeContent}
                    </Badge>
                    <Badge variant="label-success" className="ml-2">
                      {timeShortPowerTen(time)}
                    </Badge>
                  </RichList.Subtitle>
                </RichList.Content>
                <RichList.Addon addonType="append">
                  <Dropdown.Uncontrolled>
                    <Dropdown.Toggle icon variant="text-secondary">
                      <FontAwesomeIcon icon={SolidIcon.faEllipsisH} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu right animated>
                      <Dropdown.Item
                        onClick={() => {
                          Router.push({
                            pathname: "/track/edit",
                            query: {
                              trackId: id,
                              runnerId: this.props.runnerId,
                              pathwayId: this.props.pathwayId,
                            },
                          });
                        }}
                        icon={<FontAwesomeIcon icon={SolidIcon.faEdit} />}
                      >
                        Editar
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          this.onDelete(id);
                        }}
                        icon={<FontAwesomeIcon icon={SolidIcon.faTrashAlt} />}
                      >
                        Eliminar
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          Router.push({
                            pathname: "/catalog/track",
                            query: {
                              id: id,
                              runnerId: this.props.runnerId,
                              pathwayId: this.props.pathwayId,
                            },
                          });
                        }}
                        icon={<FontAwesomeIcon icon={SolidIcon.faBook} />}
                      >
                        Vista Previa
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Uncontrolled>
                </RichList.Addon>
              </RichList.Item>
            );
          })}
        </ReactSortable>
      </RichList>
    );
  }
}

export default TrackList;
