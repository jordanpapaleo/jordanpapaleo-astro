// TODO: This needs to come from somewhere and combine flags, permissions, whatevs
const features = {
  oneRepMaxCalc: { enabled: true, createdAt: '03/15/2023' },
  workoutLog: { enabled: true, createdAt: '03/15/2023' },
}

const FeatureFlag = ({ name, children }) => {
  return features[name]?.enabled === true ? children : null
}

export default FeatureFlag
