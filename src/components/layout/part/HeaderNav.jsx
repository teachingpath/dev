import { Nav, Badge, Caret, Dropdown, GridNav } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as RegularIcon from "@fortawesome/free-regular-svg-icons"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

function HeaderNav(props) {
  return (
    <Nav pills {...props}>
      {/* BEGIN Dropdown */}
      <Dropdown.Uncontrolled nav>
        <Dropdown.Toggle nav active>
          Apps
        </Dropdown.Toggle>
        <Dropdown.Menu animated>
          <Dropdown.Item
            icon={<FontAwesomeIcon icon={SolidIcon.faBoxes} />}
            addon={<Badge pill variant="warning" children="20" />}
          >
            Inventory Manager
          </Dropdown.Item>
          {/* BEGIN Dropdown Submenu */}
          <Dropdown.Submenu>
            <Dropdown.Item
              icon={<FontAwesomeIcon icon={SolidIcon.faProjectDiagram} />}
              addon={<Caret />}
            >
              Project manager
            </Dropdown.Item>
            <Dropdown.SubmenuMenu>
              <Dropdown.Item bullet>Create project</Dropdown.Item>
              <Dropdown.Item bullet>Delete project</Dropdown.Item>
              <Dropdown.Item bullet>Ongoing project</Dropdown.Item>
              <Dropdown.Item bullet>Completed project</Dropdown.Item>
              <Dropdown.Item bullet>Urgent project</Dropdown.Item>
            </Dropdown.SubmenuMenu>
          </Dropdown.Submenu>
          {/* END Dropdown Submenu */}
          {/* BEGIN Dropdown Submenu */}
          <Dropdown.Submenu>
            <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faTasks} />} addon={<Caret />}>
              Task manager
            </Dropdown.Item>
            <Dropdown.SubmenuMenu>
              <Dropdown.Item bullet>Show task</Dropdown.Item>
              <Dropdown.Item bullet>Assign task</Dropdown.Item>
              <Dropdown.Item bullet>Assign member</Dropdown.Item>
              <Dropdown.Item bullet>Completed task</Dropdown.Item>
              <Dropdown.Item bullet>Urgent task</Dropdown.Item>
            </Dropdown.SubmenuMenu>
          </Dropdown.Submenu>
          {/* END Dropdown Submenu */}
          <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faDollarSign} />}>
            Invoice
          </Dropdown.Item>
          <Dropdown.Item icon={<FontAwesomeIcon icon={SolidIcon.faUserCog} />}>
            My Account
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
      {/* END Dropdown */}
      {/* BEGIN Dropdown */}
      <Dropdown.Uncontrolled nav>
        <Dropdown.Toggle nav>Features</Dropdown.Toggle>
        <Dropdown.Menu animated wide className="overflow-hidden">
          <Dropdown.Row>
            <Dropdown.Col className="d-flex flex-column align-items-start justify-content-center bg-primary text-white">
              <h2 className="font-weight-bolder">Welcome back!</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, commodi hic
                qui aspernatur doloremque quos tempora placeat culpa illum, voluptatibus delectus
                provident cumque aliquid enim, laborum aliquam. Quod, perferendis unde.
              </p>
            </Dropdown.Col>
            <Dropdown.Col>
              <Dropdown.Header size="lg">Features</Dropdown.Header>
              {/* BEGIN Grid Nav */}
              <GridNav action>
                <GridNav.Row>
                  <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faWindowRestore} />}>
                    Dashboard
                  </GridNav.Item>
                  <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faClipboard} />}>
                    TODO List
                  </GridNav.Item>
                  <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faQuestionCircle} />}>
                    Help Center
                  </GridNav.Item>
                </GridNav.Row>
                <GridNav.Row>
                  <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faImages} />}>
                    Galery
                  </GridNav.Item>
                  <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faChartBar} />}>
                    Scrumboard
                  </GridNav.Item>
                  <GridNav.Item icon={<FontAwesomeIcon icon={RegularIcon.faBookmark} />}>
                    Docs
                  </GridNav.Item>
                </GridNav.Row>
              </GridNav>
              {/* END Grid Nav */}
            </Dropdown.Col>
            <Dropdown.Col className="border-left">
              <Dropdown.Header size="lg">Tools</Dropdown.Header>
              <Dropdown.Item bullet>Components</Dropdown.Item>
              <Dropdown.Item bullet>Form Wizard</Dropdown.Item>
              <Dropdown.Item bullet>Documentation</Dropdown.Item>
              <Dropdown.Item bullet>Knowledge Base</Dropdown.Item>
              <Dropdown.Item bullet>Inventory Manager</Dropdown.Item>
            </Dropdown.Col>
          </Dropdown.Row>
        </Dropdown.Menu>
      </Dropdown.Uncontrolled>
      {/* END Dropdown */}
    </Nav>
  )
}

export default HeaderNav
