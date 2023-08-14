import React from 'react';
import StarsAndReviews from './Subcomponents/StarsAndReviews';
import ProductIdentifiers from './Subcomponents/ProductIdentifiers';
import Sharing from './Subcomponents/Sharing';

function ProductInfo({product, reviewsMeta, styles, reviews}) {
  return (
    <div className="product-info-container">
      {reviews.length > 0 ? <StarsAndReviews reviews={reviews} /> : null}
      <ProductIdentifiers product={product} styles={styles} />
      <Sharing />
    </div>
  );
}

export default ProductInfo;
