import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Books from "./pages/Books"
import AddBook from "./pages/AddBook"


function App() {

  return (

      <div>
        <header>
          <Link to='/books'>Books</Link>
          <Link to='/add-book'>Add Book</Link>
        </header>
        <Routes>
          <Route path='/books' element={<Books />} />
          <Route path='/add-book' element={<AddBook />} />
          <Route path='*' element={<h1>404 page not found</h1>} />
        </Routes>
      </div>

  )
}

export default App
