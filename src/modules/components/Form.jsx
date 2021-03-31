import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, tagPropType, refPropType } from "./utils"
import FormFeedback from "./FormFeedback"
import FormGroup from "./FormGroup"
import FormText from "./FormText"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: refPropType,
  inline: PropTypes.bool,
  tag: tagPropType
}

const defaultProps = {
  tag: "form"
}

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.getRef = this.getRef.bind(this)
    this.submit = this.submit.bind(this)
  }

  getRef(ref) {
    if (this.props.innerRef) {
      this.props.innerRef(ref)
    }
    this.ref = ref
  }

  submit() {
    if (this.ref) {
      this.ref.submit()
    }
  }

  render() {
    const { className, cssModule, innerRef, inline, tag: Tag, ...attributes } = this.props

    const classes = mapToCssModules(classNames({ "form-inline": inline }, className), cssModule)

    return <Tag {...attributes} ref={innerRef} className={classes} />
  }
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps

Form.Feedback = FormFeedback
Form.Group = FormGroup
Form.Text = FormText

export default Form
