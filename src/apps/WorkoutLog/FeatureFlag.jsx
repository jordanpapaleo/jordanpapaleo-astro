import React from 'react'

const features = {
  oneRepMaxCalc: { enabled: false, createdAt: '03/15/2023' },
  optLog: { enabled: true, createdAt: '03/15/2023' },
  workoutLog: { enabled: true, createdAt: '03/15/2023' },
  timer: { enabled: false, createdAt: '03/24/2023' },
}

export const FeatureFlagContext = React.createContext({})
export const FeatureFlagDispatchContext = React.createContext(null)

const reducer = (state, update) => ({ ...state, ...update })

export const FeatureFlagProvider = ({ children }) => {
  const [state, dispatchState] = React.useReducer(reducer, features)
  return (
    <FeatureFlagContext.Provider value={state}>
      <FeatureFlagDispatchContext.Provider value={dispatchState}>
        {children}
      </FeatureFlagDispatchContext.Provider>
    </FeatureFlagContext.Provider>
  )
}

const useFeatureFlags = (name) => React.useContext(FeatureFlagContext)

const FeatureFlag = ({ name, children }) => {
  const flags = useFeatureFlags()
  return flags[name]?.enabled === false ? null : children
}

export default FeatureFlag
