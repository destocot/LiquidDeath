import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionsAndAnswers from "./components/QuestionsAndAnswers/QuestionsAndAnswers";
import Overview from "./components/Overview";
import ReviewsRatings from "./components/Reviews-Ratings";
import { List } from "./components/Related/List";
import initial from "./PlaceHolderData.js";
import Navbar from "./components/Navbar/Navbar";

function App() {
  /*
  ===== STATES AND STATE CHANGERS =====
  */
  // states passed to multiple components
  const [product, setProduct] = useState(initial.product);
  const [reviewsMeta, setReviewsMeta] = useState(initial.reviewsMeta);

  const updProduct = async (id) => {
    const newProduct = await axios.get(`/products/${id}`);
    return newProduct;
  };

  const updReviewsMeta = async () => {
    // const newReviewsMeta = await axios.get(`/reviews/meta/${product.id}
    const newReviewsMeta = await axios.get(`/reviews/meta/${product.id}`);
    return newReviewsMeta;
  };

  /*
  ====== FUNCTIONALITY =====
  */

  // update reviewsMeta every time product changes
  useEffect(() => {
    updReviewsMeta()
      .then((reviewsMetaUpd) => setReviewsMeta(reviewsMetaUpd.data))
      .catch((err) => console.error(err));
  }, [product]);

  /*
  TODOS:
  - onCardClick fn that updates product
  - onSearchProduct fn that updates product
  */

  // TESTING TESTING
  useEffect(() => {
    console.log({
      "reviews meta data": reviewsMeta,
      "current product": product,
    });
  }, [reviewsMeta]);

  // const changeProduct = () => {
  //   if (product.id === 37324) {
  //     updProduct(37325)
  //       .then((result) => {
  //         setProduct(result.data);
  //       })
  //       .catch((err) => console.error(err));
  //   } else {
  //     updProduct(37324)
  //       .then((result) => {
  //         setProduct(result.data);
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // };

  const [colorMode, setColorMode] = useState('Dark Mode')
  const [colorStyle, setColorStyle] = useState("bg-[#f0f4f8] bg-[url('https://www.transparenttextures.com/patterns/60-lines.png')] text-[#333333]")

  // changed order of components
  if (reviewsMeta) {
    return (
      <div id="the-main-app-container" className={colorStyle}>
        {/* // className={colorStyle}
        // <button onClick={() => changeColor()}>{colorMode}</button> */}
        <Navbar
          setColorMode={setColorMode}
          setColorStyle={setColorStyle}
          colorMode={colorMode}
        />
        <Overview product={product} reviewsMeta={reviewsMeta} />
        <List
          currentProduct={product}
          updateCurrentProduct={updProduct}
          setCurrentProduct={setProduct}
        />
        {/* <button onClick={() => changeProduct()}>CHANGE PRODUCT</button> */}
        <QuestionsAndAnswers
          currProductId={product.id}
          currProductName={product.name}
        />
        <ReviewsRatings
          id="ratingsReviewsContainerId"
          reviewsMeta={reviewsMeta}
          currProductId={product.id}
          currProductName={product.name}
          initial={initial}
        />
      </div>
    );
  }
}

export default App;
