import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ nombre: '', precio: 0, cantidad: 0 });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/producto/todos'); // Cambio aquí
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addProduct = async () => {
        try {
            await axios.post('http://localhost:8080/api/producto/agregar', newProduct); // Cambio aquí
            fetchProducts();
            setNewProduct({ nombre: '', precio: 0, cantidad: 0 });
            setError('');
        } catch (error) {
            setError('Error al agregar el producto');
            console.error('Error adding product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/producto/eliminar/${id}`); // Cambio aquí
            fetchProducts();
            setError('');
        } catch (error) {
            setError('Error al eliminar el producto');
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <div>
                <h2>Productos</h2>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            {product.nombre} - ${product.precio} - Cantidad: {product.cantidad}
                            <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
                <h3>Agregar Nuevo Producto</h3>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={newProduct.nombre}
                    onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={newProduct.precio}
                    onChange={(e) => setNewProduct({ ...newProduct, precio: parseFloat(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={newProduct.cantidad}
                    onChange={(e) => setNewProduct({ ...newProduct, cantidad: parseInt(e.target.value) })}
                />
                <button onClick={addProduct}>Agregar Producto</button>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default AdminPanel;

