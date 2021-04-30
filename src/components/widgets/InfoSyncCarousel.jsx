import { Row, Col, Card, Button, Portlet, Container, CarouselItem } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Carousel from "@panely/slick"



class InfoSyncCarousel extends React.Component {
  state = {
    main: null,
    nav: null
  }

  componentDidMount() {
    // Set carousel elements references and store to states
    this.setState({
      main: this.mainRef,
      nav: this.navRef
    })
  }

  render() {
    return (
      <React.Fragment>
        {/* BEGIN Carousel */}
        <Carousel arrows={false} asNavFor={this.state.nav} ref={ref => (this.mainRef = ref)}>
          <CarouselItem>
            {/* BEGIN Card */}
            <Card>
              <Card.Img src="/images/banner/1120x480.webp" alt="Card Image" />
            </Card>
            {/* END Card */}
          </CarouselItem>
          <CarouselItem>
            {/* BEGIN Card */}
            <Card>
              <Card.Img src="/images/banner/1120x480.webp" alt="Card Image" />
            </Card>
            {/* END Card */}
          </CarouselItem>
          <CarouselItem>
            {/* BEGIN Card */}
            <Card>
              <Card.Img src="/images/banner/1120x480.webp" alt="Card Image" />
            </Card>
            {/* END Card */}
          </CarouselItem>
          <CarouselItem>
            {/* BEGIN Card */}
            <Card>
              <Card.Img src="/images/banner/1120x480.webp" alt="Card Image" />
            </Card>
            {/* END Card */}
          </CarouselItem>
        </Carousel>
        {/* END Carousel */}
        {/* BEGIN Carousel */}
        <Carousel
          centerMode={true}
          slidesToShow={3}
          asNavFor={this.state.main}
          focusOnSelect={true}
          prevArrow={<CarouselPrev2 />}
          nextArrow={<CarouselNext2 />}
          ref={ref => (this.navRef = ref)}
          className="mt-4"
        >
          <CarouselItem>
            {/* BEGIN Card */}
            <Card>
              <Card.Img src="/images/banner/560x400.webp" alt="Card Image" />
            </Card>
            {/* END Card */}
          </CarouselItem>
          <CarouselItem>
            {/* BEGIN Card */}
            <Card>
              <Card.Img src="/images/banner/560x400.webp" alt="Card Image" />
            </Card>
            {/* END Card */}
          </CarouselItem>
          <CarouselItem>
            {/* BEGIN Card */}
            <Card>
              <Card.Img src="/images/banner/560x400.webp" alt="Card Image" />
            </Card>
            {/* END Card */}
          </CarouselItem>
          <CarouselItem>
            {/* BEGIN Card */}
            <Card>
              <Card.Img src="/images/banner/560x400.webp" alt="Card Image" />
            </Card>
            {/* END Card */}
          </CarouselItem>
        </Carousel>
        {/* END Carousel */}
      </React.Fragment>
    )
  }
}

function CarouselNext2(props) {
  const { style, onClick } = props

  return (
    <Button className="slick-next-2" variant="flat-primary" style={{ ...style }} onClick={onClick}>
      <FontAwesomeIcon icon={SolidIcon.faAngleRight} />
    </Button>
  )
}

function CarouselPrev2(props) {
  const { style, onClick } = props
  return (
    <Button className="slick-prev-2" variant="flat-primary" style={{ ...style }} onClick={onClick}>
      <FontAwesomeIcon icon={SolidIcon.faAngleLeft} />
    </Button>
  )
}



export default InfoSyncCarousel;