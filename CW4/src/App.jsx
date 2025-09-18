import { useState, useRef,useCallback } from 'react'
import './App.css'

function App() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const nameRef = useRef(null)

  const showData = useCallback(() =>{
    alert(`Imya: ${firstName}, familiya: ${lastName}`)
  }, [firstName, lastName])
  return (
    <>
      <div>
        <label>imya:{''}
          <input type='text' value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
        </label>
      </div>
      <div>
        <label>familiya:{''}
          <input type='text' ref={nameRef} value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
        </label>
      </div>
      <div>
        <button onClick={() => nameRef.current.focus()}>
          focus familiya
        </button>
      </div>
      <div>
        <button onClick={showData}>
          pokazat dannie
        </button>
      </div>
    </>
  )
}

export default App
