import { createBasicComponent } from "./utils"
import MenuItem from "./MenuItem"
import MenuLink from "./MenuLink"
import MenuSection from "./MenuSection"
import MenuSubmenu from "./MenuSubmenu"

const Menu = createBasicComponent("div", "menu", "Menu")

Menu.Item = MenuItem
Menu.Link = MenuLink
Menu.Section = MenuSection
Menu.Submenu = MenuSubmenu

export default Menu
