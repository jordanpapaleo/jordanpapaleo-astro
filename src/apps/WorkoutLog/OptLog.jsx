import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import Button from '@componentsReact/Button'
import TextInput from '@componentsReact/TextInput'

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
const TableExercises = ({ onChange }) => (
  <tr>
    <td className={classes}>
      <TextInput placeholder="Exercise Name" onChange={onChange} />
    </td>
    <td className={classes}>
      <TextInput placeholder="Sets" onChange={onChange} />
    </td>
    <td className={classes}>
      <TextInput placeholder="Reps" onChange={onChange} />
    </td>
    <td className={classes}>
      <TextInput placeholder="Tempo" onChange={onChange} />
    </td>
    <td className={classes}>
      <TextInput placeholder="Rest" onChange={onChange} />
    </td>
    <td className={classes}>
      <TextInput placeholder="Notes" onChange={onChange} />
    </td>
  </tr>
)

const OptLog = () => {
  const [workout, setWorkout] = React.useState({
    clientName: '',
    date: format(new Date(), 'MM/dd/yyyy'),
    goal: '',
    phase: '',
    workoutId: uuidv4(),
  })

  const [exercises, setExercises] = React.useState({
    activation: [],
    choice: [],
    cooldown: [],
    resistance: [],
    skill: [],
    warmup: [],
  })

  const completeWorkout = (e) => {
    e.preventDefault()
    console.log('Complete')
  }

  const handleAddExercise = (type) => (e) => {
    setExercises({
      ...exercises,
      [type]: [
        ...exercises[type],
        {
          id: uuidv4(),
        },
      ],
    })
  }

  const updateExercise = (type, exercise) => (e) => {
    console.log(type, exercise, e.target.value)
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
            <TableExercises onChange={updateExercise('warmup', w)} key={w.id} />
          ))}
        </TableSection>
        <TableSection
          label="Activation (core & balance)"
          span={6}
          addExercise={handleAddExercise('activation')}
        >
          {exercises.activation.map((a) => (
            <TableExercises
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
            <TableExercises onChange={updateExercise('skill', s)} key={s.id} />
          ))}
        </TableSection>
        <TableSection
          label="Resistance"
          span={6}
          addExercise={handleAddExercise('resistance')}
        >
          {exercises.resistance.map((r) => (
            <TableExercises
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
            <TableExercises onChange={updateExercise('choice', c)} key={c.id} />
          ))}
        </TableSection>
        <TableSection
          label="Cooldown"
          span={6}
          addExercise={handleAddExercise('cooldown')}
        >
          {exercises.cooldown.map((c) => (
            <TableExercises
              onChange={updateExercise('cooldown', c)}
              key={c.id}
            />
          ))}
        </TableSection>
      </table>

      <div className="mt-4 mb-4 border-b-2" />

      <div className="grid grid-cols-2 gap-2">
        <Button color="success" type="submit" onClick={completeWorkout}>
          Complete Program
        </Button>
      </div>
    </form>
  )
}

export default OptLog
