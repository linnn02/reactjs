import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function UserCard({name, email}){
  return(
    <div className='card'>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  )
}
function Button({text}){
  return <button>{text}</button>
}
function App() {
  const users = [
  {id: 1, name: 'asd dsa', email: 'asd@asd.asd'},
  {id: 2, name: 'fgh hgf', email: 'fgh@asd.asd'},
  {id: 3, name: 'cvb bvc', email: 'bvc@asd.asd'}
  ];
  return(
    <div className='app'>
      <h1>User List</h1>
      <div className='list'>
        {users.map(user => (
          <UserCard key={user.id} name={user.name} email={user.email}/>
        ))}
      </div>
      <Button text='Click' />
    </div>
  )
}

export default App
