import React from 'react';

const BookItem = ({ book, deleteBook, startEdit }) => {
  return (
    <li className="book-item">
      <span>{book.title} - {book.author} ({book.year})</span>
      <button onClick={() => startEdit(book)}>编辑</button>
      <button onClick={() => deleteBook(book.id)}>删除</button>
    </li>
  );
};

export default BookItem;
