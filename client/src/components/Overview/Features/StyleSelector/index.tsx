import React from 'react';

function StyleSelector({styles, currentStyle, setCurrentStyle}) {
  // creates matrix with style rows
  const styleMatrix = () => {
    let row = [];
    let matrix = [];
    styles.forEach((style, i) => {
      row.push(
      <li key={style.style_id} className="style" >
        <img
          id={i}
          alt={style.name}
          className="style-thumbnail"
          src={style.photos[0].thumbnail_url}
          onClick={setCurrentStyle}/>
      </li>
      );
      if (row.length === 4) {
        matrix.push(<ul key={matrix.length} className="style-row">{row}</ul>)
        matrix.push(<div className="break"></div>)
        row = [];
      }
    });
    return matrix;
  };

  return (
    <div>
      <div className="style-title">{currentStyle.name}</div>
      <div className="style-selector-container">
        {styleMatrix()}
      </div>
    </div>
  )
};


export default StyleSelector;
