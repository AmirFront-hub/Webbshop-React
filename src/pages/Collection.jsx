import React, { Fragment, useEffect, useState } from 'react';
import useProductStore from '../store/useShopStore';
import useCartStore from '../store/useCartStore';
import ProductCard from '../components/ProductCard';
import '../components/Products.css';
import './Collection.css';

const Collection = () => {
  const { products, fetchProducts, loading } = useProductStore();
  const addToCart = useCartStore(state => state.addToCart);

  // Add filter state
  const [filter, setFilter] = useState({
    category: 'all',
    priceRange: [0, 10000]
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Static category list - these are the categories we want to filter by
  const categories = ['all', 'Leksaker', 'Dockor', 'Pyssel', 'TV-Spel'];

  // Add debugging to check what's really in the products
  useEffect(() => {
    // What categories exist in the data?
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    console.log('Categories in products:', uniqueCategories);
    
    // How many products per category?
    const counts = {};
    uniqueCategories.forEach(cat => {
      counts[cat] = products.filter(p => p.category === cat).length;
    });
    console.log('Products per category:', counts);
  }, [products]);

  // Simple filter function - easy to debug
  // Handle both field name cases
  const filteredProducts = products.filter(product => {
    // Handle "all" category
    if (filter.category === 'all') {
      return product.price >= filter.priceRange[0] && 
             product.price <= filter.priceRange[1];
    }
    
    // Check both possible field names
    const productCategory = product.category || product.Category; 
    
    return productCategory === filter.category && 
           product.price >= filter.priceRange[0] && 
           product.price <= filter.priceRange[1];
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
