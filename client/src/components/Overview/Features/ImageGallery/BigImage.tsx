import React, { useState } from 'react';
import BigCarousel from './BigCarousel';

function BigImage({currentStyle, img, setImg, styles, setCurrentStyle}) {
  const [zoom, setZoom] = useState(false);
  const plusCursor = document.getElementById("plus-cursor");
  const minusCursor = document.getElementById("minus-cursor");
  const positionCursor = (e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    if (!zoom) {
      plusCursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    } else {
      minusCursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
  }
  return (
    <div className="big-image-container">
      { zoom ? <i id="minus-cursor" className=" fa-2xl fa-solid fa-minus"></i> : <i id="plus-cursor" className=" fa-2xl fa-solid fa-plus"></i> }
      <BigCarousel currentStyle={currentStyle} img={img} setImg={setImg} styles={styles} setCurrentStyle={setCurrentStyle} />
      <img
        className="big-image"
        src={img} alt={currentStyle.name}
        draggable="false"
        onMouseMove={positionCursor}
      />
    </div>
  );
}

export default BigImage;
