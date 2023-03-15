import React from 'react'
import { Dropdown, Label as FlowLabel } from 'flowbite-react'
// https://tailwind-elements.com/docs/standard/forms/select/
// https://daisyui.com/components/select/

const Select = ({
  label,
  onChange,
  options,
  placeholder,
  value = '',
  ...rest
}) => {
  return (
    <div className="w-full">
      {label && <FlowLabel htmlFor={id} value={label} />}
      <select
        className="w-full"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default Select
