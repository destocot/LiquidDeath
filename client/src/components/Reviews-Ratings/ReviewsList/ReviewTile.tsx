import React, { useState } from 'react';
import ReviewTileBody from './ReviewTileBody';
import axios from 'axios';

// issues importing when I put this in the helpers.js file
const reviewStars = (score) => {
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
      const percent = (quarterRound((score - Math.floor(score))) * 18);
      stars.push(<i key={i} className="star fa-regular fa-star" style={{ width: percent, marginRight: 18 - percent }} />);
    } else {
      stars.push(<i key={i} className="empty-star fa-regular fa-star" />);
    }
  }
  return (
    <div className="stars">{stars}</div>
  );
}

function ReviewTile({ review }) {
  // credit to Khurram for these helpfulness/report states!
  const [helpfulness, setHelpfulness] = useState([review.helpfulness, false]);
  const [report, setReport] = useState(['Report', false]);

  const addHelpfulness = () => {
    if (!helpfulness[1]) {
      setHelpfulness([helpfulness[0] + 1, true]);
      // put request
      axios.put(`/reviews/${review.review_id}/helpful`)
        .catch((err) => console.error(err));
    }
  };

  const reportFunction = () => {
    if (!report[1]) {
      setReport(['Reported', true]);
      // put request
      axios.put(`/reviews/${review.review_id}/report`)
        .catch((err) => console.error(err));
    }
  };

  // format dates properly
  const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // const userAndDate = review.reviewer_name + ',  ' + formattedDate;
  const date = formattedDate;

  // if summary > 60 characters, truncate it
  const reviewSummary = () => {
    if (review.summary.length > 60) {
      return review.summary.slice(0, 57) + "...";
    }
    return review.summary;
  };

  // based on whether product recommended, render element
  const reviewRecommend = () => {
    if (review.recommend) {
      // console.log('true');
      return <div className="text-lg my-2 text-[#14532d]"><i className="fa-solid fa-check fa-beat mr-[2px]" /> I recommend this product</div>;
    }
  };

  const reviewResponse = () => {
    if (review.response) {
      return (
        <div className="text-lg p-2">
          <div className="font-semibold">Response from seller: </div>
          <div>{review.response}</div>
        </div>
      )
    }
  }

  return (
    <div className="reviewTile">
      <div className="reviewTileTop">
        <div className="starRating">{reviewStars(review.rating)}</div>
        <div className="topRightReviewTile"><span className="review-tile-user">{review.reviewer_name}</span>{`, ${date}`}
        </div>
      </div>

      <div className="reviewSummary">{reviewSummary()}</div>
      <ReviewTileBody review={review} />
      <div className="reviewRec">{reviewRecommend()}</div>
      <div className="reviewResponse">{reviewResponse()}</div>
      <div className="reviewHelpfulness">
        {`Helpful? `}
        <button type="button" id="helpfulButton" onClick={() => addHelpfulness()} onKeyDown={() => addHelpfulness()}>Yes</button>
        {` (${helpfulness[0]}) | `}
        <button type="button" id="reportButton" onClick={() => reportFunction()} onKeyDown={() => reportFunction()}>{report[0]}</button>
      </div>
    </div>
  );
}

export default ReviewTile;
