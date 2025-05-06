import React from 'react';

const AdminPanel = ({ products, onProductUpdate }) => {
    const handleAddProduct = () => {
        // Logic to add a new product
    };

    const handleEditProduct = (productId) => {
        // Logic to edit an existing product
    };

    const handleDeleteProduct = (productId) => {
        // Logic to delete a product
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <button onClick={handleAddProduct}>Add Product</button>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <span>{product.name} - ${product.price}</span>
                        <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                        <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;