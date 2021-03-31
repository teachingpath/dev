import { createBasicComponent } from "./utils"
import Widget5Group from "./Widget5Group"
import Widget5Info from "./Widget5Info"
import Widget5Item from "./Widget5Item"
import Widget5Title from "./Widget5Title"
import Widget5Value from "./Widget5Value"

const Widget5 = createBasicComponent("div", "widget5", "Widget5")

Widget5.Group = Widget5Group
Widget5.Info = Widget5Info
Widget5.Item = Widget5Item
Widget5.Title = Widget5Title
Widget5.Value = Widget5Value

export default Widget5
