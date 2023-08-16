import React from 'react';
import helpers from '../../../../helpPlease';

function ProductIdentifiers({product, currentStyle}) {
  return (
    <div data-testid="product-identifiers">
      <p className="product-category">{product.category}</p>
      <p className="product-name">{product.name}</p>
      {helpers.priceChecker(currentStyle)}
    </div>
  );
}

export default ProductIdentifiers;
