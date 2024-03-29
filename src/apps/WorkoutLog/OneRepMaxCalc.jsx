import React from 'react'
import TextInput from '@componentsReact/TextInput'

const reducer = (state, update) => {
  const nextState = { ...state, ...update }
  const { weight, reps } = nextState

  const brzycki = Math.round(weight * (36 / (37 - reps)))
  const epley = Math.round(weight * (1 + 0.0333 * reps))
  const lombardi = Math.round(weight * Math.pow(reps, 0.1))
  const oconner = Math.round(weight * (1 + 0.025 * reps))

  nextState.oneRepMax = lombardi
  nextState.method = 'lombardi'
  nextState.brzycki = brzycki
  nextState.epley = epley
  nextState.lombardi = lombardi
  nextState.oconner = oconner

  return nextState
}

const percents = [1.0, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5]

const OneRepMaxCalc = () => {
  const [state, setState] = React.useReducer(reducer, {
    weight: 0,
    reps: 0,
  })

  return (
    <div>
      <h2>
        1RM Calc <small>(lombardi method)</small>
      </h2>
      <div className="flex gap-4">
        <TextInput
          label="Weight"
          placeholder="Weight"
          value={state.weight}
          onChange={(e) => {
            setState({ weight: e.target.value })
          }}
        />
        <TextInput
          label="Reps"
          placeholder="Reps"
          value={state.reps}
          onChange={(e) => {
            setState({ reps: e.target.value })
          }}
        />
      </div>
      {/* eslint-disable-next-line prettier/prettier */}
      {(!!state.weight && !!state.reps && !!state.oneRepMax) && (
        <table>
          <thead>
            <tr>
              <th>Percent</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {percents.map((val) => (
              <tr key={`orm-${val}`}>
                <td>{Math.round(val * 100)}%</td>
                <td>{Math.round(val * state.oneRepMax)}lbs</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <pre>
        {/* eslint-disable-next-line prettier/prettier */}
        Strength:  95% 1-3 reps <br />
        {/* eslint-disable-next-line prettier/prettier */}
        Power:     90% 3-4 reps 2-3 min rest
        <br />
        {/* eslint-disable-next-line prettier/prettier */}
        Muscle:    80% 8-12 reps 60s rest
        <br />
        Endurance: 70% 12-20 reps
        <br />
        Exp Power: 50% 3-4 reps
        <br />
      </pre>
    </div>
  )
}

export default OneRepMaxCalc
