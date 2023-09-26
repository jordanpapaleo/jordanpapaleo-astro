import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import Button from '@componentsReact/Button'
import TextInput from '@componentsReact/TextInput'
import set from 'lodash/set'
import Select from '@componentsReact/Select'

const TableSection = ({
  label,
  span,
  children,
  addExercise,
  exercises = [],
}) => (
  <tbody>
    <tr className="bg-primary-ultraLight">
      <td colSpan={span}>
        <div className="pl-4">{label}</div>
      </td>
    </tr>

    {children}

    <tr>
      <td>
        <Button size="xs" color="gray" onClick={addExercise}>
          Add Exercise
        </Button>
      </td>
    </tr>
  </tbody>
)

const classes = 'pl-1 pr-1'
const TableExercises = ({ onChange, exerciseOptions }) => (
  <tr>
    <td className={classes}>
      <Select
        onChange={onChange}
        options={[{ label: 'Exercise', value: 0 }, ...exerciseOptions]}
        // readOnly
        name="name"
      />
      {/* <TextInput placeholder="Exercise Name" onChange={onChange} name="name" /> */}
    </td>
    <td className={classes}>
      <TextInput placeholder="Sets" onChange={onChange} name="sets" />
    </td>
    <td className={classes}>
      <TextInput placeholder="Reps" onChange={onChange} name="reps" />
    </td>
    <td className={classes}>
      <TextInput placeholder="Tempo" onChange={onChange} name="tempo" />
    </td>
    <td className={classes}>
      <TextInput placeholder="Rest" onChange={onChange} name="rest" />
    </td>
    <td className={classes}>
      <TextInput placeholder="Notes" onChange={onChange} name="notes" />
    </td>
  </tr>
)

const OptLog = ({ save, resistanceDb }) => {
  const [workout, setWorkout] = React.useState({
    clientName: '',
    date: format(new Date(), 'MM/dd/yyyy'),
    goal: '',
    phase: '',
    workoutId: uuidv4(),
  })

  const [resistanceOptions] = React.useState(
    resistanceDb.map((ex) => ({
      label: ex.name,
      value: ex.id,
    })),
  )

  const [exercises, setExercises] = React.useState({
    warmup: [],
    activation: [],
    skill: [],
    resistance: [],
    choice: [],
    cooldown: [],
  })

  const completeWorkout = (e) => {
    e.preventDefault()
    save({
      workout,
      exercises,
    })
  }

  const handleAddExercise = (type) => (e) => {
    setExercises({
      ...exercises,
      [type]: [
        ...exercises[type],
        {
          id: uuidv4(),
          name: '',
          sets: null,
          reps: null,
          tempo: null,
          rest: null,
          notes: '',
        },
      ],
    })
  }

  const updateExercise = (type, exercise) => (e) => {
    const i = exercises[type].findIndex(({ id }) => id === exercise.id)
    if (i !== -1) {
      set(exercises[type], `[${i}][${e.target.name}]`, e.target.value)
      setExercises(exercises)
    }
  }

  const updateWorkout = (field) => (e) => {
    setWorkout({
      ...workout,
      [field]: e.target.value,
    })
  }

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={completeWorkout}>
      <h2 className="flex">
        <span className="flex-1">Opt Dashboard</span>
        <small className="text-xs">{workout.date}</small>
      </h2>

      <div className="grid grid-cols-2 gap-2">
        <TextInput
          onChange={updateWorkout('clientName')}
          placeholder="Name"
          value={workout.clientName}
          type="string"
        />

        <TextInput
          onChange={updateWorkout('phase')}
          placeholder="Phase"
          value={workout.phase}
          type="string"
        />
      </div>

      <TextInput
        onChange={updateWorkout('goal')}
        placeholder="Goal"
        value={workout.goal}
        type="String"
      />

      <div className="mt-4 mb-4 border-b-2" />

      <table>
        <TableSection
          label="Warmup"
          span={6}
          addExercise={handleAddExercise('warmup')}
        >
          {exercises.warmup.map((w) => (
            <TableExercises
              exerciseOptions={resistanceOptions}
              onChange={updateExercise('warmup', w)}
              key={w.id}
            />
          ))}
        </TableSection>
        <TableSection
          label="Activation (core & balance)"
          span={6}
          addExercise={handleAddExercise('activation')}
        >
          {exercises.activation.map((a) => (
            <TableExercises
              exerciseOptions={resistanceOptions}
              onChange={updateExercise('activation', a)}
              key={a.id}
            />
          ))}
        </TableSection>
        <TableSection
          label="Skill development (ploymetric & SAQ)"
          span={6}
          addExercise={handleAddExercise('skill')}
        >
          {exercises.skill.map((s) => (
            <TableExercises
              exerciseOptions={resistanceOptions}
              onChange={updateExercise('skill', s)}
              key={s.id}
            />
          ))}
        </TableSection>
        <TableSection
          label="Resistance"
          span={6}
          addExercise={handleAddExercise('resistance')}
        >
          {exercises.resistance.map((r) => (
            <TableExercises
              exerciseOptions={resistanceOptions}
              onChange={updateExercise('resistance', r)}
              key={r.id}
            />
          ))}
        </TableSection>
        <TableSection
          label="Choice"
          span={6}
          addExercise={handleAddExercise('choice')}
        >
          {exercises.choice.map((c) => (
            <TableExercises
              exerciseOptions={resistanceOptions}
              onChange={updateExercise('choice', c)}
              key={c.id}
            />
          ))}
        </TableSection>
        <TableSection
          label="Cooldown"
          span={6}
          addExercise={handleAddExercise('cooldown')}
        >
          {exercises.cooldown.map((c) => (
            <TableExercises
              exerciseOptions={resistanceOptions}
              onChange={updateExercise('cooldown', c)}
              key={c.id}
            />
          ))}
        </TableSection>
      </table>

      <div className="mt-4 mb-4 border-b-2" />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Button type="submit" onClick={completeWorkout}>
          Complete Program
        </Button>
      </div>
    </form>
  )
}

export default OptLog
