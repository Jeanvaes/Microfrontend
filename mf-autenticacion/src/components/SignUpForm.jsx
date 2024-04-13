import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Forms.css'; 


const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3010/users/register', {
        username,
        email,
        password
      });

      console.log('Register response:', response.data);
      // Success logic here

    } catch (error) {
      console.error('Register error:', error.response.data);
    }
  };

  return (
    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Usuario</label>
        </div>
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
          <button type="submit">Regístrate</button>
          <p className="nav-link">¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
        </center>
      </form>
    </div>
  );
};

export default SignUpForm;
