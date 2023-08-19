import React from 'react';
import { Recommended } from './components/Reviews-Ratings/types';

let helpers = {
  recommended: (obj: Recommended) => {
    let total = helpers.sumHelper(Object.values(obj));
    let decimal = Number(obj.true) * 100 / total;
    let decimalNew = decimal.toFixed(0);
    let decimalString = decimalNew.toString();
    return decimalString + '%';
  },
  calcAvgRating: (ratingsObj) => {
    if (Object.keys(ratingsObj).length > 0) {
      let sumOfRatings = 0;
      let product = 0;
      for (var key in ratingsObj) {
        let rating = key;
        let numberOfRatings = Number(ratingsObj[key]);
        product += rating * numberOfRatings;
        sumOfRatings += numberOfRatings;
      }
      let avgRating = product / sumOfRatings;
      avgRating = Math.round(avgRating * 10) / 10;
      return avgRating;
    }
  },
  reviewScore: (meta) => {
    let totalCount = 0;
    let totalScore = 0;
    for (const [score, count] of Object.entries(meta.ratings)) {
      totalCount += Number(count);
      totalScore += Number(score) * Number(count);
    }
    if (totalCount === 0) {
      return null;
    }
    return { score: totalScore / totalCount, count: totalCount };
  },
  starMeaning: {
    1: "Poor",
    2: "Fair",
    3: "Average",
    4: "Good",
    5: "Great"
  },
  characteristicLabels: {
    Size: {
      1: 'A size too small',
      2: '1/2 a size too small',
      3: 'Perfect',
      4: '1/2 a size too big',
      5: 'A size too wide'
    },
    Width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide'
    },
    Comfort: {
      1: 'Uncomfortable',
      2: 'Slightly uncomfortable',
      3: 'OK',
      4: 'Comfortable',
      5: 'Perfect'
    },
    Quality: {
      1: 'Poor',
      2: 'Below average',
      3: 'What I expected',
      4: 'Pretty great',
      5: 'Perfect'
    },
    Length: {
      1: 'Runs Short',
      2: 'Runs slightly short',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long'
    },
    Fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long'
    },
  },
  refObj: {
    Size: { low: 'A size too small', high: 'A size too wide' },
    Width: { low: 'Too narrow', high: 'Too wide' },
    Comfort: { low: 'Uncomfortable', high: 'Perfect' },
    Quality: { low: 'Poor', high: 'Perfect' },
    Length: { low: 'Runs short', high: 'Runs long' },
    Fit: { low: 'Runs tight', high: 'Runs long' },
  },
  removeNullValues: (obj) => {
    for (var key in obj) {
      if (!obj[key]) {
        delete obj[key];
      }
    }
    return obj;
  },
  scaleValue: (value, oldMin, oldMax, newMin, newMax) => {
    return ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
  },
  findMinMaxArray: (arrayOfObjects) => {
    let tempArray = arrayOfObjects.map((obj) => obj.helpfulness);
    return {
      min: Math.min(...tempArray),
      max: Math.max(...tempArray),
    }
  },
  sortRelevance: (arrayOfObjects) => {
    // console.log('prior to sort: ', arrayOfObjects);
    var helpRange = helpers.findMinMaxArray(arrayOfObjects);
    var result =  arrayOfObjects.sort((a, b) => {
      let valA;
      let valB;

      let rateA = a.helpfulness;
      // console.log('original helpfulness rating: ', rateA);
      let rateB = b.helpfulness;
      if (rateA === 0) {
        rateA = 1;
      }
      if (rateB === 0) {
        rateB = 1;
      }
      // rateA = helpers.scaleValue(rateA, 1, helpRange.max, 1, 5);
      // rateB = helpers.scaleValue(rateB, 1, helpRange.max, 1, 5);
      // console.log('scaled helpfulness: ', rateA);
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const currentDate = new Date();
      // translate to value of 1 - 5
      // divide by constant to convert from ms to days
      const daysFromNowA = (currentDate - dateA) / 86400000;
      const daysFromNowB = (currentDate - dateB) / 86400000;

      // this essentially translates the date into a 1 - 5 numbers
      if (daysFromNowA <= 90) {
        valA = 5 * rateA;
      } else if (daysFromNowA <= 180) {
        valA = 4 * rateA;
      } else if (daysFromNowA <= 270) {
        valA = 3 * rateA;
      } else if (daysFromNowA <= 360) {
        valA = 2 * rateA;
      } else {
        valA = rateA;
      }

      if (daysFromNowB <= 90) {
        valB = 5 * rateB;
      } else if (daysFromNowB <= 180) {
        valB = 4 * rateB;
      } else if (daysFromNowB <= 270) {
        valB = 3 * rateB;
      } else if (daysFromNowB <= 360) {
        valB = 2 * rateB;
      } else {
        valB = rateB;
      }

      // console.log({rateA, daysFromNowA, valA});

      if (valA < valB) {
        return 1;
      }
      if (valA > valB) {
        return -1;
      }
      return 0;
      });
    // console.log('after sort: ', result);
    return result;
  },
  sumHelper: (array) => {
    let sum = 0;
    for (var i = 0; i < array.length; i++) {
      var currentElem = array[i];
      if (typeof array[i] === 'string') {
        currentElem = Number(currentElem);
      }
      sum += currentElem;
    }
    return sum;
  },
  charChecker: (stateObj, productChars) => {
    let productCharArray = Object.values(productChars);
    /* productCharArray = [
     * { id: 14, value: '4.0'},
     * { id: 15, value: '3.5'},
     * ];
     */
    for (var i = 0; i < productCharArray.length; i++) {
      let id = productCharArray[i].id;
      if (!stateObj[id]) {
        return false;
      }
    }
    return true;
  },

  reviewStars: (score: number = 5) => {
    const stars = [];
    // "rounding", using 0.65 and 0.35 for more noticeable impact
    const quarterRound = (num: number) => {
      let quarters;
      if (num > 0.625) {
        quarters = 0.65;
      } else if (num > 0.375) {
        quarters = 0.5;
      } else {
        quarters = 0.35;
      }
      return quarters;
    };
    // adds to stars array
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(score)) {
        stars.push(<i key={i} className="star fa-regular fa-star" />);
      } else if (i - Math.floor(score) < 1 && i - score !== 0) {
        // using base fa-star fontsize (18px)
        const percent = (quarterRound((score - Math.floor(score))) * 18);
        stars.push(<i key={i} className="star fa-regular fa-star"
          style={{ width: percent, marginRight: 18 - percent }} />
        );
      } else {
        stars.push(<i key={i} className="empty-star fa-regular fa-star" />);
      }
    }
    return (
      <div className="stars">{stars}</div>
    );
  },

  // checks for sales prices, sets price or sale price
  priceChecker: (currentStyle) => {
    if (currentStyle.sale_price === null) {
      return (
        <p className="price">
          $
          {currentStyle.original_price}
        </p>
      );
    }
    return (
      <p className="price">
        <span className="original-price">
          $
          {currentStyle.original_price}
        </span>
        $
        {currentStyle.sale_price}
      </p>
    );
  },
  // creates matrix with style rows
  styleMatrix: (styles, currentStyle, setCurrentStyle) => {
    // creates overlayed checkmark
    let selected = () => (
      <div className="fa-stack">
        <i className="solid-check fa-solid fa-lg fa-circle-check fa-stack-1x" />
        <i className="regular-check fa-regular fa-lg fa-circle-check fa-stack-1x" />
      </div>
    )
    let row = [];
    let matrix = [];
    styles.forEach((style, i) => {
      row.push(
      <li key={style.style_id} className="style-list-item">
        <div className="style" >
          <img
            id={i}
            alt={style.name}
            className="style-thumbnail"
            src={style.photos[0].thumbnail_url}
            onClick={setCurrentStyle}
            draggable="false"
          />
          {currentStyle.style_id === style.style_id ? selected() : null}
        </div>
      </li>
      );
      if (row.length === 4) {
        matrix.push(<ul key={matrix.length} className="style-row">{row}</ul>)
        matrix.push(<div key={`break${matrix.length}`} className="break"></div>)
        row = [];
      } else if (i === styles.length - 1) {
        matrix.push(<ul key={matrix.length} className="style-row">{row}</ul>)
      }
    });
    return matrix;
  },
  // parses form inputs for their values and builds a request body (input arg is e.target.elements)
  formParser: (formNodes) => {
    formNodes = Array.from(formNodes);
    let reqBody = {};
    formNodes.forEach((node) => {
      if (node.value) {
        reqBody[node.name] = node.value;
      }
    })
    return reqBody;
  },
}

export default helpers;
