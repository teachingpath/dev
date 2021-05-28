import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { mapToCssModules, refPropType } from "./utils"
import CustomFileInput from "./CustomFileInput"

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func]),
  innerRef: refPropType,
  htmlFor: PropTypes.string,
  invalid: PropTypes.bool,
  valid: PropTypes.bool,
  inline: PropTypes.bool,
  label: PropTypes.node,
  size: PropTypes.oneOf(["sm", "lg"]),
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

const CustomInput = props => {
  const {
    className,
    cssModule,
    children,
    innerRef,
    htmlFor,
    invalid,
    valid,
    inline,
    label,
    size,
    type,
    ...attributes
  } = props

  let sizeClass = false

  if (size) {
    if (type === "checkbox" || type === "radio" || type === "switch") {
      sizeClass = `custom-control-${size}`
    } else {
      sizeClass = `custom-${type}-${size}`
    }
  }

  const customClass = mapToCssModules(classNames(`custom-${type}`, sizeClass, className), cssModule)

  const validationClassNames = mapToCssModules(
    classNames(invalid && "is-invalid", valid && "is-valid"),
    cssModule
  )

  const labelHtmlFor = htmlFor || attributes.id

  if (type === "select") {
    const { type, ...rest } = attributes
    return (
      <select
        {...rest}
        type={type}
        ref={innerRef}
        className={classNames(validationClassNames, customClass)}
        aria-invalid={invalid}
      >
        {children}
      </select>
    )
  }

  if (type === "file") {
    return <CustomFileInput {...props} />
  }

  if (type !== "checkbox" && type !== "radio" && type !== "switch") {
    return (
      <input
        {...attributes}
        type={type}
        ref={innerRef}
        aria-invalid={invalid}
        className={classNames(validationClassNames, customClass)}
      />
    )
  }

  const wrapperClasses = classNames(
    customClass,
    mapToCssModules(classNames("custom-control", { "custom-control-inline": inline }), cssModule)
  )

  const { hidden, ...rest } = attributes
  return (
    <div className={wrapperClasses} hidden={hidden || false}>
      <input
        {...rest}
        type={type === "switch" ? "checkbox" : type}
        ref={innerRef}
        aria-invalid={invalid}
        className={classNames(
          validationClassNames,
          mapToCssModules("custom-control-input", cssModule)
        )}
      />
      <label className={mapToCssModules("custom-control-label", cssModule)} htmlFor={labelHtmlFor}>
        {label}
      </label>
      {children}
    </div>
  )
}

CustomInput.propTypes = propTypes

export default CustomInput
