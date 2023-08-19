import React from 'react';

function Image({currentStyle, img}) {
  return (
    <div className="default-image-container">
      <img className="default-image" src={img} alt={currentStyle.name} draggable="false" />
    </div>
  );
}

export default Image;
