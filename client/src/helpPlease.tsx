import React from 'react';

let helpers = {
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
  defaultCharacteristics: {
    Size: null,
    Width: null,
    Comfort: null,
    Quality: null,
    Length: null,
    Fit: null
  },
  defaultReviewsPostBody: {
    product_id: null,
    rating: null,
    summary: null,
    body: null,
    recommend: null,
    name: null,
    email: null,
    photos: [],
    characteristics: {},
  },
  removeNullValues: (obj) => {
    for (var key in obj) {
      if (!obj[key]) {
        delete obj[key];
      }
    }
    return obj;
  },
  sortHelpfulness: (a, b) => {
    const revA = a.helpfulness;
    const revB = b.helpfulness;
    if (revA < revB) {
      return 1;
    }
    if (revA > revB) {
      return -1;
    }
    return 0;
  },
  sortNewest: (a, b) => {
    const revA = a.date;
    const revB = b.date;
    if (revA < revB) {
      return 1;
    }
    if (revA > revB) {
      return -1;
    }
    return 0;
  },
  // I plan to refactor this to be more concise at some point, but would like to discuss with group if the method does a good job of weighting a rating's recent-ness vs. it's helpfulness
  sortRelevance: (a, b) => {
    let valA;
    let valB;
    const rateA = a.helpfulness;
    const rateB = b.helpfulness;
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

    if (valA < valB) {
      return 1;
    }
    if (valA > valB) {
      return -1;
    }
    return 0;
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
    let productCharArray = Object.keys(productChars); // ['Quality']
    for (var i = 0; i < productCharArray.length; i++) {
      if (!stateObj[productCharArray[i]]) {
        return false;
      }
    }
    return true;
    // stateObj = object
    // product Chars object

    // return boolean
  },

  // creates stars
  reviewStars: (score) => {
    const stars = [];
    // "rounding", using 0.65 and 0.35 for more noticeable impact
    const quarterRound = (num) => {
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
}

export default helpers;
