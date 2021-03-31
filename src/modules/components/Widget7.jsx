import { createBasicComponent } from "./utils"
import Widget7Text from "./Widget7Text"
import Widget7Time from "./Widget7Time"

const Widget7 = createBasicComponent("div", "widget7", "Widget7")

Widget7.Text = Widget7Text
Widget7.Time = Widget7Time

export default Widget7
