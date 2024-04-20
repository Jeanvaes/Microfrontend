import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import './index.css';
import './Table.css';

const App = () => {
  const [selectedMicrofrontend, setSelectedMicrofrontend] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState({});
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const AdminPanel = React.lazy(() => import("mf_administrador/admin"));
  const LoginForm = React.lazy(() => import("mf_autenticacion/Home"));

  useEffect(() => {
    fetchProducts();
  }, [selectedMicrofrontend]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/producto/todos');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleBuy = async (id) => {
    try {
      if (!isLoggedIn) {
        alert('Login es requerido para comprar productos.');
        return;
      }
  
      const quantity = selectedQuantity[id];
      const product = products.find(product => product.id === id);
      if (product && quantity > product.cantidad) {
        alert('No hay suficiente stock para comprar esa cantidad de producto.');
        return;
      }
      await axios.put(`http://localhost:8080/api/producto/comprar?id=${id}&cantidad=${quantity}`);
      fetchProducts();
    } catch (error) {
      console.error('Error buying product:', error);
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <h1 onClick={() => window.location.reload()}>Panchito HyperMarket</h1>
          <button onClick={() => setSelectedMicrofrontend("AdminPanel")}>Admin Panel</button>
          <button onClick={() => setSelectedMicrofrontend("LoginForm")}>Login</button>
        </nav>

        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Comprar</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.nombre}</td>
                <td>{product.precio}</td>
                <td>{product.cantidad}</td>
                <td>
                  <input type="number" min="1" value={selectedQuantity[product.id] || ''} onChange={(e) => setSelectedQuantity({...selectedQuantity, [product.id]: e.target.value})} />
                  <button className="buy-button" onClick={() => handleBuy(product.id)}>Comprar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Suspense fallback={<div>Loading...</div>}>
          {selectedMicrofrontend === "AdminPanel" && <AdminPanel />}
          {selectedMicrofrontend === "LoginForm" && <LoginForm />}
        </Suspense>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));