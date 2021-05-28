import { createBasicComponent } from "./utils"
import Widget8Addon from "./Widget8Addon"
import Widget8Avatar from "./Widget8Avatar"
import Widget8Content from "./Widget8Content"
import Widget8Highlight from "./Widget8Highlight"
import Widget8Subtitle from "./Widget8Subtitle"
import Widget8Title from "./Widget8Title"

const Widget8 = createBasicComponent("div", "widget8", "Widget8")

Widget8.Addon = Widget8Addon
Widget8.Avatar = Widget8Avatar
Widget8.Content = Widget8Content
Widget8.Highlight = Widget8Highlight
Widget8.Subtitle = Widget8Subtitle
Widget8.Title = Widget8Title

export default Widget8
