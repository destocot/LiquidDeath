import React from 'react';
import Image from './Subcomponents/Image';

function ImageGallery({currentStyle}) {
  return (
    <div className="image-gallery-container">
      <Image currentStyle={currentStyle} />
    </div>
  );
}

export default ImageGallery;
