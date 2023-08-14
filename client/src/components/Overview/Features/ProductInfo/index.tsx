import React from 'react';
import StarsAndReviews from './Subcomponents/StarsAndReviews';
import ProductIdentifiers from './Subcomponents/ProductIdentifiers';
import Sharing from './Subcomponents/Sharing';

function ProductInfo({product, reviewsMeta, styles}) {
  // calculates avg review score
  const reviewScore = () => {
    let totalCount = 0;
    let totalScore = 0;
    for (const [score, count] of Object.entries(reviewsMeta.ratings)) {
      totalCount += Number(count);
      totalScore += Number(score) * Number(count);
    }
    if (totalCount === 0) {
      return null;
    }
    return { score: totalScore / totalCount, count: totalCount };
  };
  return (
    <div className="product-info-container">
      {reviewScore() ? <StarsAndReviews reviewScore={reviewScore()} /> : null}
      <ProductIdentifiers product={product} styles={styles} />
      <Sharing />
    </div>
  );
}

export default ProductInfo;
