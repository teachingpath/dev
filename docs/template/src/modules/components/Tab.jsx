import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { TabContext } from "./TabContext"
import { mapToCssModules, omit, tagPropType } from "./utils"
import TabPane from "./TabPane"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  activeTab: PropTypes.any,
  tag: tagPropType
}

const defaultProps = {
  tag: "div"
}

class Tab extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.activeTab !== nextProps.activeTab) {
      return {
        activeTab: nextProps.activeTab
      }
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      activeTab: this.props.activeTab
    }
  }

  render() {
    const { className, cssModule, tag: Tag } = this.props

    const attributes = omit(this.props, Object.keys(propTypes))

    const classes = mapToCssModules(classNames("tab-content", className), cssModule)

    return (
      <TabContext.Provider value={{ activeTabId: this.state.activeTab }}>
        <Tag {...attributes} className={classes} />
      </TabContext.Provider>
    )
  }
}

Tab.propTypes = propTypes
Tab.defaultProps = defaultProps

Tab.Pane = TabPane

export default Tab
