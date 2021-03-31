import { Aside, Menu } from "@panely/components"
import { withRouter } from "next/router"
import SimpleBar from "simplebar"
import Link from "next/link"
import MENU from "config/menu.config"

class AsideBodyComponent extends React.Component {
  constructor(props) {
    super(props)

    const { states, submenuActive } = this.setInitialState()

    // Set initial data
    this.linkRefs = []
    this.submenuRefs = []
    this.state = states
    this.submenuActive = submenuActive
    this.bodyRef = React.createRef()
  }

  setInitialState = () => {
    let states = {}
    let submenuActive = []

    // Loop the MENU object tree
    MENU.forEach((menu, index1) => {
      // Check whether the node has child
      if (Boolean(menu.child)) {
        // Add data to states variables
        states = this.addDataToObject(states, [index1], {
          active: true,
          height: "auto",
          hasChild: true
        })

        // Loop the second level child node
        menu.child.forEach((menu, index2) => {
          // Check whether the node has child
          if (Boolean(menu.child)) {
            // Add data to states variables
            states = this.addDataToObject(states, [index1, index2], {
              active: true,
              height: "auto",
              hasChild: true
            })

            // Loop the third level child node
            menu.child.forEach((menu, index3) => {
              // Add data to states variables
              states = this.addDataToObject(states, [index1, index2, index3], {
                active: menu.link === this.props.router.pathname,
                hasChild: false
              })

              // Add data to submenuActive variables
              if (menu.link === this.props.router.pathname) {
                submenuActive.push([index1, index2].join(","))
                submenuActive.push([index1].join(","))
              }
            })
          } else {
            // Add data to states variables
            states = this.addDataToObject(states, [index1, index2], {
              active: menu.link === this.props.router.pathname,
              hasChild: false
            })

            // Add data to submenuActive variables
            if (menu.link === this.props.router.pathname) {
              submenuActive.push([index1].join(","))
            }
          }
        })
      } else {
        // Add data to states variables
        states = this.addDataToObject(states, [index1], {
          active: menu.link === this.props.router.pathname,
          hasChild: false
        })
      }
    })

    return { states, submenuActive }
  }

  handleLinkClick = (selfRoute, parentRoute) => {
    let states = this.state

    // Check whether the link has child
    if (states[selfRoute].hasChild) {
      // Toggle active state
      states[selfRoute].active = !states[selfRoute].active

      // Check whether the link has parent
      if (parentRoute.length > 0) {
        let selfheight = states[selfRoute].height
        let parentHeight = states[parentRoute].height

        // Adjust the parent elements height
        if (states[selfRoute].active) {
          states[parentRoute].height = parentHeight + selfheight
        } else {
          states[parentRoute].height = parentHeight - selfheight
        }
      }
    } else {
      // Deactivate all links
      for (const selfRoute in states) {
        if (!states[selfRoute].hasChild) {
          states[selfRoute].active = false
        }
      }

      // Activate clicked link
      states[selfRoute].active = true
    }

    this.setState(states)
  }

  addDataToObject = (object, identifier, value) => {
    return {
      ...object,
      [identifier]: value
    }
  }

  componentDidMount() {
    let states = this.state

    // Loop submenu elements to set height and collapse it
    this.submenuRefs.forEach(submenu => {
      // Get submenu route
      let selfRoute = submenu.getAttribute("data-route").split(",")

      // Set element height
      states[selfRoute].height = submenu.offsetHeight

      // Check whether submenu elements is active
      if (this.submenuActive.includes(selfRoute.join(","))) {
        states[selfRoute].active = true
      } else {
        states[selfRoute].active = false
      }
    })

    // Loop submenu elements to fix height data
    this.submenuRefs.forEach(submenu => {
      // Get submenu parent route
      let parentRoute = submenu.getAttribute("data-route").split(",")
      parentRoute.pop()

      // Check whether the submenu has parents
      if (parentRoute.length > 0) {
        let selfheight = submenu.offsetHeight
        let parentHeight = states[parentRoute].height

        // Fix the element height
        states[parentRoute].height = parentHeight - selfheight
      }
    })

    this.setState(states, () => {
      // Initialize custom scrollbar
      new SimpleBar(this.bodyRef.current)
    })
  }

