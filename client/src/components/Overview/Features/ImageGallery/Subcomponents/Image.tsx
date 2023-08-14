import React from 'react';

function Image({styles}) {
  console.log('styles', styles);
  return (
    <div className="default-image-container">
      <img className="default-image" src={styles[0].photos[0].url} alt={styles[0].name} />
    </div>
  );
}

export default Image;
