import { useState, useCallback, useRef, memo } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const TaskItem = memo(function TaskItem({task, onToggle, onDelete}){
  return(
    <li className={`taskitem ${task.completed ? 'completed' : ''}`}>
      <label className='tasklabel'>
        <input type='checkbox' checked={task.completed} onChange={()=>onToggle(task.id)}/>
        <span>{task.text}</span>
      </label>
      <button className='btndelete' onClick={()=> onDelete(task.id)}>
        delete
      </button>
    </li>
  )
})

const TaskList = memo(function TaskList({tasks, onToggle, onDelete}){
  if(!tasks.length){
    return <p>zadach net dobavte zadachu</p>
  }
  return(
    <ul>
      {tasks.map((t) => (<TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete}/>))}
    </ul>
  )
})

function App() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const addTask = useCallback(() => {
    const value = text.trim()
    if(!value)return
    setTasks((prev) => [...prev, {id:prev.length+1, text:value, completed:false},] )
    setText('')
    inputRef.current?.focus()
  }, [text])

  const toggleTask = useCallback((id)=>{
    setTasks((prev)=> prev.map((t) => (t.id === id ? {...t, completed: !t.completed} :t )))
  }, [])

  const deleteTask = useCallback((id)=> {
    setTasks((prev)=>prev.filter((t) => t.id !==id))
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    addTask()
  }

  const totalCount = tasks.length
  const doneCount = tasks.filter((t) => t.completed).length
  return (
    <>
      <div>
        <h1>Spisok</h1>
        <form onSubmit={onSubmit}>
          <input ref={inputRef} type='text' value={text} placeholder='Novaya zadacha' onChange={(e) => setText(e.target.value)}/>
          <button type='submit'>dobavit zadachu</button>
        </form>
      </div>
      <p>
        vsego: <b>{totalCount}</b> / vipolneno <b>{doneCount}</b>
      </p>
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />

    </>
  )
}

export default App
