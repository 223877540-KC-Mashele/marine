import React, { useState } from 'react';
import './RLoginPage.css';


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
      setMessage('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    console.log('Registration Data:', formData);
    setMessage('Registration successful!');
  };

  return (
    <div className="login-page"> {/* Reuse the login-page class */}
      <div className="background-image"></div>

      <div className="login-box"> {/* Reuse the login-box class */}
        <div className="logo-container">
          <img src="/assets/logo.png" alt="Logo" className="logo-image" />
          <h2 className="logo-text">MarineSpotter</h2>
          <p className="slogan">Dive In: Your Ocean Adventures Await!</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">confirm password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />
          </div>
          <button type="submit" className="login-btn">Register</button>
        </form>

        <div className="register-link">
          <p>Already have an account? <a href="/">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
