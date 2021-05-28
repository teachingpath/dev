import { Row, Col, Portlet, Container, Widget14 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as RegularIcon from "@fortawesome/free-regular-svg-icons"
import * as BrandsIcon from "@fortawesome/free-brands-svg-icons"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"

class FontAwesomePage extends React.Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Font Awesome")
    // Set breadcrumb data
    this.props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Icon" },
      { text: "Font Awesome", link: "/icons/feather" }
    ])
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Font Awesome | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* BEGIN Portlet */}
              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Font Awesome</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <p>
                    Get icons on your website with <strong>Font Awesome</strong>, the web's most
                    popular icon set and toolkit. For more info visit{" "}
                    <a href="http://fontawesome.com" target="_blank">
                      Font Awesome
                    </a>
                    .
                  </p>
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Solid</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAd} />}>
                            ad
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAddressBook} />}>
                            address-book
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAddressCard} />}>
                            address-card
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAdjust} />}>
                            adjust
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAlignCenter} />}>
                            align-center
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAlignJustify} />}>
                            align-justify
                          </Widget14>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAnchor} />}>
                            anchor
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faBug} />}>
                            bug
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faCapsules} />}>
                            capsules
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faFolderOpen} />}>
                            folder-open
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faHeadphones} />}>
                            headphones
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAngleDown} />}>
                            angle-down
                          </Widget14>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAngleLeft} />}>
                            angle-left
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAngleRight} />}>
                            angle-right
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAngleUp} />}>
                            angle-up
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAsterisk} />}>
                            asterisk
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faAt} />}>
                            at
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faBackward} />}>
                            backward
                          </Widget14>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faBan} />}>
                            ban
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faBatteryHalf} />}>
                            battery-half
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faBell} />}>
                            bell
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faBezierCurve} />}>
                            bezier-curve
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faBorderAll} />}>
                            border-all
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faBullhorn} />}>
                            bullhorn
                          </Widget14>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faExpand} />}>
                            expand
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faDice} />}>
                            dice
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faCrop} />}>
                            crop
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faCreditCard} />}>
                            credit-card
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faInfo} />}>
                            info
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={SolidIcon.faChartPie} />}>
                            chart-pie
                          </Widget14>
                        </Col>
                      </Row>
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet>
                    <Portlet.Header bordered>
                      <Portlet.Title>Regular</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faClipboard} />}>
                            clipboard
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faEdit} />}>
                            edit
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faEnvelope} />}>
                            envelope
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faFile} />}>
                            file
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faCalendar} />}>
                            calendar
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faKeyboard} />}>
                            keyboard
                          </Widget14>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faImages} />}>
                            images
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faHeart} />}>
                            heart
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faMoon} />}>
                            moon
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faStar} />}>
                            star
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faSquare} />}>
                            square
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faPlayCircle} />}>
                            play-circle
                          </Widget14>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faObjectGroup} />}>
                            object-group
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faNewspaper} />}>
                            newspaper
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faPaperPlane} />}>
                            paper-plane
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faHandRock} />}>
                            hand-rock
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faFolder} />}>
                            folder
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faComments} />}>
                            comments
                          </Widget14>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faClone} />}>
                            clone
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faBellSlash} />}>
                            bell-slash
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faChartBar} />}>
                            chart-bar
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faGrinAlt} />}>
                            grin-alt
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faMap} />}>
                            map
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faListAlt} />}>
                            list-alt
                          </Widget14>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faMinusSquare} />}>
                            minus-square
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faStickyNote} />}>
                            sticky-note
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faThumbsUp} />}>
                            thumbs-up
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faLightbulb} />}>
                            lightbulb
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faUserCircle} />}>
                            user-circle
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={RegularIcon.faEye} />}>
                            eye
                          </Widget14>
                        </Col>
                      </Row>
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                  {/* BEGIN Portlet */}
                  <Portlet className="mb-0">
                    <Portlet.Header bordered>
                      <Portlet.Title>Brands</Portlet.Title>
                    </Portlet.Header>
                    <Portlet.Body>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faAlgolia} />}>
                            algolia
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faAirbnb} />}>
                            airbnb
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faAndroid} />}>
                            android
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faApple} />}>
                            apple
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faBlackberry} />}>
                            blackberry
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faAppStore} />}>
                            app-store
                          </Widget14>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faBootstrap} />}>
                            bootstrap
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faCcStripe} />}>
                            cc-stripe
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faCcVisa} />}>
                            cc-visa
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faChromecast} />}>
                            chromecast
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faCss3} />}>
                            css3
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faDiscourse} />}>
                            discourse
                          </Widget14>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faDailymotion} />}>
                            dailymotion
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faDeviantart} />}>
                            deviantart
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faDrupal} />}>
                            drupal
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faFirefoxBrowser} />}>
                            firefox-browser
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faGitAlt} />}>
                            git-alt
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faGithub} />}>
                            github
                          </Widget14>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faGulp} />}>
                            gulp
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faLinkedin} />}>
                            linkedin
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faMaxcdn} />}>
                            maxcdn
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faOpera} />}>
                            opera
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faPaypal} />}>
                            paypal
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faPatreon} />}>
                            patreon
                          </Widget14>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faPhp} />}>
                            php
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faPython} />}>
                            python
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faPlaystation} />}>
                            playstation
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faYoutube} />}>
                            youtube
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faWordpress} />}>
                            wordpress
                          </Widget14>
                        </Col>
                        <Col md="2">
                          <Widget14 icon={<FontAwesomeIcon icon={BrandsIcon.faXbox} />}>
                            xbox
                          </Widget14>
                        </Col>
                      </Row>
                    </Portlet.Body>
                  </Portlet>
                  {/* END Portlet */}
                </Portlet.Body>
              </Portlet>
              {/* END Portlet */}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withAuth(withLayout(FontAwesomePage)))
