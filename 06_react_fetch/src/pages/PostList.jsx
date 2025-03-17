import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('获取文章列表失败:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('删除文章失败:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>文章列表</h2>
      <div style={{ display: 'grid', gap: '16px' }}>
        {posts.map(post => (
          <div 
            key={post.id}
            style={{
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              backgroundColor: '#fff',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
              }
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link 
                to={`/posts/${post.id}`} 
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#1a73e8',
                  textDecoration: 'none',
                  ':hover': { textDecoration: 'underline' }
                }}
              >
                {post.title}
              </Link>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  to={`/edit/${post.id}`}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: '#333',
                    ':hover': { backgroundColor: '#e0e0e0' }
                  }}
                >
                  编辑
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    ':hover': { backgroundColor: '#cc0000' }
                  }}
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;