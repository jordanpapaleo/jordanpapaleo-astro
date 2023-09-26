import React from 'react'
import {
  resistanceExercise,
  skillExercises,
  flexibilityExercises,
} from './exercises'
import FeatureFlag, { FeatureFlagProvider } from './FeatureFlag'
import OneRepMaxCalc from './OneRepMaxCalc'
import WorkoutLogBook from './WorkoutLogBook'
import OptLog from './OptLog'
import Timer from './Timer'

const WorkoutLog = () => {
  const [stuff, setStuff] = React.useState({})

  React.useEffect(() => {
    console.log('Stuff')
    console.log(stuff)
  }, [stuff])

  return (
    <FeatureFlagProvider>
      <FeatureFlag name="timer">
        <Timer />
      </FeatureFlag>
      <FeatureFlag name="workoutLog">
        <WorkoutLogBook
          exerciseDb={resistanceExercise}
          workout={stuff.exercises}
        />
      </FeatureFlag>
      <FeatureFlag name="optLog">
        <OptLog
          skillDb={skillExercises}
          resistanceDb={resistanceExercise}
          flexibilityDb={flexibilityExercises}
          save={setStuff}
        />
      </FeatureFlag>
      <div className="mt-4 mb-4 border-b-2"></div>
      <FeatureFlag name="oneRepMaxCalc">
        <OneRepMaxCalc />
      </FeatureFlag>
    </FeatureFlagProvider>
  )
}

export default WorkoutLog
