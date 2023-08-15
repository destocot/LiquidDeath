import React from 'react';
import helpers from '../../../../helpPlease';

function StarsAndReviews({reviewScore}) {
  return (
    <div className="stars-reviews">
      <div className="stars-container">
        {helpers.reviewStars(reviewScore.score)}
      </div>
      <span className="reviews">
        <a className="review-scroll" href="#ratingsReviewsContainerId">
          Read all
          {` ${reviewScore.count} `}
          reviews
        </a>
      </span>
    </div>
  );
}

export default StarsAndReviews;
