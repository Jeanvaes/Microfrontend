import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

const App = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="App">
      {showLoginForm ? <LoginForm /> : <SignUpForm />}
      <button onClick={toggleForm}>
        {showLoginForm ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia Sesión'}
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));