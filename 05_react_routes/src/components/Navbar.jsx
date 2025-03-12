import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "nav-link")}>
          Blog
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "nav-link")}>
          About
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "nav-link")}>
          dashboard
        </NavLink>
      </div>

      <div className="navbar-right">
        {user ? (
          <span className="user-info">欢迎, {user}</span>
        ) : (
          <NavLink to="/login" className="nav-link">
            login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
