import React from 'react'
import exercises from './exercises'
import FeatureFlag from './FeatureFlag'
import OneRepMaxCalc from './OneRepMaxCalc'
import WorkoutLogBook from './WorkoutLogBook'
import OptLog from './OptLog'
import Timer from './Timer'

const WorkoutLog = () => {
  return (
    <>
      <FeatureFlag name="timer">
        <Timer />
      </FeatureFlag>
      <FeatureFlag name="workoutLog">
        <WorkoutLogBook exercises={exercises} />
      </FeatureFlag>
      <FeatureFlag name="optLog">
        <OptLog exercises={exercises} />
      </FeatureFlag>
      <div className="mt-4 mb-4 border-b-2"></div>
      <FeatureFlag name="oneRepMaxCalc">
        <OneRepMaxCalc />
      </FeatureFlag>
    </>
  )
}

export default WorkoutLog
