import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Forms.css'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3010/users/login', {
        email,
        password
      });

      console.log('Login response:', response.data);
      //entro
    } catch (error) {
      console.error('Login error:', error.response.data);
    }
  };

  return (
    <div className="login-box"> 
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
          <p className="nav-link">¿No tienes una cuenta? <Link to="/signup">Regístrate</Link></p>
        </center>
      </form>
    </div>
  );
};

export default LoginForm;
