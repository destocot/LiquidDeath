import React from 'react';
import helpers from '../../../../helpPlease';

function ProductIdentifiers({ product, currentStyle }) {
  return (
    <div className="mt-1" data-testid="product-identifiers">
      <p className="italic relative">{product.category}</p>
      <p className="font-bold text-[200%]">{product.name}</p>
      {helpers.priceChecker(currentStyle)}
    </div>
  );
}

export default ProductIdentifiers;
