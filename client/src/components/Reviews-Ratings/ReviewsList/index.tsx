import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile';
import Sorting from './Sorting';
import NewReviewForm from '../ReviewForm';
import helpers from '../../../helpPlease';
const sumHelper = helpers.sumHelper;


function ReviewsList({ filteredReviews, filters, reviewsMeta, currProductName, currProductId, updReviews }) {

  let moreButton;
  const [listLength, setListLength] = useState(2);
  const [aForm, setAForm] = useState(false);

  useEffect(() => {
    setListLength(2);
  }, [filteredReviews])

  // renders 2 review tiles at a time using .slice and the listLength state
  const reviewTile = () => {
    return filteredReviews.map((review) =>
      <div key={review.review_id} className="bg-white/[0.1] my-[2px]"><ReviewTile review={review} /></div>).slice(0, listLength);
  };

  // increases listLength by 2, in turn rendering two more elements
  const handleClick = () => {
    const prevLength = listLength;
    setListLength(prevLength + filteredReviews.length - 2);
  };

  // decides whether or not button should be rendered based on length of results
  if (filteredReviews.length > 2 && listLength < filteredReviews.length) {
    moreButton = <button id="moreReviewsButton" type="button" onClick={handleClick}>More Reviews</button>;
  } else {
    moreButton = null;
  }

  return (
    <div className="reviewsListContainer">
      <div className="flex justify-between text-2xl items-end border-b-2 pb-[5px]">
        <span className="font-bold">{`${sumHelper(Object.values(reviewsMeta.ratings))} `}
          <span className="font-normal">Total Reviews</span>
        </span>
        <Sorting filteredReviews={filteredReviews} updReviews={updReviews} />
      </div>
      <div className="reviewsList">
        {reviewTile()}
      </div>
      <div id="reviewsListButtons">
        {moreButton}
        <NewReviewForm setAForm={setAForm} reviewsMeta={reviewsMeta} currProductName={currProductName} currProductId={currProductId} />
      </div>
    </div>
  );
}

export default ReviewsList;
