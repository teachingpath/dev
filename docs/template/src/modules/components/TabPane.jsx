import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { TabContext } from "./TabContext"
import { mapToCssModules, tagPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  tabId: PropTypes.any,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

export default function TabPane(props) {
  const { className, cssModule, tabId, tag: Tag, ...attributes } = props
  const getClasses = activeTabId =>
    mapToCssModules(classNames("tab-pane", { active: tabId === activeTabId }, className), cssModule)

  return (
    <TabContext.Consumer>
      {({ activeTabId }) => <Tag {...attributes} className={getClasses(activeTabId)} />}
    </TabContext.Consumer>
  )
}

TabPane.propTypes = propTypes
TabPane.defaultProps = defaultProps
