import React from 'react';

function Image({currentStyle, img, toggleExpand}) {
  return (
    <div className="default-image-container">
      <img className="default-image" src={img} alt={currentStyle.name} draggable="false" onClick={() => toggleExpand(state => !state)}/>
    </div>
  );
}

export default Image;
