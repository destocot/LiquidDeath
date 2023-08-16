import React from 'react';
import helpers from '../../../../helpPlease';

function StyleSelector({styles, currentStyle, setCurrentStyle}) {
  return (
    <div>
      <h2 className="style-title">{currentStyle.name}</h2>
      <div className="style-selector-container">
        {helpers.styleMatrix(styles, setCurrentStyle)}
      </div>
    </div>
  )
};


export default StyleSelector;
