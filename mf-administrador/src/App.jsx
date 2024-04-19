import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import './AdminPanel.css';
import AdminPanel from './AdminPanel';

function App() {
  return (
    <div className="App">
      <AdminPanel />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("app"));
