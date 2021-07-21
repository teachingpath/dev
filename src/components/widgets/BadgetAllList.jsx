import Carousel from "@panely/slick";
import { CarouselItem } from "@panely/components";
import { getBadgesByLeaderId } from "consumer/runner";
import Portlet from "@panely/components/Portlet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

class BadgeAllListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    getBadgesByLeaderId(
      (data) => {
        const list = data.badges.sort((a, b) => {
          if (a.complete) {
            return 1;
          }
          if (b.complete) {
            return -1;
          }
          return 0;
        });
        this.setState({ data: list });
      },
      () => {}
    );
  }
  render() {
    return (
      <Portlet className="mt-4">
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faCertificate} />
          </Portlet.Icon>
          <Portlet.Title>Emblemas ({this.state.data.length})</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          <div className="mt-4">
            {this.state.data.length === 0 && (
              <p className="text-center text-muted">No hay emblemas aún.</p>
            )}

            {this.state.data.length !== 0 && (
              <Carousel
                slidesToShow={
                  this.state.data.length >= 3 ? 3 : this.state.data.length
                }
              >
                {this.state.data.map((data, index) => {
                  return (
                    <CarouselItem key={"badge-key" + index}>
                      <center
                        title={
                          !data.complete ? "No disponible" : data.description
                        }
                      >
                        <img
                          className={
                            !data.complete
                              ? "bg-white mg-thumbnail avatar-circle p-2 border border-warning"
                              : "bg-yellow mg-thumbnail avatar-circle p-2 border border-success"
                          }
                          style={{ width: "145px" }}
                          src={data.image || "/images/avatar/blank.webp"}
                          alt="Badge Image"
                        />
                        {data.complete ? (
                          <Link
                            href={
                              "/runner/edit?runnerId=" +
                              data.id +
                              "&pathwayId=" +
                              data.pathwayId
                            }
                          >
                            {data.name}
                          </Link>
                        ) : (
                          <Link
                            href={
                              "/runner/badge?runnerId=" +
                              data.id +
                              "&pathwayId=" +
                              data.pathwayId
                            }
                          >
                            {data.name+"[Editar]"} 
                          </Link>
                        )}
                      </center>
                    </CarouselItem>
                  );
                })}
              </Carousel>
            )}
          </div>
        </Portlet.Body>
      </Portlet>
    );
  }
}

export default BadgeAllListComponent;
