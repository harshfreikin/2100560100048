import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState('AMZ');
  const [category, setCategory] = useState('Laptop');
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://20.244.56.144/test/companies/${company}/categories/${category}/products`,
        {
          params: {
            top: 10,
            minPrice,
            maxPrice,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [company, category, minPrice, maxPrice]);

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      if (type === 'min') {
        setMinPrice(value);
      } else if (type === 'max') {
        setMaxPrice(value);
      }
    }
  };

  return (
    <div className="App">
      <h1>Product List</h1>

      <label>
        Company:
        <select value={company} onChange={(e) => setCompany(e.target.value)}>
          <option value="AMZ">AMZ</option>
          <option value="FLP">FLP</option>
          <option value="SNP">SNP</option>
          <option value="MYN">MYN</option>
          <option value="AZO">AZO</option>
        </select>
      </label>

      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Laptop">Laptop</option>
          <option value="Phone">Phone</option>
          <option value="TV">TV</option>
          <option value="Earphone">Earphone</option>
          <option value="Tablet">Tablet</option>
        </select>
      </label>

      <label>
        Min Price:
        <input
          type="number"
          value={minPrice}
          onChange={(e) => handlePriceChange(e, 'min')}
        />
      </label>

      <label>
        Max Price:
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => handlePriceChange(e, 'max')}
        />
      </label>

      <button onClick={fetchProducts}>Fetch Products</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

