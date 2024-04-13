import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn, onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <div className="home">
      {isLoggedIn ? (
        <div>
          <h2>Loggeado</h2>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          <h2>No Loggeado</h2>
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
