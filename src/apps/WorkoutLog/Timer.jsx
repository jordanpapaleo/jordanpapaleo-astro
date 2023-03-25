import React from 'react'

const intervals = [
  { name: 'work', duration: 10 },
  { name: 'rest', duration: 20 },
]

const repeat = 6

const Timer = (duration = 10000) => {
  const [isActive, setIsActive] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(true)
  const [time, setTime] = React.useState(duration)

  const startTimer = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  React.useEffect(() => {
    let interval = null

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time > 0) {
            return time - 1000
          } else {
            clearInterval(interval)
            return 0
          }
        })
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isActive, isPaused])

  React.useEffect(() => {
    startTimer()
  }, [])

  return <div>{time / 1000}</div>
}

export default Timer
