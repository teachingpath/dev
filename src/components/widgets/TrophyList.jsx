import Carousel from "@panely/slick";
import { CarouselItem } from "@panely/components";
import { getTrophiesByUser } from "consumer/journey";
import Portlet from "@panely/components/Portlet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

class TrophtyListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    getTrophiesByUser(
      (data) => {
        this.setState(data);
      },
      () => {}
    );
  }
  render() {
    return (
      <Portlet className="mt-4">
        <Portlet.Header>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faTrophy} />
          </Portlet.Icon>
          <Portlet.Title>Trofeos {"("+this.state.data.length+")"}</Portlet.Title>
        </Portlet.Header>
        <Portlet.Body>
          <div className="mt-4">
            {this.state.data.length === 0 && (
              <p className="text-center text-muted">No hay trofeos aún.</p>
            )}

            {this.state.data.length !== 0 && (
              <Carousel slidesToShow={this.state.data.length >= 4? 4: this.state.data.length}>
              {this.state.data.map((data, index) => {
                  return (
                    <CarouselItem key={"trohy-key" + index}>
                      <center title={data.description}>
                        <img
                          style={{ width: "145px" }}
                          className={
                            "bg-yellow mg-thumbnail avatar-circle p-2 border border-success"
                          }
                          src={data.image}
                          alt="Trophy Image"
                        />
                        <p>{data.name}</p>
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

export default TrophtyListComponent;
