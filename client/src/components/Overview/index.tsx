import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInfo from './Features/ProductInfo';
import StyleSelector from './Features/StyleSelector';
import ImageGallery from './Features/ImageGallery';
import AddCart from './Features/AddCart';
import './OverviewStyles.css';

function Overview({product, reviewsMeta}) {
  // states for styles and current style
  const [styles, setStyles] = useState(null);
  const [currentStyle, setCurrentStyle] = useState(null);

  // const updStyles = async () => {
  //   const newStyles = await axios.get(`/products/${product.id}/styles`);
  //   return newStyles;
  // };

  const updStyles = async () => {
    const newStyles = await axios.get(`/products/37318/styles`);
    return newStyles;
  };

  const styleClickHandler = (e) => {
    e.preventDefault();
    setCurrentStyle(styles[e.target.id]);
  };

  useEffect(() => {
    updStyles()
      .then((newStyles) => {
        setStyles(newStyles.data.results);
        setCurrentStyle(newStyles.data.results[0]);
      })
      .catch((err) => console.error(err));
  }, [product]);

  if (currentStyle) {
    return (
      <div className="overview-container">
        <ImageGallery currentStyle={currentStyle} />
        <div className="right-side-container">
          <ProductInfo product={product} currentStyle={currentStyle} reviewsMeta={reviewsMeta} />
          <StyleSelector styles={styles} setCurrentStyle={styleClickHandler}/>
          <AddCart />
        </div>

      </div>
    );
  }
}

export default Overview;
