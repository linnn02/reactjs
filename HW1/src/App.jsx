import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function Header() {
  return (
    <header>
        <h1>Headeeer</h1>
    </header>
  )
}
function Footer() {
  return (
      <footer>
        <p>fooooooteeeerrrr (c)2025</p>
      </footer>
  )
}
function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Hello, React!</h2>
      </main>
      <Footer />
    </div>
  )
}

export default App
