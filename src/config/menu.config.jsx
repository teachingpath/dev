import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Badge } from "@panely/components"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

/*
 * Menu Configuration
 * the object below is representation of the side navigation menu
 * there are some property you can use to customize your menu
 */

const MENU = [
  {
    title: "Dashboard",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faDesktop} />,
    addon: () => <Badge variant="success">new</Badge>,
    link: "/"
  },
  {
    title: "Elements",
    section: true
  },
  {
    title: "Base",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faPalette} />,
    child: [
      {
        title: "Accordion",
        bullet: true,
        link: "/elements/base/accordion"
      },
      {
        title: "Alert",
        bullet: true,
        link: "/elements/base/alert"
      },
      {
        title: "Badge",
        bullet: true,
        link: "/elements/base/badge"
      },
      {
        title: "Button",
        bullet: true,
        link: "/elements/base/button"
      },
      {
        title: "Button Group",
        bullet: true,
        link: "/elements/base/button-group"
      },
      {
        title: "Card",
        bullet: true,
        link: "/elements/base/card"
      },
      {
        title: "Dropdown",
        bullet: true,
        link: "/elements/base/dropdown"
      },
      {
        title: "Grid Navigation",
        bullet: true,
        link: "/elements/base/grid-nav"
      },
      {
        title: "List Group",
        bullet: true,
        link: "/elements/base/list-group"
      },
      {
        title: "Marker",
        bullet: true,
        link: "/elements/base/marker"
      },
      {
        title: "Modal",
        bullet: true,
        link: "/elements/base/modal"
      },
      {
        title: "Navigation",
        bullet: true,
        link: "/elements/base/nav"
      },
      {
        title: "Pagination",
        bullet: true,
        link: "/elements/base/pagination"
      },
      {
        title: "Popover",
        bullet: true,
        link: "/elements/base/popover"
      },
      {
        title: "Progress",
        bullet: true,
        link: "/elements/base/progress"
      },
      {
        title: "Spinner",
        bullet: true,
        link: "/elements/base/spinner"
      },
      {
        title: "Tab",
        bullet: true,
        link: "/elements/base/tab"
      },
      {
        title: "Table",
        bullet: true,
        link: "/elements/base/table"
      },
      {
        title: "Tooltip",
        bullet: true,
        link: "/elements/base/tooltip"
      },
      {
        title: "Typoghrapy",
        bullet: true,
        link: "/elements/base/type"
      }
    ]
  },
  {
    title: "Advanced",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faAdjust} />,
    child: [
      {
        title: "Avatar",
        bullet: true,
        link: "/elements/advanced/avatar"
      },
      {
        title: "Carousel",
        bullet: true,
        link: "/elements/advanced/carousel"
      },
      {
        title: "Chat",
        bullet: true,
        link: "/elements/advanced/chat"
      },
      {
        title: "Rich List",
        bullet: true,
        link: "/elements/advanced/rich-list"
      },
      {
        title: "Sortable",
        bullet: true,
        link: "/elements/advanced/sortable"
      },
      {
        title: "Sweet Alert",
        bullet: true,
        link: "/elements/advanced/sweet-alert"
      },
      {
        title: "Timeline",
        bullet: true,
        link: "/elements/advanced/timeline"
      }
    ]
  },
  {
    title: "Icons",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faIcons} />,
    child: [
      {
        title: "Feather",
        bullet: true,
        link: "/icons/feather"
      },
      {
        title: "Font Awesome",
        bullet: true,
        link: "/icons/fontawesome"
      }
    ]
  },
  {
    title: "Portlet",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faWindowRestore} />,
    child: [
      {
        title: "Base",
        bullet: true,
        link: "/portlet/base"
      },
      {
        title: "Tab",
        bullet: true,
        link: "/portlet/tab"
      }
    ]
  },
  {
    title: "Widgets",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faShapes} />,
    child: [
      {
        title: "General",
        bullet: true,
        link: "/widgets/general"
      },
      {
        title: "Chart",
        bullet: true,
        link: "/widgets/chart"
      }
    ]
  },
  {
    title: "Data",
    section: true
  },
  {
    title: "Chart",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faChartPie} />,
    link: "/chart/apex-chart"
  },
  {
    title: "Form",
    section: true
  },
  {
    title: "Base",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faDice} />,
    link: "/form/base"
  },
  {
    title: "Custom",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faFillDrip} />,
    link: "/form/custom"
  },
  {
    title: "Editor",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faPencilRuler} />,
    child: [
      {
        title: "Basic",
        bullet: true,
        link: "/editor/basic"
      },
      {
        title: "Bubble",
        bullet: true,
        link: "/editor/bubble"
      },
      {
        title: "Complex",
        bullet: true,
        link: "/editor/complex"
      }
    ]
  },
  {
    title: "Layout",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faRulerCombined} />,
    link: "/form/layout"
  },
  {
    title: "Validation",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faCheck} />,
    link: "/form/validation"
  },
  {
    title: "Pages",
    section: true
  },
  {
    title: "Login",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faUnlockAlt} />,
    child: [
      {
        title: "Login 1",
        bullet: true,
        link: "/pages/login/login-1"
      },
      {
        title: "Login 2",
        bullet: true,
        link: "/pages/login/login-2"
      }
    ]
  },
  {
    title: "Register",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faUserPlus} />,
    child: [
      {
        title: "Register 1",
        bullet: true,
        link: "/pages/register/register-1"
      },
      {
        title: "Register 2",
        bullet: true,
        link: "/pages/register/register-2"
      }
    ]
  }
]

export default MENU
