import React from 'react';
import helpers from '../../../helpPlease';
const refObj = helpers.refObj;

function ProductBreakdown({ reviewsMeta }) {
  const { characteristics } = reviewsMeta;

  const renderCharBreakdown = Object.keys(characteristics).map((char) => {
    const charValue = Number(characteristics[char].value);
    const charPercent = (charValue / 5) * 100;
    const pointerPosition = charPercent.toString().concat('', '%');
    const lowValue = refObj[char].low;
    const highValue = refObj[char].high;

    return (
      <div key={char} className="productBreakdownIndividual">
        <p className="text-lg font-serif font-semibold ">{char}</p>
        <div name="triangle" className="pointer" value={charValue} style={
          {
          "marginLeft": pointerPosition,
          "width": 0,
          "height": 0,
          "borderLeft": "5px solid transparent",
          "borderRight": "5px solid transparent",
          "borderTop": "10px solid #000000",
          }
        }>
        </div>
        <div className="productBreakdownScale"></div>
        <div className="productBreakdownLabels">
          <p className="productBreakdownLabelsLow">{lowValue}</p>
          <p className="productBreakdownLabelsHigh">{highValue}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="productBreakdown">
      {renderCharBreakdown}
    </div>
  );
}

export default ProductBreakdown;
