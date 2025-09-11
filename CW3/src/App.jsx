import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task])
      setTask("")
    }
  }
  useEffect(() => {
      if (tasks.length > 10){
        alert('U vas mnogo zadach')
      }
    }, [tasks.length])

  return (
    <div>
      <h1>Spisok zadach</h1>
      <input
      type='text'
      value={task}
      onChange={(e)=> setTask(e.target.value)}
      placeholder='vvedite zadachu'
      />
      <button onClick={addTask}>dobavit' zadachu</button>
      <ul>
        {tasks.map((task, index)=>(
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