  render() {
    return (
      <Aside.Body innerRef={this.bodyRef}>
        <Menu>
          {/* Loop MENU object tree */}
          {MENU.map((menu, index1) => {
            // Set all variables needed
            let Icon = menu.icon
            let parentRoute = []
            let selfRoute = [index1]
            let hasChild = Boolean(menu.child)
            let state = this.state[selfRoute]

            // Check whether the node is a section
            return menu.section ? (
              <Menu.Section key={index1} children={menu.title} />
            ) : (
              <Menu.Item key={index1}>
                <AsideBodyMenuLink
                  key={index1}
                  data-level={0}
                  data-route={selfRoute}
                  link={menu.link}
                  icon={Icon ? <Icon /> : false}
                  addon={menu.addon}
                  bullet={menu.bullet}
                  active={state.active}
                  hasChild={hasChild}
                  onClick={() => this.handleLinkClick(selfRoute, parentRoute)}
                  innerRef={ref => this.linkRefs.push(ref)}
                  children={menu.title}
                />

                {/* Check whether the node has child */}
                {hasChild ? (
                  <Menu.Submenu
                    data-level={0}
                    data-route={selfRoute}
                    active={state.active}
                    height={state.height}
                    innerRef={ref => this.submenuRefs.push(ref)}
                  >
                    {/* Loop the second level MENU object tree */}
                    {menu.child.map((menu, index2) => {
                      // Set all variables needed
                      let Icon = menu.icon
                      let parentRoute = [index1]
                      let selfRoute = [index1, index2]
                      let hasChild = Boolean(menu.child)
                      let state = this.state[selfRoute]

                      return (
                        <Menu.Item key={index2}>
                          <AsideBodyMenuLink
                            key={index2}
                            data-route={selfRoute}
                            data-level={1}
                            link={menu.link}
                            icon={Icon ? <Icon /> : false}
                            addon={menu.addon}
                            bullet={menu.bullet}
                            active={state.active}
                            hasChild={hasChild}
                            onClick={() => this.handleLinkClick(selfRoute, parentRoute)}
                            innerRef={ref => this.linkRefs.push(ref)}
                            children={menu.title}
                          />

                          {/* Check whether the node has child */}
                          {hasChild ? (
                            <Menu.Submenu
                              data-level={1}
                              data-route={selfRoute}
                              active={state.active}
                              height={state.height}
                              innerRef={ref => this.submenuRefs.push(ref)}
                            >
                              {/* Loop the third level MENU object tree */}
                              {menu.child.map((menu, index3) => {
                                // Set all variables needed
                                let Icon = menu.icon
                                let parentRoute = [index1, index2]
                                let selfRoute = [index1, index2, index3]
                                let hasChild = Boolean(menu.child)
                                let state = this.state[selfRoute]

                                return (
                                  <Menu.Item key={index3}>
                                    <AsideBodyMenuLink
                                      key={index3}
                                      data-route={selfRoute}
                                      data-level={2}
                                      link={menu.link}
                                      icon={Icon ? <Icon /> : false}
                                      addon={menu.addon}
                                      bullet={menu.bullet}
                                      active={state.active}
                                      hasChild={hasChild}
                                      onClick={() => this.handleLinkClick(selfRoute, parentRoute)}
                                      innerRef={ref => this.linkRefs.push(ref)}
                                      children={menu.title}
                                    />
                                  </Menu.Item>
                                )
                              })}
                            </Menu.Submenu>
                          ) : null}
                        </Menu.Item>
                      )
                    })}
                  </Menu.Submenu>
                ) : null}
              </Menu.Item>
            )
          })}
        </Menu>
      </Aside.Body>
    )
  }
}

function AsideBodyMenuLink(props) {
  const { hasChild, link, ...attributes } = props
  const MenuLink = React.forwardRef((props, ref) => <Menu.Link {...props} innerRef={ref} />)

  return hasChild ? (
    <Menu.Link tag="button" {...attributes} caret toggle />
  ) : (
    <Link href={link} passHref>
      <MenuLink {...attributes} />
    </Link>
  )
}

export default withRouter(AsideBodyComponent)
