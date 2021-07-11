import { Nav, Dropdown, GridNav } from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getStatsByUser } from "consumer/journey";

function HeaderNav({user}) {
  const [stat, setStat] = useState({
    completeBadges: [],
    incompleteBadges: [],
    completePathways: [],
    incompletePathways: [],
    completeRunners: [],
    incompleteRunners: [],
    incompleteTracks: [],
    completeTracks: [],
    completeTrophes: [],
  });

  useEffect(() => {
    getStatsByUser(
      (data) => {
        setStat(data);
      },
      () => {}
    );
  }, [user]);
  
  return (
    <Nav pills className="ml-2">
      {/* BEGIN Dropdown */}
      <Dropdown.Uncontrolled nav>
        {user && (
          <Dropdown.Toggle nav active>
            Show more
          </Dropdown.Toggle>
        )}

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
              <Dropdown.Header size="lg">Statistics</Dropdown.Header>
              {/* BEGIN Grid Nav */}
              <GridNav action>
                <GridNav.Row>
                  <GridNav.Item
                    icon={<FontAwesomeIcon icon={SolidIcon.faRoute} />}
                  >
                    Pathways ({stat.completePathways.length}/
                    {stat.incompletePathways.length +
                      stat.completePathways.length}
                    )
                  </GridNav.Item>
                  <GridNav.Item
                    icon={<FontAwesomeIcon icon={SolidIcon.faRoad} />}
                  >
                    Runners ({stat.completeRunners.length}/
                    {stat.incompleteRunners.length +
                      stat.completeRunners.length}
                    )
                  </GridNav.Item>
                  <GridNav.Item
                    icon={<FontAwesomeIcon icon={SolidIcon.faListOl} />}
                  >
                    Tracks ({stat.completeTracks.length}/
                    {stat.incompleteTracks.length + stat.completeTracks.length})
                  </GridNav.Item>
                </GridNav.Row>
                <GridNav.Row>
                  <GridNav.Item
                    icon={<FontAwesomeIcon icon={SolidIcon.faTrophy} />}
                  >
                    Trophies ({stat.completeTrophes.length}/
                    {stat.incompletePathways.length +
                      stat.completeTrophes.length}
                    )
                  </GridNav.Item>
                  <GridNav.Item
                    icon={<FontAwesomeIcon icon={SolidIcon.faRibbon} />}
                  >
                    Badges ({stat.completeBadges.length}/
                    {stat.incompleteBadges.length + stat.completeBadges.length})
                  </GridNav.Item>
                  <GridNav.Item
                    icon={<FontAwesomeIcon icon={SolidIcon.faFlagCheckered} />}
                  >
                    Targets (0/0)
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
