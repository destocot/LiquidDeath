import React from 'react';
import StarsAndReviews from './StarsAndReviews';
import ProductIdentifiers from './ProductIdentifiers';
import Sharing from './Sharing';
import helpers from '../../../../helpPlease';

function ProductInfo({product, reviewsMeta, currentStyle}) {
  return (
    <div className="product-info-container">
      {helpers.reviewScore(reviewsMeta) ?
        <StarsAndReviews reviewScore={helpers.reviewScore(reviewsMeta)} /> : null}
      <ProductIdentifiers product={product} currentStyle={currentStyle} />
      <Sharing />
    </div>
  );
}

export default ProductInfo;
