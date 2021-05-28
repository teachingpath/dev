import { Nav, Tab, Button, Portlet, RichList, Dropdown, Widget1, Widget2 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

class Widget1Component extends React.Component {
  state = {
    highlight: "$237,650",
    buttonLink: "#",
    buttonText: "All Earnings"
  }

  render() {
    const { highlight, buttonLink, buttonText } = this.state

    return (
      <Widget1>
        <Widget1.Display top size="lg" className="bg-primary text-white">
          <Widget1.Group>
            <Widget1.Title>Company income</Widget1.Title>
            <Widget1.Addon>
              {/* BEGIN Dropdown */}
              <Dropdown.Uncontrolled>
                <Dropdown.Toggle caret variant="label-light" children="Option" />
                <Dropdown.Menu right animated>
                  <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faPoll} />}>
                    Report
                  </Dropdown.Item>
                  <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faChartPie} />}>
                    Charts
                  </Dropdown.Item>
                  <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faChartLine} />}>
                    Statistics
                  </Dropdown.Item>
                  <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faCog} />}>
                    Settings
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Uncontrolled>
              {/* END Dropdown */}
            </Widget1.Addon>
          </Widget1.Group>
          <Widget1.Dialog>
            <Widget1.DialogContent>
              <h1 className="display-3" children={highlight} />
            </Widget1.DialogContent>
          </Widget1.Dialog>
          <Widget1.Offset>
            <Link href={buttonLink}>
              <Button
                pill
                variant="flat-secondary"
                size="lg"
                width="widest"
                height="tallest"
                children={buttonText}
              />
            </Link>
          </Widget1.Offset>
        </Widget1.Display>
        <Widget1.Body className="pt-5">
          <Widget1Tab />
        </Widget1.Body>
      </Widget1>
    )
  }
}

class Widget1Tab extends React.Component {
  state = {
    // Default active tab id
    activeTab: 0,
    // Tabs data
    tabs: [
      {
        time: "March",
        data: [
          {
            highlight: "$23,050",
            title: "Annual companies taxes"
          },
          {
            highlight: "$46,50",
            title: "Avarage product price"
          },
          {
            highlight: "$260,700",
            title: "Total annual profit before tax"
          }
        ]
      },
      {
        time: "April",
        data: [
          {
            highlight: "$13,000",
            title: "Annual companies taxes"
          },
          {
            highlight: "$34,00",
            title: "Avarage product price"
          },
          {
            highlight: "$350,650",
            title: "Total annual profit before tax"
          }
        ]
      },
      {
        time: "Mei",
        data: [
          {
            highlight: "$3,050",
            title: "Annual companies taxes"
          },
          {
            highlight: "$16,20",
            title: "Avarage product price"
          },
          {
            highlight: "$135,500",
            title: "Total annual profit before tax"
          }
        ]
      },
      {
        time: "June",
        data: [
          {
            highlight: "$56,650",
            title: "Annual companies taxes"
          },
          {
            highlight: "$35,50",
            title: "Avarage product price"
          },
          {
            highlight: "$341,080",
            title: "Total annual profit before tax"
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
      <React.Fragment>
        {/* BEGIN Nav */}
        <Widget2 justified size="lg" className="mb-4">
          {this.state.tabs.map((data, index) => (
            <Nav.Item
              key={index}
              active={this.state.activeTab === index}
              onClick={() => this.toggle(index)}
              children={data.time}
            />
          ))}
        </Widget2>
        {/* END Nav */}
        {/* BEGIN Tab */}
        <Tab activeTab={this.state.activeTab}>
          {this.state.tabs.map((tab, index) => (
            <Tab.Pane key={index} tabId={index}>
              {/* BEGIN Portlet */}
              <Portlet className="mb-0">
                {/* BEGIN Rich List */}
                <RichList flush>
                  {tab.data.map((data, index) => {
                    const { highlight, title } = data

                    return (
                      <RichList.Item key={index}>
                        <RichList.Content>
                          <RichList.Title children={highlight} />
                          <RichList.Subtitle children={title} />
                        </RichList.Content>
                      </RichList.Item>
                    )
                  })}
                </RichList>
                {/* END Rich List */}
              </Portlet>
              {/* END Portlet */}
            </Tab.Pane>
          ))}
        </Tab>
        {/* END Tab */}
      </React.Fragment>
    )
  }
}

export default Widget1Component
