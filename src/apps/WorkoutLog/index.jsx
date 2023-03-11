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

  const [exercises, setExercises] = React.useState([])

  const addExercise = (exerciseOption) => {
    const exerciseId = uuidv4()
    setExercises([
      ...exercises,
      {
        name: exerciseOption.label,
        id: exerciseOption.value,
        tempo: '',
        rest: '',
        sets: [
          {
            id: uuidv4(),
            weight: '',
            reps: '',
          },
        ],
      },
    ])
  }

  const addSet = (exerciseId) => {
    const i = exercises.findIndex((exercise) => exercise.id === exerciseId)

    if (i !== -1) {
      setExercises([
        ...exercises.slice(0, i),
        {
          ...exercises[i],
          sets: [
            ...exercises[i].sets,
            {
              id: uuidv4(),
              weight: '',
              reps: '',
            },
          ],
        },
        ...exercises.slice(i + 1),
      ])
    } else {
      console.log('Hmmmm, no exercise found')
    }
  }

  const updateExercise = (exerciseId, prop) => (e) => {
    const i = exercises.findIndex((exercise) => exercise.id === exerciseId)

    if (i !== -1) {
      setExercises([
        ...exercises.slice(0, i),
        {
          ...exercises[i],
          [prop]: e.target.value,
        },
        ...exercises.slice(i + 1),
      ])
    }
  }

  const updateSet = (exerciseId, setId, prop) => (e) => {
    const exerciseI = exercises.findIndex(
      (exercise) => exercise.id === exerciseId,
    )

    if (exerciseI !== -1) {
      const selectedExercise = exercises[exerciseI]
      const setI = selectedExercise.sets.findIndex((set) => set.id === setId)

      if (setI !== -1) {
        const selectedSet = selectedExercise.sets[setI]

        setExercises([
          ...exercises.slice(0, exerciseI),
          {
            ...selectedExercise,
            sets: [
              ...selectedExercise.sets.slice(0, setI),
              {
                ...selectedSet,
                [prop]: e.target.value,
              },
              ...selectedExercise.sets.slice(setI + 1),
            ],
          },
          ...exercises.slice(exerciseI + 1),
        ])
      }
    }
  }

  const completeWorkout = (e) => {
    e.preventDefault()
    console.log({
      ...workout,
      exercises,
    })
  }

  return (
    <div>
      <form className="grid grid-cols-1 gap-4">
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

        {exercises.map((exercise, i) => (
          <div key={i} className="grid grid-cols-1 gap-4">
            <div className="border-t-4" />
            <strong className="flex gap-4">{exercise.name}</strong>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                onChange={updateExercise(exercise.id, 'tempo')}
                placeholder="Tempo"
                value={exercise.tempo}
              />
              <TextInput
                onChange={updateExercise(exercise.id, 'rest')}
                placeholder="Rest"
                value={exercise.rest}
              />
            </div>

            <div className="border-b-2" />

            {exercise.sets.map((set) => (
              <div className="grid grid-cols-2 gap-4" key={set.id}>
                <TextInput
                  onChange={updateSet(exercise.id, set.id, 'weight')}
                  placeholder="Weight"
                  value={set.weight}
                />
                <TextInput
                  onChange={updateSet(exercise.id, set.id, 'reps')}
                  placeholder="Reps"
                  value={set.reps}
                />
              </div>
            ))}

            <div>
              <Button
                color="gray"
                onClick={() => {
                  addSet(exercise.id)
                }}
              >
                + Set
              </Button>
            </div>
          </div>
        ))}

        {exercises.length > 0 && <div className="border-t-4" />}

        <Select
          placeholder="+ Exercise"
          onChange={addExercise}
          options={exerciseOptions}
          inputId="addExercise"
          id="addExercise"
          instanceId="addExercise"
          value={[]}
        />

        <Button color="success" type="submit" onClick={completeWorkout}>
          Complete Workout
        </Button>
      </form>
    </div>
  )
}

export default WorkoutLog
