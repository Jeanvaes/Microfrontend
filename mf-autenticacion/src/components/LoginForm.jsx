import React, { useState } from 'react';
import axios from 'axios';
import './Forms.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3009/users/login', {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        onLogin(true); 
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-box">
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Contraseña</label>
        </div>
        <center>
          <button type="submit">Inicia Sesión</button>
        </center>
      </form>
    </div>
  );
};

export default LoginForm;
