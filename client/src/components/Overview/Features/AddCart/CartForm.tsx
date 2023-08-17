import React, { useState, useEffect } from 'react';

function CartForm({currentStyle, handleSubmit}) {
  // state for selected SKU (gets selected after picking a size) and array of sku id's
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const stock = Object.values(currentStyle.skus);
  // reset SKU on style change
  useEffect(() => {
    setSize('');
    setQuantity('');
  }, [currentStyle]);
  // returns array of sizes
  const sizes = () => {
    let sizeArr = [];
    stock.forEach((unit) => {
      sizeArr.push(unit.size);
    })
    return sizeArr;
  };
  // create select options for size
  const sizeOptions = sizes().map((size) => {
    return <option value={size} >{size}</option>
  });
  // create select options for quantity
  const qtyOptions = () => {
      let qtyArr = [];
      for (let i = 1; i <= quantity && i < 16; i++) {
        qtyArr.push(<option value={i} >{i}</option>)
      }
      return qtyArr;
  };

  return (
    <div className="cart-form-container">
      <form id="cart-form" onSubmit={handleSubmit}>
        <select className="select-cart-form" defaultValue="Select Size"
          onChange={(e) => {
            setSize(e.target.value);
            setQuantity(stock[sizes().indexOf(e.target.value)].quantity);
            }}>
          <option value="Select Size" disabled hidden>Select Size</option>
          {sizeOptions}
        </select>
        { size.length > 0 ?
          <select id="cart-quantity-select" className="select-cart-form" defaultValue="Select Quantity"
          onChange={(e) => { setQuantity(e.target.value)}}>
            <option value="Select Quantity" disabled hidden>Select Quantity</option>
            {qtyOptions()}
          </select>
          :
          <select className="select-cart-form" defaultValue="-">
            <option value="-" disabled hidden>-</option>
          </select>
        }
        <hr />
        <button type="submit" className="add-cart cool-button">
          <span>Add to Cart</span>
          <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0"/>
          </svg>
        </button>
      </form>
    </div>
  );
}

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
// }

export default CartForm;