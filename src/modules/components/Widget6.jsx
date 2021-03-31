import { createBasicComponent } from "./utils"
import Widget6Title from "./Widget6Title"
import Widget6Subtitle from "./Widget6Subtitle"

const Widget6 = createBasicComponent("div", "widget6", "Widget6")

Widget6.Title = Widget6Title
Widget6.Subtitle = Widget6Subtitle

export default Widget6
