import React from 'react';
import CartForm from './CartForm';

function AddCart({currentStyle}) {
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }
  return (
    <div>
      <CartForm currentStyle={currentStyle} handleSubmit={formSubmit} />
    </div>
  );
}

export default AddCart;
