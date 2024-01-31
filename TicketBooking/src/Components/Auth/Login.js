
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./../../assets/css/auth.css";

const Login = ({ setHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsername(storedUser.username);
      setPassword(storedUser.password);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      alert('Login successful');
      setHome(true);
      navigate("/home");
    } else {
      alert('Invalid credentials');
      setUsername('');
      setPassword('');
    }
  };

  return (

    <div className="auth-container">
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
      </label>
      <button type="submit" className="auth-button">Login</button>
    </form>
    <a href="/signup" className="auth-link">Sign up</a>
  </div>
  );
};

export default Login;
