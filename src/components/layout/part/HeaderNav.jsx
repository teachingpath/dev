import { Nav, Dropdown, GridNav } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { Router } from "next/router";

function HeaderNav(props) {
  return (
    <Nav pills className="ml-2">
      {/* BEGIN Dropdown */}
      <Dropdown.Uncontrolled nav>
        <Dropdown.Toggle nav active>
          Show more
        </Dropdown.Toggle>
        <Dropdown.Menu animated wide className="overflow-hidden">
          <Dropdown.Row>
            <Dropdown.Col className="d-flex flex-column align-items-start justify-content-center bg-primary text-white">
              <h2 className="font-weight-bolder">Welcome back!</h2>
              <p>
                Develop knowledge and skills at your own pace through sequential
                learning experiences that include learning, training, quizzes,
                and hacking.
              </p>
            </Dropdown.Col>
            <Dropdown.Col>
              <Dropdown.Header size="lg">Features</Dropdown.Header>
              {/* BEGIN Grid Nav */}
              <GridNav action>
                <GridNav.Row>
                  <GridNav.Item
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://docs.teachingpath.info/concepts/pathway"}
                    icon={<FontAwesomeIcon icon={SolidIcon.faRoute} />}
                  >
                    Pathway
                  </GridNav.Item>
                  <GridNav.Item
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://docs.teachingpath.info/concepts/runner"}
                    icon={<FontAwesomeIcon icon={SolidIcon.faRoad} />}
                  >
                    Runner
                  </GridNav.Item>
                  <GridNav.Item
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://docs.teachingpath.info/concepts/track"}
                    icon={<FontAwesomeIcon icon={SolidIcon.faListOl} />}
                  >
                    Track
                  </GridNav.Item>
                </GridNav.Row>
                <GridNav.Row>
                  <GridNav.Item
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://docs.teachingpath.info/concepts/pathway#trophy"
                    }
                    icon={<FontAwesomeIcon icon={SolidIcon.faTrophy} />}
                  >
                    Trophy
                  </GridNav.Item>
                  <GridNav.Item
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://docs.teachingpath.info/concepts/quiz"}
                    icon={<FontAwesomeIcon icon={SolidIcon.faQuestion} />}
                  >
                    Quiz
                  </GridNav.Item>
                  <GridNav.Item
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://docs.teachingpath.info/concepts/journey"}
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
              <Dropdown.Item
                bullet
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.teachingpath.info/"
              >
                Documentation
              </Dropdown.Item>
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
