// src/pages/Profile.jsx
import { Outlet, NavLink } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <h2>Profile page</h2>
      <nav>
        <NavLink to="fans" className={({ isActive }) => (isActive ? "active" : "nav-link")}>
          我的粉丝
        </NavLink>
        <NavLink to="follow" className={({ isActive }) => (isActive ? "active" : "nav-link")}>
          我的关注
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Profile;
