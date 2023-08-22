import React, { useState, useEffect } from 'react';
import Image from './Image';
import ImageCarousel from './ImageCarousel';
import BigImage from './BigImage';

function ImageGallery({currentStyle, setCurrentStyle, styles, view, toggleExpand, windowSize }) {
  // make states for view and current image
  const [img, setImg] = useState(currentStyle.photos[0].url);
  // states for default carousel arrows
  const [up, toggleUp] = useState(false);
  const [down, toggleDown] = useState(false);

  useEffect(() => {
    setImg(currentStyle.photos[0].url)
  }, [currentStyle])

  return (
    <>
      { view === 'expanded' ?
        <div id="expanded-gallery-container">
          <div className="default-arrow" onClick={() => toggleExpand(false)}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <BigImage
            currentStyle={currentStyle}
            img={img}
            setImg={setImg}
            styles={styles}
            setCurrentStyle={setCurrentStyle}
            windowSize={windowSize}
          />
        </div>
      :
        <div id="image-gallery-container">
          {currentStyle === styles[0] ? null :
            <div className="carousel-arrow-btn up-arrow" onClick={() => toggleUp(!up)}>
              <i className="carousel-arrow fa-solid fa-angle-up"></i>
            </div>
          }
            <div className="expand-arrow" onClick={() => toggleExpand(true)}>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          <div className="carousel-container">
            <ImageCarousel
              up={up}
              down={down}
              toggleUp={toggleUp}
              toggleDown={toggleDown}
              styles={styles}
              currentStyle={currentStyle}
              img={img}
              setImg={setImg}
              setCurrentStyle={setCurrentStyle}
            />
          </div>
          {currentStyle === styles[styles.length - 1] ? null :
            <div className="carousel-arrow-btn down-arrow" onClick={() => toggleDown(!down)} >
              <i className="carousel-arrow fa-solid fa-angle-down"></i>
            </div>
          }
          <Image
            currentStyle={currentStyle}
            img={img}
            toggleExpand={toggleExpand}
          />
        </div>
      }
    </>
  );
}

export default ImageGallery;
