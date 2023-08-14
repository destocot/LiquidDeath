import React from 'react';
import ProductInfo from './Features/ProductInfo';
import StyleSelector from './Features/StyleSelector';
import ImageGallery from './Features/ImageGallery';
import AddCart from './Features/AddCart';
import './OverviewStyles.css';
import { product, productStyles, productReviews } from './ExampleData';

function Overview({product, reviewsMeta, styles, reviews}) {
  return (
    <div className="overview-container">
      <ImageGallery styles={styles} />
      <ProductInfo product={product} styles={styles} reviews={reviews} reviewsMeta={reviewsMeta} />
      <StyleSelector />
      <AddCart />
    </div>
  );
}

export default Overview;
