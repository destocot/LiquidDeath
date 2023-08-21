import React, { useEffect } from 'react';

function BigCarousel({currentStyle, img, setImg, styles, setCurrentStyle}) {
  const photos = styles.map((style) => {
    return (
      <i
      className={currentStyle.style_id === style.style_id ? "big-active fa-2xl big-select fa-solid fa-circle" : "big-select fa-solid fa-xl fa-circle"}
      key={style.style_id}
      onClick={(e) => {
        setImg(style.photos[0].url);
        setCurrentStyle(style);
      }}
    />
    )
  })
  return (
    <div className="big-carousel-container">
      {photos}
    </div>
  );
}

export default BigCarousel;