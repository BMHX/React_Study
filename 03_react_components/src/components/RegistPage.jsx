import React, { useState } from 'react';
import RegistForm from './RegistForm';

const RegistPage = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);  // 保存提交的数据
  };

  return (
    <div>
      <h1>用户注册</h1>
      <RegistForm onSubmit={handleFormSubmit} />
      <div>
        {formData && (
          <div>
            <h2>提交数据:</h2>
            <p>姓名: {formData.name}</p>
            <p>邮箱: {formData.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistPage;
