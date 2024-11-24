import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RLoginPage.css';


const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login validation (replace with API logic)
    if (username === 'testuser' && password === 'password123') {
      onLogin(); // Update auth state in App
      navigate('/'); // Redirect to home page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="background-image"></div>
      <div className="login-box">
        <div className="logo-container">
          <img src="/assets/logo.png" alt="Logo" className="logo-image" />
          <h2 className="logo-text">MarineSpotter</h2>
          <p className="slogan">Dive In: Your Ocean Adventures Await!</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="register-link">
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
