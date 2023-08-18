import React, { useState } from 'react';
import CartForm from './CartForm';
import helpers from '../../../../helpPlease';
import axios from 'axios';

function AddCart({currentStyle}) {
  const [needed, setNeeded] = useState('');
  const formSubmit = (e) => {
    e.preventDefault();
    let cartBody = helpers.formParser(e.target.elements);
    if (cartBody.sku_id === 'Select Size' ) {
      setNeeded('size');
      return;
    } else if (cartBody.count === 'Select Quantity') {
      setNeeded('qty');
      return;
    }
    axios.post('/cart', cartBody)
      .then(() => alert('Added Items to Cart!'))
      .catch((err) => console.error(err));
  }
  return (
    <div>
      <CartForm currentStyle={currentStyle} handleSubmit={formSubmit} needed={needed} setNeeded={setNeeded} />
    </div>
  );
}

export default AddCart;
