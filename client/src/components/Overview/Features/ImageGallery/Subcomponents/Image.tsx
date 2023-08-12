import React from 'react';

function Image({styles}) {
  return (
    <div className="default-image-container">
      <img className="default-image" src={styles[1].photos[1].url} alt={styles[1].name} />
    </div>
  );
}

export default Image;
