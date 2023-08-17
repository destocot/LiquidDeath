import React from 'react';

function StyleSelector({styles, currentStyle, setCurrentStyle}) {
  // creates overlayed checkmark
  const selected = () => (
    <div className="fa-stack">
      <i className="solid-check fa-solid fa-lg fa-circle-check fa-stack-1x" />
      <i className="regular-check fa-regular fa-lg fa-circle-check fa-stack-1x" />
      {/* <i className="fa-solid fa-lg fa-circle-check"></i> */}
    </div>
  );
  // creates matrix with style rows
  const styleMatrix = () => {
    let row = [];
    let matrix = [];
    styles.forEach((style, i) => {
      row.push(
      <li key={style.style_id} className="style-list-item">
        <div className="style" >
          <img
            id={i}
            alt={style.name}
            className="style-thumbnail"
            src={style.photos[0].thumbnail_url}
            onClick={setCurrentStyle}
          />
          {currentStyle.name === style.name ? selected() : null}
        </div>
      </li>
      );
      if (row.length === 4) {
        matrix.push(<ul key={matrix.length} className="style-row">{row}</ul>)
        matrix.push(<div key={`break${matrix.length}`} className="break"></div>)
        row = [];
      }
    });
    return matrix;
  };

  return (
    <div>
      <h2 className="style-title">{currentStyle.name}</h2>
      <div className="style-selector-container">
        {styleMatrix()}
      </div>
    </div>
  )
};


export default StyleSelector;
