import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductInfo from "./Features/ProductInfo";
import StyleSelector from "./Features/StyleSelector";
import ImageGallery from "./Features/ImageGallery";
import AddCart from "./Features/AddCart";
import Description from "./Features/ProductInfo/Description";
import "./OverviewStyles.css";

function Overview({ product, reviewsMeta, setConfetti, setNumInCart, windowSize }) {
  // states for styles and current style
  const [styles, setStyles] = useState(null);
  const [currentStyle, setCurrentStyle] = useState(null);
  const [expand, toggleExpand] = useState(false);
  const [view, changeView] = useState("default");
  const [nullVar, setNullVar] = useState(false);

  const rightSideContainer = document.getElementById("right-side-container");

  const updStyles = async () => {
    const newStyles = await axios.get(`/products/${product.id}/styles`);
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

  useEffect(() => {
    if (expand === true) {
      rightSideContainer.style.transform = 'translate(180%, 0)';
      changeView('expanded');
    } else if (view === 'expanded') {
      changeView('default');
    }
  }, [expand]);

  useEffect(() => {
    if (expand === true) {
      setTimeout(() => {
        setNullVar(true);
      }, 700)
    } else {
      setNullVar(false);
    }
  }, [view]);

  if (currentStyle) {
    return (
      <div className="overview-container">
        <ImageGallery
          currentStyle={currentStyle}
          setCurrentStyle={setCurrentStyle}
          styles={styles}
          view={view}
          toggleExpand={toggleExpand}
          windowSize={windowSize}
        />
        {view === "expanded" && nullVar ?
        null
        : (
          <>
            <div id="right-side-container">
              <ProductInfo
                product={product}
                currentStyle={currentStyle}
                reviewsMeta={reviewsMeta}
                setConfetti={setConfetti}
              />
              <div className="styles-cart-container">
                <StyleSelector
                  styles={styles}
                  setCurrentStyle={styleClickHandler}
                  currentStyle={currentStyle}
                />
                <AddCart
                  currentStyle={currentStyle}
                  setConfetti={setConfetti}
                  setNumInCart={setNumInCart}
                />
              </div>
            </div>
          </>
        )}
        <div className="description-container">
          <Description product={product} />
        </div>
      </div>
    );
  }
}

export default Overview;
