import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('获取文章失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/posts/${id}`, post);
      navigate('/');
    } catch (error) {
      console.error('更新失败:', error);
    }
  };

  if (loading) return <div>加载中...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' , width: "600px"}}>
      <h2 style={{ marginBottom: '24px' }}>编辑文章</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            placeholder="标题"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <textarea
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            style={{
              width: '100%',
              height: '200px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            placeholder="内容"
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#1a73e8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          保存修改
        </button>
      </form>
    </div>
  );
};

export default EditPost;