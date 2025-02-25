import React from 'react';
import BookItem from './BookItem';

const BookList = ({ books, deleteBook, startEdit }) => {
  return (
    <div className="book-list">
      <h2>图书列表</h2>
      <ul>
        {books.map((book) => (
          <BookItem 
            key={book.id} 
            book={book} 
            deleteBook={deleteBook} 
            startEdit={startEdit} 
          />
        ))}
      </ul>
    </div>
  );
};

export default BookList;
