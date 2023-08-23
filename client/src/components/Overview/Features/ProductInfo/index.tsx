import React from 'react';
import StarsAndReviews from './StarsAndReviews';
import ProductIdentifiers from './ProductIdentifiers';
import helpers from '../../../../helpPlease';

function ProductInfo({ product, reviewsMeta, currentStyle, setConfetti }) {
  return (
    <div className="product-info-container ml-5">
      {helpers.reviewScore(reviewsMeta) ?
        <StarsAndReviews reviewScore={helpers.reviewScore(reviewsMeta)} setConfetti={setConfetti} /> : null}
      <ProductIdentifiers product={product} currentStyle={currentStyle} />
    </div>
  );
}

export default ProductInfo;
