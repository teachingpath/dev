import { Avatar, Dropdown, RichList } from "@panely/components";
import { ReactSortable } from "react-sortablejs";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";

import Swal from "@panely/sweetalert2";
import swalContent from "sweetalert2-react-content";
import Spinner from "@panely/components/Spinner";
import { deleteRunner, getRunners, updateLevel } from "consumer/runner";
import { getTracks } from "consumer/track";
import Badge from "@panely/components/Badge";
const ReactSwal = swalContent(Swal);
const swal = ReactSwal.mixin({
  customClass: {
    confirmButton: "btn btn-label-success btn-wide mx-1",
    cancelButton: "btn btn-label-danger btn-wide mx-1",
  },
  buttonsStyling: false,
});

class RunnerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data || [],
      loaded: false,
    };

    this.onSortList = this.onSortList.bind(this);
  }

  componentDidMount() {
    getRunners(
      this.props.pathwayId,
      async (data) => {
        const list = [];
        this.setState({ loaded: true });
        data.list.forEach(async (item) => {
          const tracks = await getTracks(item.id);
          list.push({
            id: item.id,
            title: item.name,
            subtitle: item.description,
            tracks: tracks,
          });
          this.setState({
            ...this.state,
            data: list,
          });
        });
      },
      () => {}
    );
  }

  onDelete(runnerId) {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.value) {
          deleteRunner(runnerId).then(() => {
            this.componentDidMount();
          });
        }
      });
  }

  onSortList(list) {
    list.forEach((item, level) => {
      updateLevel(item.id, level);
    });
    this.setState({ data: list });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.item?.runnerId !== nextProps.item?.runnerId) {
      this.componentDidMount();
    }
    return true;
  }

  render() {
    return (
      <RichList bordered action>
        {this.state.loaded === false && <Spinner />}
        {this.state.loaded === true && this.state.data.length === 0 && (
          <p className="text-center">Empty runners</p>
        )}
        <ReactSortable list={this.state.data} setList={this.onSortList}>
          {this.state.data.map((data, index) => {
            const { title, subtitle, id, tracks } = data;

            return (
              <RichList.Item key={index}>
                <RichList.Addon addonType="prepend">
                  {/* BEGIN Avatar */}
                  <Avatar display>
                    <FontAwesomeIcon icon={SolidIcon.faSort} />
                  </Avatar>
                  {/* END Avatar */}
                </RichList.Addon>
                <RichList.Content>
                  <RichList.Title
                    onClick={() => {
                      Router.push({
                        pathname: "/runner/edit",
                        query: {
                          runnerId: id,
                          pathwayId: this.props.pathwayId,
                        },
                      });
                    }}
                  >
                    {index + 1}. {title}
                  </RichList.Title>
                  <RichList.Subtitle>{subtitle}</RichList.Subtitle>
                  <RichList className="ml-4 mt-2 mb-2">
                    {tracks.map((track, indexTrack) => {
                      return (
                        <RichList.Item key={indexTrack}>
                          <RichList.Content
                            onClick={() => {
                              Router.push({
                                pathname: "/track/edit",
                                query: {
                                  runnerId: id,
                                  trackId: track.id,
                                  pathwayId: this.props.pathwayId,
                                },
                              });
                            }}
                          >
                            <RichList.Title>
                              {index + 1}.{indexTrack + 1}. {track.name}
                            </RichList.Title>
                          </RichList.Content>
                          <RichList.Addon addonType="append">
                            <Badge variant="label-info">{track.type}</Badge>
                          </RichList.Addon>
                        </RichList.Item>
                      );
                    })}
                  </RichList>
                </RichList.Content>
                <RichList.Addon addonType="append">
                  {/* BEGIN Dropdown */}
                  <Dropdown.Uncontrolled>
                    <Dropdown.Toggle icon variant="text-secondary">
                      <FontAwesomeIcon icon={SolidIcon.faEllipsisH} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu right animated>
                      <Dropdown.Item
                        onClick={() => {
                          Router.push({
                            pathname: "/runner/edit",
                            query: {
                              runnerId: id,
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
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          Router.push({
                            pathname: "/runner/quiz/create",
                            query: {
                              runnerId: id,
                              pathwayId: this.props.pathwayId,
                            },
                          });
                        }}
                        icon={<FontAwesomeIcon icon={SolidIcon.faQuestion} />}
                      >
                        Add Quiz
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          Router.push({
                            pathname: "/runner/badge",
                            query: {
                              runnerId: id,
                              pathwayId: this.props.pathwayId,
                            },
                          });
                        }}
                        icon={<FontAwesomeIcon icon={SolidIcon.faTrophy} />}
                      >
                        Add Badge
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          Router.push({
                            pathname: "/track/create",
                            query: {
                              runnerId: id,
                              pathwayId: this.props.pathwayId,
                            },
                          });
                        }}
                        icon={<FontAwesomeIcon icon={SolidIcon.faListOl} />}
                      >
                        Add Tracks
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Uncontrolled>
                  {/* END Dropdown */}
                </RichList.Addon>
              </RichList.Item>
            );
          })}
        </ReactSortable>
      </RichList>
    );
  }
}

export default RunnerList;
