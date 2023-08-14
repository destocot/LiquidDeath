import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInfo from './Features/ProductInfo';
import StyleSelector from './Features/StyleSelector';
import ImageGallery from './Features/ImageGallery';
import AddCart from './Features/AddCart';
import './OverviewStyles.css';
import { productReviews } from './ExampleData';

function Overview({product, reviewsMeta}) {
  // states for styles and current style
  const [styles, setStyles] = useState(null);
  const [currentStyle, setCurrentStyle] = useState(null);

  const updStyles = async () => {
    const newStyles = await axios.get(`/products/${product.id}/styles`);
    return newStyles;
  };
  //
  useEffect(() => {
    updStyles().then((newStyles) => setStyles(newStyles.data.results));
  }, [product])
  if (styles) {
    return (
      <div className="overview-container">
        <ImageGallery styles={styles} />
        <ProductInfo product={product} styles={styles} reviews={productReviews} reviewsMeta={reviewsMeta} />
        <StyleSelector styles={styles} />
        <AddCart />
      </div>
    );
  }
}

export default Overview;
