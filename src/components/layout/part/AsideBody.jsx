import { Aside, Menu } from "@panely/components"
import { withRouter } from "next/router"
import SimpleBar from "simplebar"
import Link from "next/link"

class AsideBodyComponent extends React.Component {
  constructor(props) {
    super(props)
    const { states, submenuActive } = this.setInitialState(props.menuList)
    this.linkRefs = []
    this.submenuRefs = []
    this.state = states
    this.submenuActive = submenuActive
    this.bodyRef = React.createRef()
  }

  setInitialState = (menuList) => {
    let states = {}
    let submenuActive = []
    menuList.forEach((menu, index1) => {
      if (Boolean(menu.child)) {
        states = this.addDataToObject(states, [index1], {
          active: true,
          height: "auto",
          hasChild: true
        })

        menu.child.forEach((menu, index2) => {
          if (Boolean(menu.child)) {
            states = this.addDataToObject(states, [index1, index2], {
              active: true,
              height: "auto",
              hasChild: true
            })

            menu.child.forEach((menu, index3) => {
              states = this.addDataToObject(states, [index1, index2, index3], {
                active: menu.link === this.props.router.pathname,
                hasChild: false
              })

              if (menu.link === this.props.router.pathname) {
                submenuActive.push([index1, index2].join(","))
                submenuActive.push([index1].join(","))
              }
            })
          } else {
            states = this.addDataToObject(states, [index1, index2], {
              active: menu.link === this.props.router.pathname,
              hasChild: false
            })

            if (menu.link === this.props.router.pathname) {
              submenuActive.push([index1].join(","))
            }
          }
        })
      } else {
        states = this.addDataToObject(states, [index1], {
          active: menu.link === this.props.router.pathname || menu.current,
          hasChild: false
        })
      }
    })

    return { states, submenuActive }
  }

  handleLinkClick = (selfRoute, parentRoute, menu) => {
    let states = this.state

    if (states[selfRoute].hasChild) {
      states[selfRoute].active = !states[selfRoute].active

      if (parentRoute.length > 0) {
        let selfheight = states[selfRoute].height
        let parentHeight = states[parentRoute].height

        if (states[selfRoute].active) {
          states[parentRoute].height = parentHeight + selfheight
        } else {
          states[parentRoute].height = parentHeight - selfheight
        }
      }
    } else {
      for (const selfRoute in states) {
        if (!states[selfRoute].hasChild) {
          states[selfRoute].active = false
        }
      }

      states[selfRoute].active = true
    }
    menu.current = false;
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

    this.submenuRefs.forEach(submenu => {
      let selfRoute = submenu.getAttribute("data-route").split(",")

      states[selfRoute].height = submenu.offsetHeight

      if (this.submenuActive.includes(selfRoute.join(","))) {
        states[selfRoute].active = true
      } else {
        states[selfRoute].active = false
      }
    })

    this.submenuRefs.forEach(submenu => {
      let parentRoute = submenu.getAttribute("data-route").split(",")
      parentRoute.pop()

      if (parentRoute.length > 0) {
        let selfheight = submenu.offsetHeight
        let parentHeight = states[parentRoute].height

        states[parentRoute].height = parentHeight - selfheight
      }
    })

    this.setState(states, () => {
      new SimpleBar(this.bodyRef.current)
    })
  }

  render() {
    return (
      <Aside.Body innerRef={this.bodyRef}>
        <Menu>
          {this.props.menuList.map((menu, index1) => {
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
                  onClick={() => this.handleLinkClick(selfRoute, parentRoute, menu)}
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
                            current={menu.current || false}
                            hasChild={hasChild}
                            onClick={() => this.handleLinkClick(selfRoute, parentRoute, menu)}
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
                                      current={menu.current || false}
                                      hasChild={hasChild}
                                      onClick={() => this.handleLinkClick(selfRoute, parentRoute, menu)}
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
    <Menu.Link  tag="button" {...attributes} caret toggle />
  ) : (
    <Link href={link} passHref replace >
      <MenuLink title={props.children} {...attributes} />
    </Link>
  )
}

export default withRouter(AsideBodyComponent)
