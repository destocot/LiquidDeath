import React from 'react';

function CartForm({handleSubmit}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select>
          <option value="" selected disabled hidden>Select Size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">Extra Large</option>
        </select>
        <select>
          <option value="" selected disabled hidden>Select Quantity</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="all">ALL THE THINGS</option>
        </select>
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