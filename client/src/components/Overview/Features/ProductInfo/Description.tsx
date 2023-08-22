import React from 'react';
import Sharing from './Sharing';
import helpers from '../../../../helpPlease';

function Description({product}) {
  const productMottos = helpers.productMottos;
  const descriptionArray = productMottos[product.category];
  return (
    <div>
      <div className="description-left">
        <span className="slogan font-bold font-size text-[120%]">{product.slogan}</span>
        <p className="description-text">{product.description}</p>
        <Sharing />
      </div>
      <div className="vertical-line"></div>
      <div className="description-right">
        {
          descriptionArray.map((motto) => {
            return (
              <div className="d-checkbox">
                    <i className="fa-solid fa-check fa-beat" /><span className="check-text">{motto}</span>
                  </div>
            )
          })
        }
      </div>
    </div>

  );
}

export default Description;