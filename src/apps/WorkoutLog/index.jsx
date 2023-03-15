import React from 'react'
import exercises from './exercises'
import FeatureFlag from './FeatureFlag'
import OneRepMaxCalc from './OneRepMaxCalc'
import WorkoutLogBook from './WorkoutLogBook'

const WorkoutLog = () => {
  return (
    <>
      <FeatureFlag name="workoutLog">
        <WorkoutLogBook exercises={exercises} />
      </FeatureFlag>
      <div className="mt-4 mb-4 border-b-2"></div>
      <FeatureFlag name="oneRepMaxCalc">
        <OneRepMaxCalc />
      </FeatureFlag>
    </>
  )
}

export default WorkoutLog
