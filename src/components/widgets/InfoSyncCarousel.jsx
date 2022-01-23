import {
  Row,
  Col,
  Card,
  Button,
  Portlet,
  Container,
  CarouselItem,
} from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Carousel from "@panely/slick";

class InfoSyncCarousel extends React.Component {
  state = {
    main: null,
    nav: null,
  };

  componentDidMount() {
    this.setState({
      main: this.mainRef,
      nav: this.navRef,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Carousel
          arrows={false}
          asNavFor={this.state.nav}
          ref={(ref) => (this.mainRef = ref)}
        >
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud.png" alt="Card Image" />
            </Card>
          </CarouselItem>

          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud1.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud2.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud4.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud5.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud6.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud7.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud8.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud9.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud10.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud11.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud12.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud13.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud14.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud15.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud16.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud17.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud18.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud19.png" alt="Card Image" />
            </Card>
          </CarouselItem>
        </Carousel>
        <Carousel
          centerMode={true}
          slidesToShow={3}
          asNavFor={this.state.main}
          focusOnSelect={true}
          prevArrow={<CarouselPrev2 />}
          nextArrow={<CarouselNext2 />}
          ref={(ref) => (this.navRef = ref)}
          className="mt-4"
        >
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud.png" alt="Card Image" />
            </Card>
          </CarouselItem>

          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud1.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud2.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud4.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud5.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud6.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud7.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud8.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud9.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud10.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud11.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud12.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud13.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud14.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud15.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud16.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud17.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud18.png" alt="Card Image" />
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <Card.Img src="/images/banner/roud19.png" alt="Card Image" />
            </Card>
          </CarouselItem>
        </Carousel>
        {/* END Carousel */}
      </React.Fragment>
    );
  }
}

function CarouselNext2(props) {
  const { style, onClick } = props;

  return (
    <Button
      className="slick-next-2"
      variant="flat-primary"
      style={{ ...style }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={SolidIcon.faAngleRight} />
    </Button>
  );
}

function CarouselPrev2(props) {
  const { style, onClick } = props;
  return (
    <Button
      className="slick-prev-2"
      variant="flat-primary"
      style={{ ...style }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={SolidIcon.faAngleLeft} />
    </Button>
  );
}

export default InfoSyncCarousel;
