import React from 'react';
import Sharing from './Sharing';

function Description({product}) {
  return (
    <div>
      <div className="description-left">
        <span className="slogan font-bold font-size text-[120%]">{product.slogan}</span>
        <p className="description-text">{product.description}</p>
        <Sharing />
      </div>
      <div className="vertical-line"></div>
      <div className="description-right">
          <div className="d-checkbox">
            <i className="fa-solid fa-check fa-beat" /><span className="check-text">Liquid Death forever</span>
          </div>
          <div className="d-checkbox">
          <i className="fa-solid fa-check fa-beat" /><span className="check-text">The rebel of the beverage world</span>
          </div>
          <div className="d-checkbox">
          <i className="fa-solid fa-check fa-beat" /><span className="check-text">100% recyclable</span>
          </div>
          <div className="d-checkbox">
          <i className="fa-solid fa-check fa-beat"/><span className="check-text">Death to thirst!</span>
          </div>
      </div>
    </div>

  );
}

export default Description;