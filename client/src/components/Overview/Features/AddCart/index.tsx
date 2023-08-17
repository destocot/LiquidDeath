import React from 'react';
import CartForm from './CartForm';
import helpers from '../../../../helpPlease';
import axios from 'axios';

function AddCart({currentStyle}) {
  const formSubmit = (e) => {
    e.preventDefault();
    let cartBody = helpers.formParser(e.target.elements);
    axios.post('/cart', cartBody)
      .then(() => console.log('Added Items to Cart!'))
      .catch((err) => console.error(err));
  }
  return (
    <div>
      <CartForm currentStyle={currentStyle} handleSubmit={formSubmit} />
    </div>
  );
}

export default AddCart;
