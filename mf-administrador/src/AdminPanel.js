import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [buyQuantity, setBuyQuantity] = useState({ id: '', cantidad: 0 });
    const [updateName, setUpdateName] = useState({ name: '', newName: '' });
    const [updatePrice, setUpdatePrice] = useState({ name: '', newPrice: 0 });
    const [updateQuantity, setUpdateQuantity] = useState({ name: '', newQuantity: 0 });
    const [newProduct, setNewProduct] = useState({ nombre: '', cantidad: 0, precio: 0 });


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/producto/todos');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const buyProduct = async () => {
        try {
            await axios.put(`http://localhost:8080/api/producto/comprar?id=${buyQuantity.id}&cantidad=${buyQuantity.cantidad}`);
            await fetchProducts();
            setBuyQuantity({ id: '', cantidad: 0 });
            setError('');
        } catch (error) {
            setError('Error al realizar la compra');
            console.error('Error buying product:', error);
        }
    };

     const deleteProduct = async (id) => {
            try {
                await axios.delete(`http://localhost:8080/api/producto/eliminar/${id}`);
                await fetchProducts();
                setError('');
            } catch (error) {
                setError('Error al eliminar el producto');
                console.error('Error deleting product:', error);
            }
        };

    const updateProductName = async () => {
        try {
            await axios.put(`http://localhost:8080/api/producto/actualizar/nombre?nombre=${updateName.name}&nuevoNombre=${updateName.newName}`);
            await fetchProducts();
            setUpdateName({ name: '', newName: '' });
            setError('');
        } catch (error) {
            setError('Error al actualizar el nombre del producto');
            console.error('Error updating product name:', error);
        }
    };

    const updateProductPrice = async () => {
        try {
            await axios.put(`http://localhost:8080/api/producto/actualizar/precio?nombre=${updatePrice.name}&precio=${updatePrice.newPrice}`);
            await fetchProducts();
            setUpdatePrice({ name: '', newPrice: 0 });
            setError('');
        } catch (error) {
            setError('Error al actualizar el precio del producto');
            console.error('Error updating product price:', error);
        }
    };

    const updateProductQuantity = async () => {
        try {
            await axios.put(`http://localhost:8080/api/producto/actualizar/cantidad?nombre=${updateQuantity.name}&cantidad=${updateQuantity.newQuantity}`);
            await fetchProducts();
            setUpdateQuantity({ name: '', newQuantity: 0 });
            setError('');
        } catch (error) {
            setError('Error al actualizar la cantidad del producto');
            console.error('Error updating product quantity:', error);
        }
    };


    const addNewProduct = async () => {
        try {
            await axios.post(`http://localhost:8080/api/producto/agregar`, newProduct);
            await fetchProducts(); // Actualiza la lista de productos después de agregar uno nuevo
            setNewProduct({ nombre: '', cantidad: 0, precio: 0 }); // Limpia los campos después de agregar el producto
            setError(''); // Limpia cualquier error anterior
        } catch (error) {
            setError('Error al agregar el producto');
            console.error('Error adding product:', error);
        }
    };



    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <div className="update-section">
                <h2>Agregar Nuevo Producto</h2>
                <input
                    type="text"
                    placeholder="Nombre del Producto"
                    value={newProduct.nombre}
                    onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={newProduct.cantidad}
                    onChange={(e) => setNewProduct({ ...newProduct, cantidad: parseInt(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={newProduct.precio}
                    onChange={(e) => setNewProduct({ ...newProduct, precio: parseFloat(e.target.value) })}
                />
                <button className="buy" onClick={addNewProduct}>Agregar Producto</button>
            </div>
            <div className="update-section">
                <h2>Actualizar Nombre de Producto</h2>
                <input
                    type="text"
                    placeholder="Nombre del Producto"
                    value={updateName.name}
                    onChange={(e) => setUpdateName({ ...updateName, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Nuevo Nombre"
                    value={updateName.newName}
                    onChange={(e) => setUpdateName({ ...updateName, newName: e.target.value })}
                />
                <button className="buy" onClick={updateProductName}>Actualizar Nombre</button>
            </div>
            <div className="update-section">
                <h2>Actualizar Precio de Producto</h2>
                <input
                    type="text"
                    placeholder="Nombre del Producto"
                    value={updatePrice.name}
                    onChange={(e) => setUpdatePrice({ ...updatePrice, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Nuevo Precio"
                    value={updatePrice.newPrice}
                    onChange={(e) => setUpdatePrice({ ...updatePrice, newPrice: parseFloat(e.target.value) })}
                />
                <button className="buy" onClick={updateProductPrice}>Actualizar Precio</button>
            </div>
            <div className="update-section">
                <h2>Actualizar Cantidad de Producto</h2>
                <input
                    type="text"
                    placeholder="Nombre del Producto"
                    value={updateQuantity.name}
                    onChange={(e) => setUpdateQuantity({ ...updateQuantity, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Nueva Cantidad"
                    value={updateQuantity.newQuantity}
                    onChange={(e) => setUpdateQuantity({ ...updateQuantity, newQuantity: parseInt(e.target.value) })}
                />
                <button className="buy" onClick={updateProductQuantity}>Actualizar Cantidad</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Inventario</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.nombre}</td>
                            <td>{product.cantidad}</td>
                            <td>${product.precio}</td>
                            <td>
                                <div className="action-buttons">
                                    <input
                                        type="number"
                                        placeholder="Cantidad"
                                        onChange={(e) => setBuyQuantity({ id: product.id, cantidad: parseInt(e.target.value) })}
                                    />
                                    <button className="buy" onClick={buyProduct}>Comprar</button>
                                    <button className="delete" onClick={() => deleteProduct(product.id)}>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default AdminPanel;
