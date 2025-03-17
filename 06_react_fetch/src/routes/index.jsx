import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PostList from '../pages/PostList';
import CreatePost from '../pages/CreatePost';
import PostDetail from '../pages/PostDetail';
import EditPost from '../pages/EditPost';
import FilmNews from '../pages/FilmNews';

const AppRoutes = () => (
  <BrowserRouter>
    <nav style={{ 
  padding: '1rem', 
  background: '#f0f0f0',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000
}}>
      <Link to="/" style={{ marginRight: '1rem' }}>文章列表</Link>
      <Link to="/create" style={{ marginRight: '1rem' }}>新增文章</Link>
      <Link to="/film-news">影视资讯</Link>
    </nav>
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/film-news" element={<FilmNews />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;