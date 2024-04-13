import React from 'react';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

const App = () => {
  const handleLogin = (data) => {
    console.log('Login data:', data);
  };

  const handleRegister = (data) => {
    console.log('Register data:', data);
  };

  return (
    <div className="App">
      <LoginForm onSubmit={handleLogin} />
      <SignUpForm onSubmit={handleRegister} />
    </div>
  );
};

export default App;