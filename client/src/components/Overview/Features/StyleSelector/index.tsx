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
      <h3 className="style-title">{currentStyle.name}</h3>
      <div className="style-selector-container">
        {styleMatrix()}
      </div>
    </div>
  )
};


export default StyleSelector;

// {
//   "style_id": 221060,
//   "name": "Salmon",
//   "original_price": "278.00",
//   "sale_price": null,
//   "default?": true,
//   "photos": [
//       {
//           "thumbnail_url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//           "url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
//       }
//   ],
//   "skus": {
//       "1281449": {
//           "quantity": 26,
//           "size": "One Size"
//       }
//   }
// },
