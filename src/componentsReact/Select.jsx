import React from 'react'
import { Label as FlowLabel } from 'flowbite-react'
import ReactSelect from 'react-select'

const Select = ({ label, ...rest }) => (
  <div className="w-full">
    {label && <FlowLabel htmlFor={id} value={label} />}
    <ReactSelect className="w-full" isSearchable {...rest} />
  </div>
)

export default Select
