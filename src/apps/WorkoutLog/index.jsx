/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import CheckboxGroup from '@componentsReact/CheckboxGroup'
import Select from '@componentsReact/Select'
import Button from '@componentsReact/Button'
import TextInput from '@componentsReact/TextInput'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'

const EXERCISES = [
  {
    id: 'ae43aa99-897e-4171-ad49-aa3f2d0548cc',
    name: 'Squats',
    technique: '',
    type: 'resistance',
    muscles: [
      'gluteus maximus, minimus, and medius',
      'quadriceps',
      'hamstrings',
      'adductor',
      'hip flexors',
      'calves',
    ],
  },
  {
    id: 'be43aa99-897e-4171-ad49-aa3f2d0548cc',
    name: 'Romanian Dead Lift',
    technique: '',
    type: 'resistance',
    muscles: [
      'erector spinae',
      'gluteus maximus',
      'hamstrings',
      'adductor magus',
      'gastrocnemius',
      'trapezius',
      'forearm flexors',
    ],
  },
]

const exerciseOptions = EXERCISES.map((ex) => ({
  label: ex.name,
  value: ex.id,
}))

const WorkoutLog = () => {
  const [workout, setWorkout] = React.useState({
    date: format(new Date(), 'MM/dd/yyyy'),
    id: uuidv4(),
    name: 'Chest',
  })

  const [sets, setSets] = React.useState([])

  const addNewSet = (e) => {
    const exerciseName = e.target.value
    const exercise = exerciseOptions.find(
      ({ label }) => label === e.target.value,
    )

    setSets([
      ...sets,
      {
        id: uuidv4(), // unique id for this specificy entry
        liftId: uuidv4(), // shared id to group set
        exerciseId: exercise.value, // id of the exercise from the db
        name: exercise.label, // name of the exercise from the db
        reps: '',
        rest: '',
        set: 0,
        tempo: '',
        weight: '',
      },
    ])
  }

  /* add the new set at the last entry of the set Id */
  const appendSet = (exerciseName, exerciseId, liftId, set) => {
    const lastSetForLift = sets.filter((s) => s.liftId === liftId).pop()
    setSets(
      sets
        .map((s) => {
          if (s.id !== lastSetForLift.id) return s

          return [
            s,
            {
              id: uuidv4(),
              liftId: liftId,
              exerciseId: exerciseId,
              name: exerciseName,
              reps: '',
              rest: '',
              set: set + 1,
              tempo: '',
              weight: '',
            },
          ]
        })
        .flat(),
    )
  }

  const updateExercise = (id, field) => (e) => {
    const i = sets.findIndex((s) => s.id === id)

    setSets(
      sets.map((s) => {
        // eslint-disable-next-line prettier/prettier
        return s.id === id
          ? { ...s, [field]: e.target.value }
          : s
      }),
    )
  }

  const completeWorkout = (e) => {
    e.preventDefault()
    console.log({
      ...workout,
      sets,
    })
  }

  return (
    <form className="grid w-full grid-cols-1 gap-4">
      <TextInput
        label={<small>{workout.date}</small>}
        placeholder="Workout Name"
        value={workout.name}
        onChange={(e) => {
          setWorkout({
            ...workout,
            name: e.target.value,
          })
        }}
      />

      {sets.map((s, i) => (
        <div key={i} className="grid grid-cols-1 gap-3">
          {/* only show the name if its not a duplicate like adding a set */}
          {s.set === 0 && (
            <div className="grid grid-cols-1 gap-2">
              <strong className="flex gap-4 uppercase">{s.name}</strong>
              <div className="grid grid-cols-4 gap-2">
                <small>Weight</small>
                <small>Reps</small>
                <small>Rest</small>
                <small>Tempo</small>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-2">
            <TextInput
              onChange={updateExercise(s.id, 'weight')}
              placeholder="Weight"
              value={s.weight}
            />
            <TextInput
              onChange={updateExercise(s.id, 'reps')}
              placeholder="Reps"
              value={s.reps}
            />
            <TextInput
              onChange={updateExercise(s.id, 'rest')}
              placeholder="Rest"
              value={s.rest}
            />
            <TextInput
              onChange={updateExercise(s.id, 'tempo')}
              placeholder="Tempo"
              value={s.tempo}
            />
          </div>

          {(!sets[i + 1] || s.liftId !== sets[i + 1]?.liftId) && (
            <div>
              <Button
                color="gray"
                onClick={() => {
                  appendSet(s.name, s.exerciseId, s.liftId, s.set)
                }}
              >
                + Set
              </Button>
            </div>
          )}
        </div>
      ))}

      <Select
        onChange={addNewSet}
        options={[{ label: '+ Exercise', value: 0 }, ...exerciseOptions]}
        value={''}
        readOnly
      />

      <Button color="success" type="submit" onClick={completeWorkout}>
        Complete Workout
      </Button>
    </form>
  )
}

export default WorkoutLog
