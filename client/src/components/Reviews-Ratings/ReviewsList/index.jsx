import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile';
import Sorting from './Sorting';
import NewReviewForm from '../ReviewForm';

function ReviewsList({ filteredReviews, filters, reviewsMeta, currProductName }) {
  // console.log('filteredReviews: ', filteredReviews);
  let moreButton;
  const [listLength, setListLength] = useState(2);
  const [aForm, setAForm] = useState(false);
  const [sortedFilteredReviews, setSortedFilteredReviews] = useState(filteredReviews);

  // create this function to allow child components to update sortedFilteredReviews
  const updateSetSortedFilteredReviews = (sortedArray) => {
    setSortedFilteredReviews(sortedArray);
  };

  // this is used to re-render the list when filteres from rating breakdown are applied
  useEffect(() => {
    setSortedFilteredReviews(filteredReviews);
  }, [filters]);

  // renders 2 review tiles at a time using .slice and the listLength state
  const reviewTile = () => {
    // console.log('reviewTile is re-rendering');
    return sortedFilteredReviews.map((review) =>
    <div key={review.review_id}><ReviewTile review={review} /></div>).slice(0, listLength);
  };

  // increases listLength by 2, in turn rendering two more elements
  const handleClick = () => {
    const prevLength = listLength;
    setListLength(prevLength + 2);
  };

  // decides whether or not button should be rendered based on length of results
  if (sortedFilteredReviews.length > 2 && listLength < sortedFilteredReviews.length ) {
    moreButton = <button id="moreReviewsButton" type="button" onClick={handleClick}>More Reviews</button>;
  } else {
    moreButton = null;
  }

  const addReviewButton = () => <button type="button" id="addReviewButton" onClick={() => setAForm(true)} >Add Review</button>

  return (
    <div className="reviewsListContainer">
      <h3>Reviews List</h3>
        <Sorting sortedFilteredReviews={sortedFilteredReviews} updateSetSortedFilteredReviews={updateSetSortedFilteredReviews} />
      <div className="reviewsList">
        {/* TESTING ONLY <NewReviewForm setAForm={setAForm} reviewsMeta={reviewsMeta} /> */}
        {reviewTile()}
      </div>
      <div id="reviewsListButtons">
        {moreButton}
        {addReviewButton()}
        { aForm ? (<NewReviewForm setAForm={setAForm} reviewsMeta={reviewsMeta} currProductName={currProductName}/>) : null}
      </div>
    </div>
  );
}

export default ReviewsList;