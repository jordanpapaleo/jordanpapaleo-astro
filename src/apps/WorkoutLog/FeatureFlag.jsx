// TODO: This needs to come from somewhere and combine flags, permissions, whatevs
const features = {
  oneRepMaxCalc: { enabled: false, createdAt: '03/15/2023' },
  optLog: { enabled: false, createdAt: '03/15/2023' },
  workoutLog: { enabled: false, createdAt: '03/15/2023' },
  timer: { enabled: true, createdAt: '03/24/2023' },
}

const FeatureFlag = ({ name, children }) => {
  return features[name]?.enabled === true ? children : null
}

export default FeatureFlag
