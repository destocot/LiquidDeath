import React from 'react';
import helpers from '../../../../helpPlease';

function StarsAndReviews({reviewScore, setConfetti}) {
  return (
    <div className="stars-reviews mt-3">
      <div className="stars-container">
        {helpers.reviewStars(reviewScore.score)}
      </div>
      <span className="reviews">
        <a className="review-scroll underline" href="#ratingsReviewsContainerId">
          Read all
          {` ${reviewScore.count} `}
          reviews
        </a>
      </span>
    </div>
  );
}

export default StarsAndReviews;
