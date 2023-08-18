import React, { useState, useEffect } from 'react';
import axios from 'axios';
import helpers from '../../../helpPlease';

const characteristicLabels = helpers.characteristicLabels;
const starMeaning = helpers.starMeaning;
const charChecker = helpers.charChecker;
const removeNullValues = helpers.removeNullValues;

function NewReviewForm({ setAForm, reviewsMeta, currProductName, currProductId }) {
  const [rating, setRating] = useState(0);
  const [recommendation, setRecommendation] = useState(true);
  const [charObj, setCharObj] = useState({});
  const [photoUrlArray, setPhotoUrlArray] = useState([]);

  const updateRecommendation = (value) => {
    setRecommendation(value);
  };

  const updateCharacteristics = (key, value) => {
    const newCharacteristics = { ...charObj, [key]: value };
    setCharObj(newCharacteristics);
  };

  // Form Controls
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

  const imageChecker = (e) => {
    ('click');
    const files = e.target.files;
    let tempFileArray = [];
    // console.log(files);
    let imageDiv = document.getElementById('rev-images-div');
    imageDiv.innerHTML = '';

    if (files.length > 5) {
      alert('You can only upload up to 5 photos!');
      e.target.value = '';
    } else {
      for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        tempFileArray.push('client/dist/Images/' + files[i].name);
        reader.addEventListener("load", (event) => {
          const picFile = event.target;
          const div = document.createElement('div');
          div.innerHTML = `<img className="thumbnail" src="${picFile.result}" alt="${files[i].name}" />`;
          imageDiv?.appendChild(div);
        })
        reader.readAsDataURL(files[i])
        // console.log('tempArray: ', tempFileArray);
        setPhotoUrlArray(tempFileArray);
      }
    }
  };

  const sendReview = (data) => {
    axios.post('/reviews/newreview', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .catch(() => ('error posting question'));
  }

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

    const formData = new FormData();
    formData.append("product_id", currProductId);
    formData.append("rating", rating);
    formData.append("summary", e.target.summary.value);
    formData.append("body", e.target.body.value);
    formData.append("recommend", recommendation);
    formData.append("name", e.target.nickname.value);
    formData.append("email", e.target.email.value);
    // formData.append("photos", JSON.stringify(photoUrlArray));
    formData.append("characteristics", JSON.stringify(charObj));

    const imageInput = document.getElementById('reviewPhotos'); // Adjust the ID accordingly
    const imageFiles = imageInput.files;
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('imageFiles', imageFiles[i]);
    }

    sendReview(formData);
    // close();
  };

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
            <textarea maxLength="1000" /*minLength="50"*/ rows="5" name="body" placeholder="Why did you like the product or not?" required /> <br /></label>
          <label className="reviewFormSectionHeader" >Nickname<br />
            <input type="text" maxLength="60" name="nickname" placeholder="Example: jackson11!" required /><br />
            <div className="reviewFormWarning">For privacy reasons, do not use your full name or email address</div></label>
          <label className="reviewFormSectionHeader">E-mail<br />
            <input type="email" maxLength="60" placeholder="Example: jack@email.com" name="email" required /> <br />
            <div className="reviewFormWarning">For authentication reasons, you will not be emailed</div></label>
            <div id="rev-images-div" className="flex"></div>
          <div className="reviewFormbuttons">
            <input id="reviewPhotos" type="file" name="photos" accept="image/png, image/jpeg" onChange={(e) => imageChecker(e)} multiple />
            <input id="submitButton" type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReviewForm;
