import React from 'react';
import BigCarousel from './BigCarousel';

function BigImage({currentStyle, img, setImg, styles, setCurrentStyle}) {
  return (
    <div className="big-image-container">
      <BigCarousel currentStyle={currentStyle} img={img} setImg={setImg} styles={styles} setCurrentStyle={setCurrentStyle} />
      <img className="big-image" src={img} alt={currentStyle.name} draggable="false" />
    </div>
  );
}

export default BigImage;
