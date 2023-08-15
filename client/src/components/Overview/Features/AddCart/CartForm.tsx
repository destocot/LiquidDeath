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
      </form>
    </div>
  );
}

export default CartForm;