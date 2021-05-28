import { createBasicComponent } from "./utils"
import Widget9Degree from "./Widget9Degree"
import Widget9Display from "./Widget9Display"
import Widget9Grid from "./Widget9Grid"
import Widget9GridIcon from "./Widget9GridIcon"
import Widget9GridItem from "./Widget9GridItem"
import Widget9GridText from "./Widget9GridText"
import Widget9Icon from "./Widget9Icon"
import Widget9List from "./Widget9List"
import Widget9ListAddon from "./Widget9ListAddon"
import Widget9ListItem from "./Widget9ListItem"
import Widget9ListText from "./Widget9ListText"
import Widget9Text from "./Widget9Text"

const Widget9 = createBasicComponent("div", "widget9", "Widget9")

Widget9.Degree = Widget9Degree
Widget9.Display = Widget9Display
Widget9.Grid = Widget9Grid
Widget9.GridIcon = Widget9GridIcon
Widget9.GridItem = Widget9GridItem
Widget9.GridText = Widget9GridText
Widget9.Icon = Widget9Icon
Widget9.List = Widget9List
Widget9.ListAddon = Widget9ListAddon
Widget9.ListItem = Widget9ListItem
Widget9.ListText = Widget9ListText
Widget9.Text = Widget9Text

export default Widget9
