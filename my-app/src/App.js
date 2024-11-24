import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Profile from './components/Profile';
import Settings from './components/Settings';
import MarineLife from './components/MarineLife'; 
import PostDetail from './components/PostDetail';
import EditProfile from './components/EditProfile';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state

  const ProtectedRoute = ({ element }) =>
    isAuthenticated ? element : <Navigate to="/login" replace />;

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={
                  <div className="main-app">
                    <Sidebar />
                    <Home />
                  </div>
                }
              />
            }
          />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/edit-profile" element={<ProtectedRoute element={<EditProfile />} />} />
          <Route path="/marine-life" element={<ProtectedRoute element={<MarineLife />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
          <Route path="/post/:id" element={<ProtectedRoute element={<PostDetail />} />} />
        </Routes>
        <footer className="footer">© 2024 MarineSpotter. All rights reserved.</footer>
      </div>
    </Router>
  );
}

export default App;
