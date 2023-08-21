import React from 'react';

function BigImage({currentStyle, img}) {
  return (
    <div className="big-image-container">
      <img className="big-image" src={img} alt={currentStyle.name} draggable="false" />
    </div>
  );
}

export default BigImage;
