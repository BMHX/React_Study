import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css";

const users = [
  { username: "admin", password: "123456" },
  { username: "qinzhijie", password: "qinzhijie" },
];

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const validUser = users.find((user) => user.username === username && user.password === password);
    if (validUser) {
      setUser(username);
      navigate("/");
    } else {
      setError("用户名或密码错误");
    }
  };

  return (
    <div className="login-container">
      <h2>用户登录</h2>
      <form onSubmit={handleLogin}>
        <label>用户名</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>密码</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {error && <p className="error">{error}</p>}

        <button type="submit">登录</button>
      </form>
    </div>
  );
};

export default Login;
