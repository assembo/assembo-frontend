import React, {useState, useEffect} from 'react'
// import ReactDOM from 'react-dom'

const Counter = () => {
  const init = new Date()
  const [date, setDate] = useState(init)

  const tick = () => {
    setDate(new Date())
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)
    return () => {
      clearInterval(timerID)
    }
  }, [])

  return date.toLocaleTimeString()
}

export default Counter;