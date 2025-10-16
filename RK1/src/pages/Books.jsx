import React, { useState, useEffect, useCallback } from 'react'
import BookCard from '../components/BookCard'

function Books() {
  const [books, setBooks] = useState(() =>{
    const saved = localStorage.getItem('books')
    return saved ? JSON.parse(saved): []
  })
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(()=>{
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  const handleDelete = useCallback(
    (id) => {
      setBooks((prev) => prev.filter((book)=> book.id !== id))
    }, [setBooks]
  )

  const filteredBooks = books.filter((book) =>{
    const matchesTitle = book.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = filter === 'all'|| book.genre === filter
    return matchesTitle && matchesGenre
  })
  return (
    <div>
      <input type="text" placeholder='search title' value={search} onChange={(e) => setSearch.target.value} />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value='all'>All</option>
        <option value='fiction'>Fiction</option>
        <option value='nonifiction'>Nonifiction</option>
        <option value='tech'>Tech</option>
      </select>
      {filteredBooks.length > 0 ? (filteredBooks.map((book)=>(
        <BookCard key = {book.id} book={book}></BookCard>
      ))): (<p>No Books found</p>)}
    </div>
    
  )
}

export default Books
