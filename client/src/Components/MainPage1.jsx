import React, { useState, useEffect } from 'react';
import '../Styles/MainPage1.css';

const MainPage1 = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [fastSearchStrings, setFastSearchStrings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFastSearch, setShowFastSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://noxer-test.ru/webapp/api/products/on_main');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const productList = data.products || data;
        setProducts(productList);
        setFilteredProducts(productList);
        setFastSearchStrings(data.special_project_parameters_json?.fast_search_strings?.parameters_list || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowFastSearch(value.length > 0 && fastSearchStrings.length > 0);
  };

  const handleFastSearchClick = (phrase) => {
    setSearchQuery(phrase);
    setShowFastSearch(false);
  };

  return (
    <div className="main-page">
      <header className="header">
        <div className="logo">maga3in</div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            onBlur={() => setTimeout(() => setShowFastSearch(false), 200)}
          />
          <button>🔍</button>
        </div>
        <div className="cart-icon">🛒</div>
      </header>

      {showFastSearch && (
        <div className="fast-search-dropdown">
          <div className="fast-search-list">
            {fastSearchStrings.map((phrase, index) => (
              <button key={index} className="fast-search-item" onClick={() => handleFastSearchClick(phrase)}>
                {phrase}
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="categories">
        <h2>Categories</h2>
        <div className="category-list">
          <div className="category-item">Electronics</div>
          <div className="category-item">Clothing</div>
          <div className="category-item">Home & Garden</div>
          <div className="category-item">Sports</div>
          <div className="category-item">Books</div>
        </div>
      </section>

      <section className="products">
        <h2>Featured Products</h2>
        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <div className="product-grid">
            {filteredProducts.map((product) => {
              const mainImage = product.images?.find(img => img.MainImage)?.Image_URL || product.images?.[0]?.Image_URL || '/assets/placeholder.jpg';
              return (
                <div key={product.id} className="product-card">
                  <img src={mainImage} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button>Add to Cart</button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <footer className="footer">
        <div className="footer-nav">
          <div className="nav-item">🏠 Home</div>
          <div className="nav-item">🔍 Search</div>
          <div className="nav-item">🛒 Cart</div>
          <div className="nav-item">👤 Profile</div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage1;
