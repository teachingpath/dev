import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, refPropType } from "./utils"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func]),
  innerRef: refPropType,
  onChange: PropTypes.func,
  invalid: PropTypes.bool,
  htmlFor: PropTypes.string,
  valid: PropTypes.bool,
  label: PropTypes.node,
  size: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

class CustomFileInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      files: null
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    let input = e.target
    let { onChange } = this.props
    let files = this.getSelectedFiles(input)

    if (typeof onChange === "function") {
      onChange(...arguments)
    }

    this.setState({ files })
  }

  getSelectedFiles(input) {
    let { multiple } = this.props

    if (multiple && input.files) {
      let files = [].slice.call(input.files)

      return files.map(file => file.name).join(", ")
    }

    if (input.value.indexOf("fakepath") !== -1) {
      let parts = input.value.split("\\")

      return parts[parts.length - 1]
    }

    return input.value
  }

  render() {
    const {
      dataBrowse,
      cssModule,
      className,
      innerRef,
      onChange,
      children,
      invalid,
      htmlFor,
      hidden,
      label,
      size,
      valid,
      type,
      ...attributes
    } = this.props

    const customClass = mapToCssModules(classNames(className, "custom-file"), cssModule)

    const validationClassNames = mapToCssModules(
      classNames(invalid && "is-invalid", valid && "is-valid"),
      cssModule
    )

    const labelHtmlFor = htmlFor || attributes.id
    const { files } = this.state

    return (
      <div className={customClass} hidden={hidden || false}>
        <input
          type="file"
          {...attributes}
          ref={innerRef}
          aria-invalid={invalid}
          className={classNames(
            validationClassNames,
            mapToCssModules("custom-file-input", cssModule)
          )}
          onChange={this.onChange}
        />
        <label
          className={mapToCssModules("custom-file-label", cssModule)}
          htmlFor={labelHtmlFor}
          data-browse={dataBrowse}
        >
          {files || label || "Choose file"}
        </label>
        {children}
      </div>
    )
  }
}

CustomFileInput.propTypes = propTypes

export default CustomFileInput
