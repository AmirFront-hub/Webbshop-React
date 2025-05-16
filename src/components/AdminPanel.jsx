import React, { useState, useEffect } from 'react';
import useProductStore from '../store/useShopStore';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  // Access the product store
  const { products, addProduct, updateProduct, deleteProduct, fetchProducts } = useProductStore();
  
  // Get current auth state
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  
  // State for form inputs - removed description
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    imageURL: ''
  });
  
  // State for editing mode
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  
  // State for success/error messages
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Categories for dropdown
  const categories = ['TV-Spel', 'Leksaker', 'Dockor', 'Pyssel'];
  
  // Fetch products on load
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For price and stock, ensure we're handling numbers
    if (name === 'price' || name === 'stock') {
      setFormData({
        ...formData,
        [name]: value.replace(/[^0-9]/g, '')
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      setMessage({ text: 'Alla obligatoriska fält måste fyllas i', type: 'error' });
      return;
    }
    
    // Create product object
    const productData = {
      name: formData.name,
      price: parseInt(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      imageURL: formData.imageURL || 'https://via.placeholder.com/150'
    };
    
    try {
      setMessage({ text: 'Sparar...', type: 'info' });
      
      if (editMode && editProductId) {
        // Update existing product
        await updateProduct({ ...productData, id: editProductId });
        setMessage({ text: 'Produkt uppdaterad i databasen!', type: 'success' });
      } else {
        // Add new product
        await addProduct(productData);
        setMessage({ text: 'Produkt tillagd i databasen!', type: 'success' });
      }
      
      // Reset form
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      setMessage({ 
        text: `Ett fel uppstod: ${error.message}`, 
        type: 'error' 
      });
    }
  };
  
  // Reset form and state
  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      stock: '',
      imageURL: ''
    });
    setEditMode(false);
    setEditProductId(null);
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };
  
  // Load product data for editing
  const handleEdit = (product) => {
    setFormData({
      name: product.name || '',
      price: product.price?.toString() || '',
      category: product.category || '',
      stock: product.stock?.toString() || '',
      imageURL: product.imageURL || ''
    });
    setEditMode(true);
    setEditProductId(product.id);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle product deletion
  const handleDelete = async (productId) => {
    if (window.confirm('Är du säker på att du vill ta bort denna produkt? Den kommer tas bort från databasen.')) {
      try {
        setMessage({ text: 'Tar bort produkt...', type: 'info' });
        await deleteProduct(productId);
        setMessage({ text: 'Produkt borttagen från databasen!', type: 'success' });
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setMessage({ text: '', type: '' });
        }, 3000);
      } catch (error) {
        setMessage({ 
          text: `Ett fel uppstod vid borttagning: ${error.message}`, 
          type: 'error' 
        });
      }
    }
  };
  
  // Add logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2 className="admin-panel-title">
          {editMode ? 'Redigera produkt' : 'Lägg till ny produkt'}
        </h2>
        <button onClick={handleLogout} className="logout-btn">
          Logga ut
        </button>
      </div>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Produktnamn*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="T.ex. LEGO Star Wars"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Pris (kr)*</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="T.ex. 299"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Kategori*</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Välj kategori</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="stock">Lagersaldo*</label>
            <input
              type="text"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="T.ex. 25"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="imageURL">Bild URL</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="https://exempel.se/bild.jpg"
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {editMode ? 'Uppdatera produkt' : 'Lägg till produkt'}
          </button>
          
          {editMode && (
            <button 
              type="button" 
              className="btn-secondary"
              onClick={resetForm}
            >
              Avbryt
            </button>
          )}
        </div>
      </form>
      
      <div className="products-management">
        <h3>Befintliga produkter</h3>
        
        <table className="products-table">
          <thead>
            <tr>
              <th>Bild</th>
              <th>Namn</th>
              <th>Kategori</th>
              <th>Pris</th>
              <th>Lagersaldo</th>
              <th>Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="product-image-cell">
                  {product.imageURL && (
                    <img 
                      src={product.imageURL} 
                      alt={product.name} 
                      className="product-thumbnail"
                    />
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price} kr</td>
                <td>{product.stock}</td>
                <td className="action-buttons">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(product)}
                  >
                    Redigera
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    Ta bort
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;