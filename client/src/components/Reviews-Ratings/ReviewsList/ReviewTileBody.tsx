import React, { useState }  from 'react';

function ReviewTileBody({review}) {
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
      <div key={photo.id}>
        <img key={photo.id} /*className="reviewPhotos"*/ className="answer-photo aspect-[3/2] max-h-[75px] object-cover border border-solid border-transparent hover:border-[black] cursor-pointer" src={photo.url} alt={`photo${photo.id}`} onClick={() => {
          document.body.style.overflow = 'hidden';
          setFullPhoto(true)
        }}/>
        {
        fullPhoto && <div className="full-answer-photo"><img alt={`fphoto${photo.id}`} src={photo.url} /> <i onClick={() => close()} className="fa-solid fa-x fa-xl" style={{ color: "#00000" }} /> </div>
      }
      </div>
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
