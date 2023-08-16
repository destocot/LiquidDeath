import React from 'react';
import helpers from '../../../../helpPlease';

function StyleSelector({styles, currentStyle, setCurrentStyle}) {
  return (
    <div>
      <div className="style-title">{currentStyle.name}</div>
      <div className="style-selector-container">
        {helpers.styleMatrix(styles, setCurrentStyle)}
      </div>
    </div>
  )
};


export default StyleSelector;
