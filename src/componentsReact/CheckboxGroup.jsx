import React from 'react'
import { Label as FlowLabel, Checkbox as FlowCheckbox } from 'flowbite-react'
import clsx from 'clsx'

const CheckboxGroup = ({
  id,
  label,
  options,
  onChange,
  value: fieldValue,
  inline,
  ...rest
}) => (
  <fieldset className="flex flex-col gap-4 border-none" id={id}>
    <legend>{label}</legend>
    <div className={clsx(inline && 'flex flex-wrap gap-3')}>
      {options.map(({ name, value }) => (
        <FlowLabel className="flex items-center gap-2" key={value}>
          <FlowCheckbox
            id={name}
            name={id}
            onChange={onChange}
            defaultChecked={fieldValue.includes(value)}
            value={value}
            {...rest}
          />
          {name}
        </FlowLabel>
      ))}
    </div>
  </fieldset>
)

export default CheckboxGroup
