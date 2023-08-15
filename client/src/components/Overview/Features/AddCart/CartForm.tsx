import React from 'react';

function CartForm({currentStyle, handleSubmit}) {
  // state for selected size
  // if size value !== "" then mount options for quantity
  // otherwise default value is - and that's the only value
  //
  return (
    <div className="cart-form-container">
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