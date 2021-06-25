import Carousel from "@panely/slick";
import { CarouselItem } from "@panely/components";
import { getBadges, getBadgesByUser } from "consumer/journey";
import Portlet from "@panely/components/Portlet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

class BadgetListComponent extends React.Component {
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
            <FontAwesomeIcon icon={SolidIcon.faTrophy} />
          </Portlet.Icon>
          <Portlet.Title>
            Insignia ({inComplete}/{tolta})
          </Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          <div className="mt-4">
            {this.state.data.length === 0 && (
              <p className="text-center text-muted">Empty badges</p>
            )}

            {this.state.data.length !== 0 && (
              <Carousel slidesToShow={3} slidesToScroll={2}>
                {this.state.data.map((data) => {
                  return (
                    <CarouselItem>
                      {/* BEGIN Card */}
                      <center>
                        <img
                          className={
                            data.disabled
                              ? "bg-white mg-thumbnail avatar-circle p-3 border border-warning"
                              : "bg-yellow mg-thumbnail avatar-circle p-3 border border-success"
                          }
                          src={data.image}
                          alt="Card Image"
                        />
                        <p>{data.disabled ? "Not available" : data.name}</p>
                      </center>
                      {/* END Card */}
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

export default BadgetListComponent;
