import clsx from 'clsx'
import React from 'react'
import TextInput from '@componentsReact/TextInput'
import RadioGroup from '@componentsReact/RadioGroup'
import Button from '@componentsReact/Button'
import { v4 as uuidv4 } from 'uuid'
import format from 'date-fns/format'

const customFetch = async (url, options = {}) => {
  const baseUrl = 'https://api.jsonbin.io/v3/b'
  const headers = await new Headers({
    'Content-Type': 'application/json',
    'X-Master-Key':
      '$2b$10$55J3oFkvZPXLu7ULHrVf0OC4LXq0Iuu3raq8TXcbK.oKa9h0GTSy6',
  })

  return fetch(`${baseUrl}/${url}`, {
    headers,
    ...options,
  })
    .then((res) => res.json())
    .then(({ record }) => record)
    .catch((err) => {
      console.log(err)
    })
}

const Api = {
  get: (url) => customFetch(url, { method: 'GET' }),
  post: (url, data) =>
    customFetch(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url, data) =>
    customFetch(url, { method: 'PUT', body: JSON.stringify(data) }),
}

const getGki = (glucose, ketones) => {
  const gki = Math.round((glucose / 18 / ketones) * 100) / 100
  let status = 'no ketosis'

  if (gki < 1) {
    status = 'therapeutic'
  } else if (gki < 3) {
    status = 'optimal'
  } else if (gki < 9) {
    status = 'nutritional'
  }

  return { gki, status }
}

const GkiApp = (props) => {
  const path = '637e664b2b3499323b093247'
  const [results, setResults] = React.useState([])
  const [glucose, setGlucose] = React.useState('')
  const [ketones, setKetones] = React.useState('')
  const [user, setUser] = React.useState('Jordan')

  async function getData() {
    const data = await Api.get(path)
    setResults(data)
  }

  React.useEffect(() => {
    getData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (glucose && ketones) {
      const result = {
        user,
        glucose: +glucose,
        ketones: +ketones,
        date: new Date().toISOString(),
        id: uuidv4(),
      }

      const updatedResults = [result, ...results]

      Api.put(path, updatedResults)
      setResults(updatedResults)
      setKetones('')
      setGlucose('')
    }
  }

  return (
    <div>
      <RadioGroup
        id="User"
        label="User"
        onChange={(e) => {
          setUser(e.target.value)
        }}
        value={user}
        options={[
          { name: 'Jordan', value: 'Jordan' },
          { name: 'Andrea', value: 'Andrea' },
        ]}
      />
      <form onSubmit={handleSubmit} className="flex items-end gap-4">
        <TextInput
          label="Glucose"
          value={glucose}
          onChange={(e) => {
            setGlucose(e.target.value)
          }}
        />
        <TextInput
          label="Ketones"
          value={ketones}
          onChange={(e) => {
            setKetones(e.target.value)
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
      <table>
        <thead>
          <tr>
            <th className="pl-2">Name</th>
            <th className="pl-2">Date</th>
            <th className="pl-2">Glucose</th>
            <th className="pl-2">Ketones</th>
            <th className="pl-2">GKI</th>
          </tr>
        </thead>
        <tbody>
          {results
            .filter((r) => r.user === user)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .reverse()
            .map(({ id, date, user, ketones, glucose }) => {
              const { gki, status } = getGki(glucose, ketones)
              return (
                <tr
                  key={id}
                  className={clsx(
                    'bg-status-error text-white',
                    status === 'therapeutic' && 'bg-status-warn',
                    status === 'optimal' && 'bg-status-success',
                    status === 'nutritional' && 'bg-status-info',
                  )}
                >
                  <td style={{ paddingLeft: 10 }}>{user}</td>
                  <td className="pl-2">
                    {format(new Date(date), 'MM/dd/yyyy')}
                  </td>
                  <td className="pl-2">{glucose}</td>
                  <td className="pl-2">{ketones}</td>
                  <td className="pl-2">{gki}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default GkiApp
