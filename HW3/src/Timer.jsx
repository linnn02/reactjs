import { useState, useEffect } from 'react'
import './App.css'

function Timer() {
  const [time, setTime] = useState(null)
  const [inputValue, setInputValue] = useState('');
  const [run, setRun] = useState(false)

  useEffect(() =>{
    let timerId
    if(run && time > 0){
      timerId = setInterval(() => {
        setTime((prev) => prev - 1)
      }, 1000)
    }
    if(time === 0){
      setRun(false)
      alert('vremya vishlo')
    }
    return () => clearInterval(timerId)
    
  }, [run, time])
  const start = () =>{
      if(inputValue>0){
        setTime(Number(inputValue))
        setRun(true)
      }
    }
  return (
      <div>
        <h1>Timer</h1>
        <input type='number' placeholder='vvedite sec' value={inputValue} onChange={(e)=> setInputValue(e.target.value)}/>
        <button onClick={start}>Start</button>
        {time !== null && (
          <h2>Ostalos: {time} sec</h2>
        )}
      </div>

  )
}

export default Timer
