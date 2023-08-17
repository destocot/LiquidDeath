import React, { useState, useEffect } from 'react';
import axios from 'axios';
import helpers from '../../../helpPlease';

// destructuring not working after moving to helpPlease.tsx
const characteristicLabels = helpers.characteristicLabels;
const starMeaning = helpers.starMeaning;
const sumHelper = helpers.sumHelper;
const charChecker = helpers.charChecker;
const defaultCharacteristics = helpers.defaultCharacteristics;
const defaultReviewPostBody = helpers.defaultReviewPostBody;
const removeNullValues = helpers.removeNullValues;

// testing multiple characteristics
import { getReviewsMeta } from '../exampleData';
const reviewsMeta = getReviewsMeta;

// main function
function NewReviewForm({ setAForm, /*reviewsMeta,*/ currProductName, currProductId }) {
  const [rating, setRating] = useState(0);
  const [recommendation, setRecommendation] = useState(true);
  // const [characteristics, setCharacteristics] = useState(defaultCharacteristics); // <-- this state keeps track of user selections
  const [charObj, setCharObj] = useState({});
  // const [postBody, setPostBody] = useState(defaultReviewPostBody);

  console.log('reviewsMeta: ', reviewsMeta);
  // used to update the boolean recommend
  const updateRecommendation = (value) => {
    setRecommendation(value);
  };

  // update characteristics
  const updateCharacteristics = (key, value) => {
    const newCharacteristics = { ...charObj, [key]: value };
    ('updated: ', newCharacteristics);
    // setCharacteristics(newCharacteristics);
    setCharObj(newCharacteristics);
  };

  useEffect(() => {
    console.log('charObj: ', charObj);
  },[charObj]);

  // this renders 5 stars that allow user to choose, upon choosing, renders gold stars up to and including what user has selected, fills rest in with grey
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((index, value) => {
      if (index <= rating) {
        return (
          <i key={index} className="star fa-regular fa-star" value={index} onClick={() => setRating(index)}/>
        )
      } else {
        return (
          <i key={index} className="empty-star fa-regular fa-star" value={index} onClick={() => setRating(index)}/>
        )
      }
    })
  };

  // generates radio buttons for users to rank characteristics
  const renderCharacteristics = () => {
    // for every characteristic in a given reviewMeta Obj
    return Object.keys(reviewsMeta.characteristics).map((charName) => {
      // console.log('map char: ', characteristic);
      // characteristic refers to Size, Width, Comfort, etc.
      // characteristics refers to the state, an object with properties for each characteristic
      // const currentCharValue = characteristics[characteristic]; // could be null or a number
      const currCharId = reviewsMeta.characteristics[charName].id;
      const currCharValue = charObj[currCharId];
      console.log(currCharValue);

      return (
        <div key={currCharId} data-testid="review-form-parent-id" id="charLabel">{charName} <br />
          {(charObj[currCharId] === undefined) ? <div id="charSelected">none selected</div> : <div id="charSelected">{characteristicLabels[charName][currCharValue]}</div>}
          <div name="charId" value={currCharId} className="charRadioButtons">
            {
              [1, 2, 3, 4, 5].map((index) => {
                return (
                    <label key={index}>
                      <input type="radio" name={charName} value={index} checked={charObj[currCharId] === index} onChange={() => updateCharacteristics(currCharId, index)}/>
                    </label>
                )
              })
            }
          </div>
          <div className="characteristicsAxisLabels">
            {<div>{characteristicLabels[charName]['1']}</div>}
            {<div>{characteristicLabels[charName]['5']}</div>}
          </div>

        </div>
      )
    })
  };

  // require product recommendation to be clicked

  // TODO - update this to generate popup window where user can add photos
  const renderPhotoPage = () => {
    ('click');
  };

  // Part of Khurram's code
  const checkKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  // Part of Khurram's code
  const close = () => {
    setAForm(false);
  };

  const sendReview = (data) => {
    axios.post('/reviews/newreview', data)
      .catch(() => ('error posting question'));
  }

  // TODO - update this to store all values in a massive state
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitHandler clicked');
    // const charId = e.target.charId.value;
    // console.log('test - ', charId);

    if (rating === 0) {
      alert('Rating must be given.');
      return;
    }

    // if (!charChecker(characteristics, reviewsMeta.characteristics)) {
    //   alert('Characteristics must be selected.');
    //   return;
    // }

    const tempPostObj = {
      "product_id": currProductId,
      "rating": rating,
      "summary": e.target.summary.value,
      "body": e.target.body.value,
      "recommend": recommendation,
      "name": e.target.nickname.value,
      "email": e.target.email.value,
      "photos": [],
      "characteristics": charObj,
    }

    // sendReview(tempPostObj);

    console.log(tempPostObj);

    // close();
  };

  // TODO - update this to post to reviews


  return (
    <div id="reviewFormContainer">
      <div id="reviewFormSubContainer">
        <div>
          <h2>{currProductName}</h2>
          <i onClick={() => close()} className="fa-solid fa-x fa-xl" style={{ color: "#ff007b" }}/>
        </div>
        <form onSubmit={(e) => submitHandler(e)} onKeyDown={(e) => checkKeyDown(e)}>
          {/* Overall Rating by Clicking Number of Stars */}
          <label required>Overall Rating<br />
            <div className="newReviewStarRating">
              {renderStars()}
              {(rating !== 0) ? <div>{starMeaning[rating]}</div> : null}
            </div>
          </label>
          {/* Boolean Product Recommendation - utilizes radio buttons */}
          <label id="recommendationForm">Do you recommend this product?<br />
            <label>Yes
              <input type="radio" name="recommendation" value={true} checked={recommendation} onChange={() => updateRecommendation(true)}/>
            </label>
            <label>No
              <input type="radio" name="recommendation" value={false} checked={!recommendation}  onChange={() => updateRecommendation(false)} />
            <br /></label>
          </label>
          {/* Characteristics */}
          <label id="charTitle" required>Characteristics <br />
            <div id="charElement">{renderCharacteristics()}</div>
          </label>
          {/* Text Inputs */}
          <label>Review Summary <br />
            <textarea maxLength="60" name="summary" placeholder="Example: Best purchase ever!" /> <br /></label>
          <label>Review Body <br />
            <textarea maxLength="1000" minLength="50" rows="5" name="body" placeholder="Why did you like the product or not?" required /> <br /></label>
          <label>Nickname<br />
            <input type="text" maxLength="60" name="nickname" placeholder="Example: jackson11!" required /><br />
            <div>For privacy reasons, do not use your full name or email address</div></label>
          <label >E-mail<br />
            <input type="email" maxLength="60" placeholder="Example: jack@email.com" name="email" required /> <br />
            <div>For authentication reasons, you will not be emailed</div></label>
          <button onClick={renderPhotoPage}>Add Photos  </button><br />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  );
};

export default NewReviewForm;
