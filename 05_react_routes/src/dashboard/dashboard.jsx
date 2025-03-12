import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import "./Dashboard.css"; // 引入样式

const Dashboard = () => {
  const location = useLocation();
  const username = location.state?.username || ""; // 默认值

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome: <strong>{username}</strong></p>

      {/* 二级导航 */}
      <nav className="dashboard-nav">
        <NavLink to="profile" className={({ isActive }) => (isActive ? "active" : "nav-link")}>
          Profile
        </NavLink>
        <NavLink to="setting" className={({ isActive }) => (isActive ? "active" : "nav-link")}>
          Setting
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default Dashboard;
