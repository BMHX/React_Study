import React, { useState } from 'react';

const RegistForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, email });  // 将数据传递给父组件
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        姓名:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        邮箱:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">提交</button>
    </form>
  );
};

export default RegistForm;
