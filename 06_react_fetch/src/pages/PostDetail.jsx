import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误：{error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>{post.title}</h2>
      <p style={{ marginTop: '20px', lineHeight: '1.6' }}>{post.body}</p>
      <Link 
        to="/" 
        style={{ 
          display: 'inline-block',
          marginTop: '20px',
          color: '#007bff',
          textDecoration: 'none'
        }}
      >
        返回列表
      </Link>
    </div>
  );
};

export default PostDetail;