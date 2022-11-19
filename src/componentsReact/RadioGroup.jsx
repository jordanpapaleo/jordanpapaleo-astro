import React from 'react'
import { Label as FlowLabel, Radio as FlowRadio } from 'flowbite-react'

const RadioGroup = ({
  id,
  label,
  options,
  onChange,
  value: fieldValue,
  ...rest
}) => (
  <fieldset className="flex flex-col gap-4 border-none" id={id}>
    <legend>{label}</legend>
    {options.map(({ name, value }) => (
      <FlowLabel className="flex items-center gap-2" key={value}>
        <FlowRadio
          id={name}
          name={id}
          onChange={onChange}
          defaultChecked={value === fieldValue}
          value={value}
          {...rest}
        />
        {name}
      </FlowLabel>
    ))}
  </fieldset>
)

export default RadioGroup
