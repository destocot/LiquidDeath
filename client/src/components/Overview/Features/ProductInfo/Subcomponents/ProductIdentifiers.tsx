import React from 'react';

function ProductIdentifiers({product}) {
  console.log(product);
  return (
    <div>
      <h4>{product.category}</h4>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <h4>{product.slogan}</h4>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductIdentifiers;
