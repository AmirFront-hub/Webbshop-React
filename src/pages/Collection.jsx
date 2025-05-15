import React, { Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProductStore from '../store/useShopStore';
import useCartStore from '../store/useCartStore';
import ProductCard from '../components/ProductCard';
import '../components/Products.css';
import './Collection.css';

const Collection = () => {
  // Get category from URL params
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const { products, fetchProducts, loading } = useProductStore();
  const addToCart = useCartStore(state => state.addToCart);

  // Initialize filter with the category from URL if available
  const [filter, setFilter] = useState({
    category: categoryParam || 'all',
    priceRange: [0, 10000]
  });

  // Update filter when URL params change
  useEffect(() => {
    if (categoryParam) {
      setFilter(prev => ({...prev, category: categoryParam}));
    }
  }, [categoryParam]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Static category list - these are the categories we want to filter by
  const categories = ['all', 'Leksaker', 'Dockor', 'Pyssel', 'TV-Spel'];

  // Helper function to safely get field value regardless of case
  const getField = (obj, fieldName) => {
    if (!obj) return '';
    
    // Try direct access with the provided field name
    if (obj[fieldName] !== undefined) return obj[fieldName];
    
    // Try with first letter capitalized
    const capitalized = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    if (obj[capitalized] !== undefined) return obj[capitalized];
    
    // Try with first letter lowercase
    const lowercased = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
    if (obj[lowercased] !== undefined) return obj[lowercased];
    
    // If nothing found, return empty string
    return '';
  };

  // Filter products based on selected category and price range
  const filteredProducts = products.filter(product => {
    // Get values using the helper
    const productCategory = getField(product, 'category');
    const productPrice = getField(product, 'price');
    
    // Handle "all" category
    if (filter.category === 'all') {
      return productPrice >= filter.priceRange[0] && 
             productPrice <= filter.priceRange[1];
    }
    
    // Check category match with case insensitivity
    return productCategory.toLowerCase() === filter.category.toLowerCase() && 
           productPrice >= filter.priceRange[0] && 
           productPrice <= filter.priceRange[1];
  });

  if (loading) return <p>Laddar produkter...</p>;

  return (
    <Fragment>
      <div className="collection-container">
        <h1 className="collection-title">Produkter</h1>
        
        <div className="collection-layout">
          <div className="filter-sidebar">
            <h3>Filter</h3>
            
            <div className="filter-section">
              <h4>Kategori</h4>
              <div className="filter-options">
                {categories.map(category => (
                  <label key={category} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      checked={filter.category === category}
                      onChange={() => setFilter({...filter, category})}
                    />
                    <span>{category === 'all' ? 'Alla kategorier' : category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="filter-section">
              <h4>Pris</h4>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={filter.priceRange[1]}
                  onChange={(e) => setFilter({
                    ...filter,
                    priceRange: [filter.priceRange[0], parseInt(e.target.value)]
                  })}
                />
                <div className="price-labels">
                  <span>{filter.priceRange[0]} kr</span>
                  <span>{filter.priceRange[1]} kr</span>
                </div>
              </div>
            </div>
            
            <button 
              className="reset-filter"
              onClick={() => setFilter({category: 'all', priceRange: [0, 10000]})}
            >
              Återställ filter
            </button>
          </div>

          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
            {filteredProducts.length === 0 && (
              <div className="no-products">Inga produkter matchar ditt filter</div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Collection;
