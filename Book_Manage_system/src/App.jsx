import React, { useState } from 'react';
import './App.css';
import BookInput from './components/BookInput';
import BookList from './components/BookList';

const App = () => {
  const [books, setBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  // 添加新图书
  const addBook = (book) => {
    setBooks([...books, book]);
  };

  // 删除图书
  const deleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  // 设置编辑图书
  const startEdit = (book) => {
    setIsEditing(true);
    setCurrentBook(book);
  };

  // 更新图书信息
  const editBook = (updatedBook) => {
    setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
    setIsEditing(false);
    setCurrentBook(null);
  };

  return (
    <div className="app">
      <h1>图书管理系统</h1>
      <BookInput addBook={addBook} isEditing={isEditing} currentBook={currentBook} editBook={editBook} />
      <BookList books={books} deleteBook={deleteBook} startEdit={startEdit} />
    </div>
  );
};

export default App;
