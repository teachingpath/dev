import {
  Row,
  Col,
  Nav,
  Tab,
  Avatar,
  Button,
  Portlet,
  RichList,
  Progress,
  Widget4
} from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

class Widget5Component extends React.Component {
  state = {
    // Default active tab id
    activeTab: 0,
    // Tabs data
    tabs: [
      {
        title: "Manager",
        persons: [
          {
            image: "/images/avatar/blank.webp",
            name: "Rhona Davidson",
            detail: "Javascript Developer, Tokyo",
            progress: 35,
            link: "#"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Timothy Mooney",
            detail: "Office Manage, San Francisco",
            progress: 55,
            link: "#"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Jackson Bradshaw",
            detail: "Regional Director, San Francisco",
            progress: 75,
            link: "#"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Brielle Williamson",
            detail: "Integration Specialist, New York",
            progress: 60,
            link: "#"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Prescott Bartlett",
            detail: "Technical Author, London",
            progress: 85,
            link: "#"
          }
        ]
      },
      {
        title: "Employee",
        persons: [
          {
            image: "/images/avatar/blank.webp",
            name: "Timothy Mooney",
            detail: "Office Manage, San Francisco",
            progress: 55,
            link: "#"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Prescott Bartlett",
            detail: "Technical Author, London",
            progress: 85,
            link: "#"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Rhona Davidson",
            detail: "Javascript Developer, Tokyo",
            progress: 35,
            link: "#"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Brielle Williamson",
            detail: "Integration Specialist, New York",
            progress: 60,
            link: "#"
          },
          {
            image: "/images/avatar/blank.webp",
            name: "Jackson Bradshaw",
            detail: "Regional Director, San Francisco",
            progress: 75,
            link: "#"
          }
        ]
      }
    ]
  }

  // Handle toggling tab
  toggle = id => {
    if (this.state.activeTab !== id) {
      this.setState({ activeTab: id })
    }
  }

  render() {
    return (
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Icon>
            <FontAwesomeIcon icon={SolidIcon.faUsersCog} />
          </Portlet.Icon>
          <Portlet.Title>Human resources</Portlet.Title>
          <Portlet.Addon>
            {/* BEGIN Nav */}
            <Nav pills portlet>
              {this.state.tabs.map((data, index) => (
                <Nav.Item
                  key={index}
                  active={this.state.activeTab === index}
                  onClick={() => this.toggle(index)}
                  children={data.title}
                />
              ))}
            </Nav>
            {/* END Nav */}
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body>
          {/* BEGIN Tab */}
          <Tab activeTab={this.state.activeTab}>
            {this.state.tabs.map((data, index) => (
              <Tab.Pane tabId={index} key={index}>
                {/* BEGIN Rich List */}
                <RichList>
                  {data.persons.map((data, index) => {
                    const { image, name, detail, progress, link } = data

                    return (
                      <RichList.Item key={index}>
                        <Row noGutters className="w-100">
                          <Col lg="6">
                            {/* BEGIN Rich List */}
                            <RichList.Item className="p-0">
                              <RichList.Addon addonType="prepend">
                                {/* BEGIN Avatar */}
                                <Avatar display circle size="lg">
                                  <img src={image} alt="Avatar image" />
                                </Avatar>
                                {/* END Avatar */}
                              </RichList.Addon>
                              <RichList.Content>
                                <RichList.Title children={name} />
                                <RichList.Subtitle children={detail} />
                              </RichList.Content>
                            </RichList.Item>
                            {/* END Rich List */}
                          </Col>
                          <Col lg="6" className=" mt-2 mt-sm-0 d-flex align-items-center">
                            {/* BEGIN Widget */}
                            <Widget4 className="flex-grow-1 mr-4">
                              <Widget4.Group>
                                <Widget4.Display>
                                  <Widget4.Subtitle>Progress</Widget4.Subtitle>
                                </Widget4.Display>
                                <Widget4.Addon>
                                  <span className="text-muted" children={`${progress}%`} />
                                </Widget4.Addon>
                              </Widget4.Group>
                              <Progress value={progress} variant="primary" size="sm" />
                            </Widget4>
                            {/* END Widget */}
                            <Link href={link}>
                              <Button variant="label-primary">Follow</Button>
                            </Link>
                          </Col>
                        </Row>
                      </RichList.Item>
                    )
                  })}
                </RichList>
                {/* END Rich List */}
              </Tab.Pane>
            ))}
          </Tab>
          {/* END Tab */}
        </Portlet.Body>
      </Portlet>
    )
  }
}

export default Widget5Component
