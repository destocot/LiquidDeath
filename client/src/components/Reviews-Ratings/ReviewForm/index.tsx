import React, { useState, useEffect } from 'react';
import axios from 'axios';
import helpers from '../../../helpPlease';

// destructuring not working after moving to helpPlease.tsx
const characteristicLabels = helpers.characteristicLabels;
const starMeaning = helpers.starMeaning;
// const sumHelper = helpers.sumHelper;
const charChecker = helpers.charChecker;
// const defaultCharacteristics = helpers.defaultCharacteristics;
// const defaultReviewPostBody = helpers.defaultReviewPostBody;
const removeNullValues = helpers.removeNullValues;

// main function
function NewReviewForm({ setAForm, reviewsMeta, currProductName, currProductId }) {
  const [rating, setRating] = useState(0);
  const [recommendation, setRecommendation] = useState(true);
  const [charObj, setCharObj] = useState({});

  // used to update the boolean recommend
  const updateRecommendation = (value) => {
    setRecommendation(value);
  };

  // update characteristics
  const updateCharacteristics = (key, value) => {
    const newCharacteristics = { ...charObj, [key]: value };
    ('updated: ', newCharacteristics);
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
    return Object.keys(reviewsMeta.characteristics).map((charName) => {
      const currCharId = reviewsMeta.characteristics[charName].id;
      const currCharValue = charObj[currCharId];
      return (
        <div key={currCharId} data-testid="review-form-parent-id" id="charLabel">{charName}
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

    if (rating === 0) {
      alert('Rating must be given.');
      return;
    }

    if (!charChecker(charObj, reviewsMeta.characteristics)) {
      alert('Characteristics must be selected.');
      return;
    }

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

    sendReview(tempPostObj);
    close();
  };

  return (
    <div className="reviewFormContainer">
      <div className="reviewFormSubContainer">
        <div id="reviewFormHeader">
          <h2 id="reviewFormTitle">{currProductName}</h2>
          <i onClick={() => close()} className="fa-solid fa-x fa-xl" style={{ color: "#ff007b" }}/>
        </div>
        <form onSubmit={(e) => submitHandler(e)} onKeyDown={(e) => checkKeyDown(e)}>
          {/* Overall Rating by Clicking Number of Stars */}
          <label className="reviewFormSectionHeader"required>Overall Rating<br />
            <div className="newReviewStarRating">
              {renderStars()}
              {(rating !== 0) ? <div>{starMeaning[rating]}</div> : null}
            </div>
          </label>
          {/* Boolean Product Recommendation - utilizes radio buttons */}
          <label className="reviewFormSectionHeader" id="recommendationForm">Do you recommend this product?<br />
            <label>Yes
              <input id="buttonLeft" type="radio" name="recommendation" value={true} checked={recommendation} onChange={() => updateRecommendation(true)}/>
            </label>
            <label>No
              <input id="buttonRight" type="radio" name="recommendation" value={false} checked={!recommendation}  onChange={() => updateRecommendation(false)} />
            <br /></label>
          </label>
          {/* Characteristics */}
          <label id="charTitle" className="reviewFormSectionHeader" required>Characteristics <br />
            <div id="charElement">{renderCharacteristics()}</div>
          </label>
          {/* Text Inputs */}
          <label className="reviewFormSectionHeader" >Review Summary <br />
            <textarea maxLength="60" name="summary" placeholder="Example: Best purchase ever!" /> <br /></label>
          <label className="reviewFormSectionHeader" >Review Body <br />
            <textarea maxLength="1000" minLength="50" rows="5" name="body" placeholder="Why did you like the product or not?" required /> <br /></label>
          <label className="reviewFormSectionHeader" >Nickname<br />
            <input type="text" maxLength="60" name="nickname" placeholder="Example: jackson11!" required /><br />
            <div className="reviewFormWarning">For privacy reasons, do not use your full name or email address</div></label>
          <label className="reviewFormSectionHeader">E-mail<br />
            <input type="email" maxLength="60" placeholder="Example: jack@email.com" name="email" required /> <br />
            <div className="reviewFormWarning">For authentication reasons, you will not be emailed</div></label>
          <div className="reviewFormbuttons">
          <input id="reviewPhotos" type="file" name="photos" accept="image/png, image/jpeg" onChange={(e) => renderPhotoPage()} multiple />
            {/* <button id="photoInputButton"onClick={renderPhotoPage}>Add Photos </button><br /> */}
            <input id="submitButton" type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReviewForm;
