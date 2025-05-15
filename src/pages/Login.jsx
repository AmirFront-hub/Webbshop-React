import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get auth methods from store
  const { login, isLoggedIn } = useAuthStore();
  
  // Get the redirect path from location state or default to admin
  const from = location.state?.from?.pathname || '/admin';
  
  // If already logged in, redirect
  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, from]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!username || !password) {
      setError('Användarnamn och lösenord krävs');
      return;
    }
    
    // Try to login
    const success = login(username, password);
    
    if (success) {
      // Navigate to the protected page after successful login
      navigate(from, { replace: true });
    } else {
      setError('Felaktigt användarnamn eller lösenord');
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Logga in för att fortsätta</h2>
        
        {error && <div className="login-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Användarnamn</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ange användarnamn"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ange lösenord"
            />
          </div>
          
          <button type="submit" className="login-button">
            Logga in
          </button>
        </form>
        
        <div className="login-info">
          <p>För demo: använd "admin" som användarnamn och "admin123" som lösenord.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;