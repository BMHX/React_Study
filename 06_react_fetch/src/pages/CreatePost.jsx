import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/posts', {
        title,
        body
      });
      // 清空表单并跳转回列表
      setTitle('');
      setBody('');
      navigate('/');
    } catch (error) {
      console.error('提交文章失败:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>新增文章</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>标题：</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>内容：</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: '100%', height: '150px', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          提交文章
        </button>
      </form>
    </div>
  );
};

export default CreatePost;