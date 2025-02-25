import React, { useState, useEffect } from 'react';

const BookInput = ({ addBook, isEditing, currentBook, editBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  // 如果是编辑模式，加载现有图书信息
  useEffect(() => {
    if (isEditing && currentBook) {
      setTitle(currentBook.title);
      setAuthor(currentBook.author);
      setYear(currentBook.year);
    }
  }, [isEditing, currentBook]);

  // 提交表单，添加或编辑图书
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // 编辑现有图书
      editBook({ ...currentBook, title, author, year });
    } else {
      // 添加新图书
      const newBook = { id: Date.now(), title, author, year };
      addBook(newBook);
    }
    setTitle('');
    setAuthor('');
    setYear('');
  };

  return (
    <div className="book-input">
      <h2>{isEditing ? '编辑图书' : '添加新图书'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="图书标题" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="作者" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="出版年份" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
        />
        <button type="submit">{isEditing ? '保存更改' : '添加图书'}</button>
      </form>
    </div>
  );
};

export default BookInput;
