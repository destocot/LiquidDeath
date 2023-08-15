import React from 'react';

function StarsAndReviews({reviewScore}) {
    // creates stars
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
    }
  return (
    <div className="stars-reviews">
      <div className="stars-container">
        {reviewStars(reviewScore.score)}
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
