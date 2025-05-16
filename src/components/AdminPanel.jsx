import React, { useState, useEffect } from 'react';
import useProductStore from '../store/useShopStore';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import Joi from 'joi';

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
  
  // Validate image URL (add to the AdminPanel component)
  const isValidImageUrl = (url) => {
    if (!url) return true; // Empty URL is valid, will use placeholder
    
    // Basic URL validation
    try {
      new URL(url);
      // Check if it's likely an image URL
      return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null;
    } catch {
      return false;
    }
  };
  
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
  
  // Create product validation schema
  const productSchema = Joi.object({
    name: Joi.string().required().min(2).max(100)
      .messages({
        'string.empty': 'Produktnamn är obligatoriskt',
        'string.min': 'Produktnamn måste vara minst {#limit} tecken',
        'string.max': 'Produktnamn får max vara {#limit} tecken'
      }),
    price: Joi.number().required().min(1).max(100000)
      .messages({
        'number.base': 'Pris måste vara ett nummer',
        'number.empty': 'Pris är obligatoriskt',
        'number.min': 'Pris måste vara minst {#limit} kr',
        'number.max': 'Pris får inte överstiga {#limit} kr'
      }),
    category: Joi.string().required().valid(...categories)
      .messages({
        'string.empty': 'Kategori är obligatoriskt',
        'any.only': 'Välj en giltig kategori'
      }),
    stock: Joi.number().required().min(0).max(10000)
      .messages({
        'number.base': 'Lagersaldo måste vara ett nummer',
        'number.empty': 'Lagersaldo är obligatoriskt',
        'number.min': 'Lagersaldo kan inte vara negativt',
        'number.max': 'Lagersaldo får inte överstiga {#limit}'
      }),
    imageURL: Joi.string().allow('').uri()
      .messages({
        'string.uri': 'Ogiltig URL-format för bild'
      })
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data for validation - ensure numbers are actually numbers
    const dataToValidate = {
      ...formData,
      price: formData.price ? Number(formData.price) : '',
      stock: formData.stock ? Number(formData.stock) : ''
    };
    
    // Validate form data with Joi
    const { error } = productSchema.validate(dataToValidate, { abortEarly: false });
    
    if (error) {
      // Format all validation errors into a single message
      const errorMessages = error.details.map(detail => detail.message).join('\n');
      setMessage({ 
        text: errorMessages, 
        type: 'error' 
      });
      return;
    }
    
    // Additional validation for image URL if needed
    if (formData.imageURL && !isValidImageUrl(formData.imageURL)) {
      setMessage({ text: 'Ogiltig bild URL. Använd en länk till en jpg, png, gif eller webp-fil', type: 'error' });
      return;
    }
    
    // If validation passes, continue with saving the product
    try {
      setMessage({ text: 'Sparar...', type: 'info' });
      
      // Create product object
      const productData = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        imageURL: formData.imageURL || 'https://via.placeholder.com/150'
      };
      
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
    // First update the state
    setFormData({
      name: product.name || '',
      price: product.price?.toString() || '',
      category: product.category || '',
      stock: product.stock?.toString() || '',
      imageURL: product.imageURL || ''
    });
    setEditMode(true);
    setEditProductId(product.id);
    
    // Use requestAnimationFrame to ensure state has been updated before scrolling
    requestAnimationFrame(() => {
      const formElement = document.querySelector('.product-form');
      if (formElement) {
        // Calculate position including any fixed headers
        const headerOffset = 100; // Adjust based on your header height
        const elementPosition = formElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Perform the scroll
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Add highlight effect
        formElement.classList.add('highlight-form');
        setTimeout(() => {
          formElement.classList.remove('highlight-form');
        }, 1500);
      }
    });
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
        {/* First row for Name and Price */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Produktnamn *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Pris (kr) *</label>
            <input
              type="text" 
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        {/* Second row for Category and Stock */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Kategori *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Välj kategori</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="stock">Lagersaldo *</label>
            <input
              type="text"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        {/* Third row for Image URL */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="imageURL">Bild URL</label>
            <input
              type="text"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
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
              Avbryt redigering
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
                  {product.imageURL ? (
                    <img 
                      src={product.imageURL} 
                      alt={product.name}
                      className="product-thumbnail"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite error loop
                        e.target.src = 'https://via.placeholder.com/50?text=No+Image'; // Fallback image
                      }}
                    />
                  ) : (
                    <div className="no-image-placeholder">No Image</div>
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