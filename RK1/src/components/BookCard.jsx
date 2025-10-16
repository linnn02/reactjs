import React from 'react'

const BookCard = React.memo(({book, onDelete}) => {

  return (
    <div>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong>{book.author}</p>
      <p><strong>Genre:</strong>{book.genre}</p>
      <p><strong>Rating:</strong>{book.rating}</p>
      <button onClick={() => onDelete(book.id)}>Delete</button>
    </div>
  )
})

export default BookCard
