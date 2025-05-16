import React, { Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProductStore from '../store/useShopStore';
import useCartStore from '../store/useCartStore';
import ProductCard from '../components/ProductCard';
import '../components/Products.css';
import './Collection.css';

const Collection = () => {
  // Get category from URL params
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort') || 'default';
  
  const { products, fetchProducts, loading } = useProductStore();
  const addToCart = useCartStore(state => state.addToCart);

  // Initialize filter with the category from URL if available
  const [filter, setFilter] = useState({
    category: categoryParam || 'all',
    priceRange: [0, 10000]
  });
  
  // Add sort state
  const [sort, setSort] = useState(sortParam);

  // Update filter when URL params change
  useEffect(() => {
    if (categoryParam) {
      setFilter(prev => ({...prev, category: categoryParam}));
    }
    
    // Update sort state if URL param changes
    if (sortParam) {
      setSort(sortParam);
    }
  }, [categoryParam, sortParam]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Static category list - these are the categories we want to filter by
  const categories = ['all', 'Leksaker', 'Dockor', 'Pyssel', 'TV-Spel'];
  
  // Sorting options
  const sortOptions = [
    { value: 'default', label: 'Standard' },
    { value: 'name-asc', label: 'Namn (A-Ö)' },
    { value: 'name-desc', label: 'Namn (Ö-A)' },
    { value: 'price-asc', label: 'Pris (Lägst först)' },
    { value: 'price-desc', label: 'Pris (Högst först)' }
  ];

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
    const productPrice = parseFloat(getField(product, 'price'));
    
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
  
  // Sort the filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const nameA = getField(a, 'name').toLowerCase();
    const nameB = getField(b, 'name').toLowerCase();
    const priceA = parseFloat(getField(a, 'price'));
    const priceB = parseFloat(getField(b, 'price'));
    
    switch (sort) {
      case 'name-asc':
        return nameA.localeCompare(nameB);
      case 'name-desc':
        return nameB.localeCompare(nameA);
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      default:
        return 0; // Default sorting (could be by ID or as they come from API)
    }
  });
  
  // Handle sorting change
  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    
    // Update URL with new sort parameter
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', newSort);
    setSearchParams(newParams);
  };

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
          
          <div className="product-section">
            {/* Add sort dropdown */}
            <div className="sort-container">
              <label htmlFor="sort-select">Sortera efter: </label>
              <select 
                id="sort-select" 
                value={sort} 
                onChange={handleSortChange}
                className="sort-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="product-grid">
              {loading ? (
                <p className="loading">Laddar produkter...</p>
              ) : sortedProducts.length > 0 ? (
                sortedProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={() => addToCart(product)} 
                  />
                ))
              ) : (
                <div className="no-products">
                  Inga produkter hittades med de valda filtren.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Collection;
