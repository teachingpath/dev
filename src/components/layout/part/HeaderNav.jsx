import { Nav, Badge, Caret, Dropdown, GridNav } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

function HeaderNav(props) {
  return (
    <Nav pills {...props}>
      
      {/* BEGIN Dropdown */}
      <Dropdown.Uncontrolled nav>
        <Dropdown.Toggle nav active>Show more</Dropdown.Toggle>
        <Dropdown.Menu animated wide className="overflow-hidden">
          <Dropdown.Row>
            <Dropdown.Col className="d-flex flex-column align-items-start justify-content-center bg-primary text-white">
              <h2 className="font-weight-bolder">Welcome back!</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium, commodi hic qui aspernatur doloremque quos tempora
                placeat culpa illum, voluptatibus delectus provident cumque
                aliquid enim, laborum aliquam. Quod, perferendis unde.
              </p>
            </Dropdown.Col>
            <Dropdown.Col>
              <Dropdown.Header size="lg">Features</Dropdown.Header>
              {/* BEGIN Grid Nav */}
              <GridNav action>
                <GridNav.Row>
                  <GridNav.Item
                    icon={
                      <FontAwesomeIcon icon={SolidIcon.faRoute} />
                    }
                  >
                    Pathway
                  </GridNav.Item>
                  <GridNav.Item
                    icon={<FontAwesomeIcon icon={SolidIcon.faRoad} />}
                  >
                    Runner
                  </GridNav.Item>
                  <GridNav.Item
                    icon={
                      <FontAwesomeIcon icon={SolidIcon.faListOl} />
                    }
                  >
                    Track
                  </GridNav.Item>
                </GridNav.Row>
                <GridNav.Row>
                  <GridNav.Item
                    icon={<FontAwesomeIcon icon={SolidIcon.faTrophy} />}
                  >
                    Trophy
                  </GridNav.Item>
                  <GridNav.Item
                    icon={<FontAwesomeIcon icon={SolidIcon.faQuestion} />}
                  >
                    Quiz
                  </GridNav.Item>
                  <GridNav.Item
                    icon={<FontAwesomeIcon icon={SolidIcon.faPlaneDeparture} />}
                  >
                    Journey
                  </GridNav.Item>
                </GridNav.Row>
              </GridNav>
              {/* END Grid Nav */}
            </Dropdown.Col>
            <Dropdown.Col className="border-left">
              <Dropdown.Header size="lg">Tools</Dropdown.Header>
              <Dropdown.Item bullet>Forum</Dropdown.Item>
              <Dropdown.Item bullet>Slack group</Dropdown.Item>
              <Dropdown.Item bullet>Documentation</Dropdown.Item>
              <Dropdown.Item bullet>Knowledge Base</Dropdown.Item>
              <Dropdown.Item bullet>Testimonials</Dropdown.Item>
            </Dropdown.Col>
          </Dropdown.Row>
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
      {/* END Dropdown */}
    </Nav>
  );
}

export default HeaderNav;
