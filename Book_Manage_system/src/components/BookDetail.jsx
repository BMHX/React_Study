import React, { useState } from 'react';

const BookDetail = ({ book, editBook }) => {
  const [newTitle, setNewTitle] = useState(book.title);
  const [newAuthor, setNewAuthor] = useState(book.author);
  const [newYear, setNewYear] = useState(book.year);

  const handleSave = () => {
    const updatedBook = { ...book, title: newTitle, author: newAuthor, year: newYear };
    editBook(book.id, updatedBook);
  };

  return (
    <div className="book-detail">
      <h2>图书详情</h2>
      <div>
        <label>标题：</label>
        <input 
          type="text" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
        />
      </div>
      <div>
        <label>作者：</label>
        <input 
          type="text" 
          value={newAuthor} 
          onChange={(e) => setNewAuthor(e.target.value)} 
        />
      </div>
      <div>
        <label>出版年份：</label>
        <input 
          type="number" 
          value={newYear} 
          onChange={(e) => setNewYear(e.target.value)} 
        />
      </div>
      <button onClick={handleSave}>保存更改</button>
    </div>
  );
};

export default BookDetail;
