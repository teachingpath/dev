import { createBasicComponent } from "./utils"
import Widget4Addon from "./Widget4Addon"
import Widget4Display from "./Widget4Display"
import Widget4Group from "./Widget4Group"
import Widget4Highlight from "./Widget4Highlight"
import Widget4Subtitle from "./Widget4Subtitle"
import Widget4Title from "./Widget4Title"

const Widget4 = createBasicComponent("div", "widget4", "Widget4")

Widget4.Addon = Widget4Addon
Widget4.Display = Widget4Display
Widget4.Group = Widget4Group
Widget4.Highlight = Widget4Highlight
Widget4.Subtitle = Widget4Subtitle
Widget4.Title = Widget4Title

export default Widget4
