import React from 'react'
import {
  Button as FlowButton,
  Label as FlowLabel,
  Radio as FlowRadio,
  TextInput as FlowTextInput,
} from 'flowbite-react'

const SEX = [
  { name: 'male', value: 'male' },
  { name: 'female', value: 'female' },
]

const PHASES = [
  { name: 'maintain', value: 'maintain' },
  { name: 'bulk', value: 'bulk' },
  { name: 'cut', value: 'cut' },
]

const ACTIVITY_LEVELS = [
  { name: 'sedentary', value: '1.2' },
  { name: 'light', value: '1.375' },
  { name: 'moderate', value: '1.55' },
  { name: 'heavy', value: '1.725' },
  { name: 'extreme', value: '1.9' },
]

const getRestingMetabolicRate = (isMale, heightIn, weightLbs, ageYears) => {
  const weightKg = weightLbs / 2.205
  const heightCm = heightIn * 2.54
  return isMale
    ? 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161
}

const getCalories = (rmr, activityLevel) => Math.round(rmr * activityLevel)

const getMacros = (weightLbs, rmr, phase, activityLevel) => {
  const activityAdjustedCals = rmr * activityLevel
  const weightInKg = weightLbs / 2.205
  const carbs = 50
  let protein
  let calories

  switch (phase) {
    case 'bulk': {
      calories = activityAdjustedCals * 1.2
      protein = weightInKg * 2
      break
    }
    case 'cut': {
      calories = activityAdjustedCals * 0.8
      protein = weightInKg * 1.4
      break
    }
    default: {
      calories = activityAdjustedCals * 1
      protein = weightInKg * 1.7
    }
  }

  const proteinCal = Math.round(protein * 4)
  const carbCal = Math.round(carbs * 4)
  const fatCal = Math.round(calories - carbCal - proteinCal)

  return {
    cal: Math.round(calories),
    carbCal,
    carbGram: carbs,
    fatCal,
    fatGram: Math.round(fatCal / 9),
    proteinCal,
    proteinGram: Math.round(protein),
  }
}

const TextInput = ({ id, label, ...rest }) => (
  <div>
    <FlowLabel
      htmlFor={id}
      value={label}
    />
    <FlowTextInput
      id={id}
      type="text"
      {...rest}
    />
  </div>
)

const RadioGroup = ({ id, label, options, onChange, value: fieldValue, ...rest }) => (
  <fieldset className="flex flex-col gap-4 border-none" id={id}>
    <legend>
      {label}
    </legend>
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

const validateSubmit = ({ activityLevel, age, height, phase, sex, weight }) => {
  if (
    (activityLevel && typeof +activityLevel === 'number') &&
    (age && typeof +age === 'number') &&
    (height && typeof +height === 'number') &&
    (weight && typeof +weight === 'number') &&
    phase && sex && activityLevel
  ) return true

  return false
}

const MacroApp = (props) => {
  const [valid, setValid] = React.useState(false)
  const [macros, setMacros] = React.useState({})
  const [formState, setFormState] = React.useState({
    activityLevel: '1.375',
    age: '43',
    height: '71',
    phase: 'maintain',
    sex: 'male',
    weight: '195',
  })

  React.useEffect(() => {
    const isValid = validateSubmit(formState)
    setValid(isValid)
  }, [formState])

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    })
  }

  const handleRadioChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { sex, height, weight, age, activityLevel, phase } = formState
    const rmr = getRestingMetabolicRate(sex === 'male', height, weight, age)
    const macros = getMacros(weight, rmr, phase, activityLevel)
    setMacros(macros)
  }

  const handleReset = (e) => {
    e.preventDefault()
    setMacros({})
    setFormState({
      height: '',
      weight: '',
      age: '',
    })
  }

  return (
    <div className="MacroApp">
      <p>Carbs are set to 50g for all cases following low carb recommendations</p>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 ">
        <form
          id="macros"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <TextInput
            id="height"
            label="Height (in)"
            onChange={handleChange}
            value={formState.height}
          />
          <TextInput
            id="weight"
            label="Weight (lb)"
            onChange={handleChange}
            value={formState.weight}
          />
          <TextInput
            id="age"
            label="Age"
            onChange={handleChange}
            value={formState.age}
          />
          <RadioGroup
            id="sex"
            label="sex"
            onChange={handleRadioChange}
            options={SEX}
            value={formState.sex}
          />
          <RadioGroup
            id="phase"
            label="Phase"
            onChange={handleRadioChange}
            options={PHASES}
            value={formState.phase}
          />
          <RadioGroup
            id="activityLevel"
            label="Activity Level"
            onChange={handleRadioChange}
            options={ACTIVITY_LEVELS}
            value={formState.activityLevel}
          />

          <small
            className="text-copy-light dark:dm-text-copy-light"
            style={{ lineHeight: 1 }}
          >
            Sedentary is minimal activity<br />
            Light is 1-3 workouts a week<br />
            Moderate 4-5 workouts a week<br />
            Heavy 6-7 workouts a week<br />
            Extreme 2x a day many days a week.
          </small>

          <FlowButton type="submit" disabled={!valid}>
            Calculate
          </FlowButton>
          <FlowButton type="reset" color="gray">
            Reset
          </FlowButton>
        </form>

        <div>
          <pre className="p-4 bg-primary-ultraLight dark:bg-dm-copy-light">
            {JSON.stringify(formState, null, 2)}
          </pre>
          <hr />
          <pre className="p-4 bg-primary-ultraLight dark:bg-dm-copy-light">
            {JSON.stringify(macros, null, 2)}
          </pre>
        </div>
      </div>
    </div >
  )
}

export default MacroApp
