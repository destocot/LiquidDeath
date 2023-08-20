import React, { useState, useEffect } from 'react';
import Image from './Image';
import ImageCarousel from './ImageCarousel';

function ImageGallery({currentStyle, setCurrentStyle, styles}) {
  // make states for view and current image
  const [expanded, setExpanded] = useState(false);
  const [img, setImg] = useState(currentStyle.photos[0].url);
  // states for carousel arrows
  const [next, toggleNext] = useState(false);
  const [prev, togglePrev] = useState(false);

  useEffect(() => {
    setImg(currentStyle.photos[0].url)
  }, [currentStyle])
  /*
  Strategy:
  - Overlay an image gallery onto the left side of the default view image
  - Image gallery should contain 7 images at a time
  - Make a state for the selected image
  - Selected image default state is the first image in the photos array for that style
  - When an image in the carousel is clicked it sets the selected image state to that image
  - Image carousel should have arrow buttons on the sides
  - When an arrow button is clicked, it moves to the next/prev image in the photos array
  - First image and last image have only one arrow
  - Make up arrow and down arrow states? If state is true, that arrow appears. Set up arrow to false
    when on the first image, and set down arrow to false when on the last image
  - Create an animation that makes it seem like the carousel is rotating when moving images
  - Overlay onto default view a full screen button in top right corner
  - When this is clicked, set image view state to 'expanded'
  - overlays product info, makes traditional carousel disappear
  - Instead adds circles at the bottom that represent the images.
  - This 'horizontal carousel of circles' will have arrows that function similarly to the carousel
  - When a circle is clicked, it expands to show that you are on that image
  - Circles correspond to images, like the aforementioned carousel
  - animation that closes default image viewer and opens expanded image viewer?
  */
  return (
    <div className="image-gallery-container">
      { expanded ?
      null
      :
      <>
        {currentStyle === styles[0] ? null :
          <div className="carousel-arrow-btn up-arrow">
            <i className="carousel-arrow fa-solid fa-angle-up"></i>
          </div>
        }
        <div className="carousel-container">
          <ImageCarousel
            next={next}
            prev={prev}
            styles={styles}
            currentStyle={currentStyle}
            img={img}
            setImg={setImg}
            setCurrentStyle={setCurrentStyle}
          />
        </div>
        {currentStyle === styles[styles.length - 1] ? console.log('this is true') :
          <div className="carousel-arrow-btn down-arrow">
            <i className="carousel-arrow fa-solid fa-angle-down"></i>
          </div>
        }
        <Image
          currentStyle={currentStyle}
          img={img}
        />
      </>
      }
    </div>
  );
}

export default ImageGallery;
