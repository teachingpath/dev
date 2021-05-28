import { createBasicComponent } from "./utils"
import HeaderContainer from "./HeaderContainer"
import HeaderHolder from "./HeaderHolder"
import HeaderWrap from "./HeaderWrap"
import HeaderTitle from "./HeaderTitle"
import HeaderBrand from "./HeaderBrand"
import HeaderDivider from "./HeaderDivider"

const Header = createBasicComponent("div", "header", "Header")

Header.Container = HeaderContainer
Header.Holder = HeaderHolder
Header.Wrap = HeaderWrap
Header.Title = HeaderTitle
Header.Brand = HeaderBrand
Header.Divider = HeaderDivider

export default Header
