import React, { useState } from 'react';
import ReviewTileBody from './ReviewTileBody';
import axios from 'axios';
import helpers from '../../../helpPlease';

function ReviewTile({ review }) {
  const reviewStars = helpers.reviewStars;
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
      return <div className="text-lg my-2 text-black]"><i className="fa-solid fa-check fa-beat mr-[2px]" /> I recommend this product</div>;
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
      <div data-testid="helpful-count" className="reviewHelpfulness">
        {`Helpful? `}
        <button type="button" id="helpfulButton" onClick={() => addHelpfulness()} onKeyDown={() => addHelpfulness()}>Yes</button>
        <span>{`(${helpfulness[0]}) | `}</span>
        <button type="button" id="reportButton" onClick={() => reportFunction()} onKeyDown={() => reportFunction()}>{report[0]}</button>
      </div>
    </div>
  );
}

export default ReviewTile;
