import React from 'react'
import { Label as FlowLabel, TextInput as FlowTextInput } from 'flowbite-react'

const TextInput = ({ id, label, ...rest }) => (
  <div>
    <FlowLabel htmlFor={id} value={label} />
    <FlowTextInput id={id} type="text" {...rest} />
  </div>
)

export default TextInput
