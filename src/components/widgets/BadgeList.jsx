import Carousel from "@panely/slick";
import { CarouselItem } from "@panely/components";
import { getBadges, getBadgesByUser } from "consumer/journey";
import Portlet from "@panely/components/Portlet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

class BadgeListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    if (this.props.journeyId) {
      getBadges(
        this.props.journeyId,
        (data) => {
          const list = data.data.sort((a, b) => {
            if (a.disabled) {
              return 1;
            }
            if (b.disabled) {
              return -1;
            }
            return 0;
          });
          this.setState({ data: list });
        },
        () => {}
      );
    } else {
      getBadgesByUser(
        (data) => {
          this.setState(data);
        },
        () => {}
      );
    }
  }
  render() {
    const tolta = this.state.data.length;
    const inComplete = this.state.data.filter(
      (data) => data.disabled === false
    ).length;

    return (
      <Portlet className="mt-4">
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faCertificate} />
          </Portlet.Icon>
          <Portlet.Title>
            Emblemas{" "}
            {this.props.journeyId ? "(" + inComplete + "/" + tolta + ")" : "("+tolta+")"}
          </Portlet.Title>
        </Portlet.Header>
        <Portlet.Body className="list">
          <div className="mt-4">
            {this.state.data.length === 0 && (
              <p className="text-center text-muted">No hay emblemas aún.</p>
            )}

            {this.state.data.length !== 0 && (
              <Carousel slidesToShow={this.state.data.length >= 4? 4: this.state.data.length}>
                {this.state.data.map((data, index) => {
                  return (
                    <CarouselItem key={"badge-key" + index}>
                      <center title={!data.disabled && data.description}>
                        <img
                          style={{ width: "145px" }}
                          className={
                            data.disabled
                              ? "bg-white mg-thumbnail avatar-circle p-2 border border-warning"
                              : "bg-yellow mg-thumbnail avatar-circle p-2 border border-success"
                          }
                          src={data.image}
                          alt="Badge Image"
                        />
                        <p>{data.disabled ? "No disponible" : data.name}</p>
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

export default BadgeListComponent;
