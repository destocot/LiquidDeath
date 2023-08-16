import React from 'react';
import helpers from '../../../../helpPlease';

function ProductIdentifiers({product, currentStyle}) {
  return (
    <div data-testid="product-identifiers">
      <h4>{product.category}</h4>
      <h2>{product.name}</h2>
      {helpers.priceChecker(currentStyle)}
      <h4>{product.slogan}</h4>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductIdentifiers;
