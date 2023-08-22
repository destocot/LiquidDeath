import React, { useState } from 'react';
import BigCarousel from './BigCarousel';

function BigImage({currentStyle, img, setImg, styles, setCurrentStyle }) {
  const [zoom, toggleZoom] = useState(false);
  // tracks cursor
  const positionCursor = (e) => {
    e.preventDefault();
    const plusCursor = document.getElementById("plus-cursor");
    const minusCursor = document.getElementById("minus-cursor");
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    if (!zoom) {
      plusCursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    } else {
      minusCursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
  }
  // moves image following cursor
  const positionImage = (e) => {
    // if the gallery exists
    if (document.getElementById('big-gallery')) {
      // get big picture dimensions and container dimensions
      const bigPicBox = document.getElementById("大きい写真").getBoundingClientRect();
      const galleryBox = document.getElementById('big-gallery').getBoundingClientRect();
      // absolute middle point of gallery container relative to the entire viewport
      const pivot = { x: window.innerWidth / 2, y: galleryBox.y + (galleryBox.height / 2)}
      // based on how far you move your mouse from the center, translate the image
      document.getElementById('大きい写真').style.transform = `
      scale(2.5)
      translate(${-((e.clientX - pivot.x) / pivot.x) * (bigPicBox.width / ((bigPicBox.width / pivot.x) * (bigPicBox.width / bigPicBox.height)) * 2.2)}px,
      ${-((e.clientY - pivot.y) / pivot.y) * (bigPicBox.height / ((bigPicBox.height / pivot.y) * (bigPicBox.width / bigPicBox.height)) * 2.25)}px)`;
    }
  }
  return (
    <div id="big-gallery" className="big-image-container">
      { zoom ? <i id="minus-cursor" className=" fa-2xl fa-solid fa-minus"></i> : <i id="plus-cursor" className=" fa-2xl fa-solid fa-plus"></i> }
      <BigCarousel currentStyle={currentStyle} img={img} setImg={setImg} styles={styles} setCurrentStyle={setCurrentStyle} />
      <img
        id={ zoom ? "大きい写真" : ""}
        className="big-image"
        src={img} alt={currentStyle.name}
        draggable="false"
        onMouseMove={ zoom ? (e) => {
          positionCursor(e);
          positionImage(e);
        } : positionCursor}
        onClick={(e) => {
            e.preventDefault();
            if (zoom) {
              document.getElementById('大きい写真').style.transform = `scale(1)`;
            }
            toggleZoom(!zoom);
          }
        }
      />
    </div>
  );
}

export default BigImage;
