import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CounterUseState from './CounterUseState';
import TodoList from './TodoList';
import UserProfile from './UserProfile';
import UpdateUser from './UpdateUser';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="neumorphic-nav">
        <Link to="/" className="nav-brand">React状态管理</Link>
        <div className="nav-links">
          <Link to="/counter" className="neumorphic-btn">计数器</Link>
          <Link to="/todos" className="neumorphic-btn">待办事项</Link>
          <Link to="/profile" className="neumorphic-btn">用户资料</Link>
        </div>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<CounterUseState />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/update" element={<UpdateUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className="glass-card welcome-card">
      <h2>欢迎使用React状态管理示例</h2>
      <p>请通过上方导航栏选择要演示的功能</p>
    </div>
  );
}

export default App;
