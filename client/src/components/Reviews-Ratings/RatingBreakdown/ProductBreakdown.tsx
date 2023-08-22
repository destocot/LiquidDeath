import React from 'react';
import { ReviewsRatingsProps, RefObj } from '../types';
import helpers from '../../../helpPlease';
const refObj: RefObj = helpers.refObj;

const ProductBreakdown: React.FC<ReviewsRatingsProps> = ({ reviewsMeta }) => {
  const { characteristics } = reviewsMeta;
  console.log(characteristics);

  return (
    <div className="productBreakdown">
      {Object.keys(characteristics).map((char) => {
        const charValue = Number(characteristics[char].value);
        const charPercent = (charValue / 5) * 100;
        const pointerPosition = charPercent.toString().concat('', '%');
        const lowValue = refObj[char].low;
        const highValue = refObj[char].high;

        return (
          <div key={char} className="productBreakdownIndividual">
            <p className="text-lg font-serif font-semibold ">{char}</p>
            <div className="pointer" data-value={charValue} style={
              {
                "marginLeft": pointerPosition,
                "width": 0,
                "height": 0,
                "borderLeft": "5px solid transparent",
                "borderRight": "5px solid transparent",
                "borderTop": "10px solid black",
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
      })
      }
    </div>
  );
}

export default ProductBreakdown;
