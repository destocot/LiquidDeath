import React from 'react';

function Image({currentStyle}) {
  return (
    <div className="default-image-container">
      <img className="default-image" src={currentStyle.photos[0].url} alt={currentStyle.name} />
    </div>
  );
}

export default Image;
