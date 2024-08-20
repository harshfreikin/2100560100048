import React from 'react';

const ProductDetail = ({ product }) => {
  if (!product) {
    return <div>Select a product to see details.</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Company: {product.company}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.available ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  );
};

export default ProductDetail;
