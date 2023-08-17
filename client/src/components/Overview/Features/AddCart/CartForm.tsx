import React, { useState, useEffect } from 'react';

function CartForm({currentStyle, handleSubmit}) {
  // state for selected SKU (gets selected after picking a size) and array of sku id's
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const stock = Object.values(currentStyle.skus);
  const skus = Object.keys(currentStyle.skus);
  // reset form on style change
  useEffect(() => {
    setSize('');
    setQuantity('');
    document.getElementById('cart-form').reset();
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
  const sizeOptions = sizes().map((size, i) => {
    return <option key={`size ${i}`} value={skus[i]} >{size}</option>
  });
  // create select options for quantity
  const qtyOptions = () => {
      let qtyArr = [];
      for (let i = 1; i <= quantity && i < 16; i++) {
        qtyArr.push(<option key={`qty ${i}`} value={i} >{i}</option>)
      }
      return qtyArr;
  };

  return (
    <div className="cart-form-container">
      <form id="cart-form" onSubmit={handleSubmit}>
        <select name="sku_id" className="select-cart-form" defaultValue="Select Size" onChange={(e) => {
            setSize(e.target.value)
            setQuantity(stock[skus.indexOf(e.target.value)].quantity)
          }}>
          <option value="Select Size" disabled hidden>Select Size</option>
          {sizeOptions}
        </select>
        { size.length > 0 ?
          <select name="count" id="cart-quantity-select" className="select-cart-form" defaultValue="Select Quantity">
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

export default CartForm;