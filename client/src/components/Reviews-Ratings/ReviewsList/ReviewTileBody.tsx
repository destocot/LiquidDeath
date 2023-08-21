import React, { useState } from 'react';
import Popup from 'reactjs-popup';

function ReviewTileBody({ review }) {
  const reviewLen = review.body.length;
  const [expandBody, setExpandBody] = useState(reviewLen > 250);
  const [buttonText, setButtonText] = useState('Show More');
  const [fullPhoto, setFullPhoto] = useState(false);

  const close = () => {
    document.body.style.overflow = 'visible';
    setFullPhoto(false);
  }

  // expand body of review with button, utilizes expandBody state
  const helpExpandBody = () => {
    if (buttonText === 'Show More') {
      setButtonText('Show Less');
    } else {
      setButtonText('Show More');
    }
    setExpandBody(!expandBody);
  };

  // if body > 250 characters, truncate it
  const renderBodyText = () => {
    if (expandBody) {
      return review.body.slice(0, 247) + "...";
    }
    return review.body;
  };

  // render showMoreButton only if body has to be truncated
  const showMoreButton = () => {
    if (reviewLen > 250) {
      return <button className="expandReviewTextButton" onClick={helpExpandBody} type="button">{buttonText}</button>;
    }
    return null;
  };

  // map photos into review body. will add onto this at later time
  const renderPhotos = () => review.photos.map((photo) => {
    return (
      <Popup Popup trigger={<img className="answer-photo aspect-[3/2] max-h-[80px] object-cover border border-solid border-transparent hover:border-[black] cursor-pointer" key={photo.id} alt={`photo${photo.id}`} src={photo.url} />} modal >
        {(close) => (
          <div className="popup-modal-container">
            <img
              className="max-w-[98vw] max-h-[98vh] absolute top-0 bottom-0 right-0 left-0 m-auto"
              alt={`fphoto${photo.id}`}
              src={photo.url} />
            <i
              className="fa-regular fa-circle-xmark fa-2xl cursor-pointer absolute z-[2] top-[4vh] right-[4vh] hover:text-[36px] text-[30px]"
              onClick={close} />
          </div>
        )
        }
    </Popup >
    )
  });

  return (
    <div className="reviewBody">
      <div className="reviewBodyText">{renderBodyText()}</div>
      {showMoreButton()}
      <div className="flex">
        {renderPhotos()}
      </div>
    </div>
  );
}

export default ReviewTileBody;
