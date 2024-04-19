import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';

const App = () => {
  const [selectedMicrofrontend, setSelectedMicrofrontend] = useState(null);

  const AdminPanel = React.lazy(() => import("mf_administrador/admin"));
  const LoginForm = React.lazy(() => import("mf_autenticacion/Home"));


  return (
    <Router>
      <div>
        <nav>
          <h1>Panchito HyperMarket</h1>
          <button onClick={() => setSelectedMicrofrontend("AdminPanel")}>Admin Panel</button>
          <button onClick={() => setSelectedMicrofrontend("LoginForm")}>Login</button>
        </nav>
  
        <Suspense fallback={<div>Loading...</div>}>
          {selectedMicrofrontend === "AdminPanel" && <AdminPanel />}
          {selectedMicrofrontend === "LoginForm" && <LoginForm />}
        </Suspense>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));