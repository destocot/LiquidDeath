import React, { useState, useEffect } from 'react';
import CartForm from './CartForm';
import helpers from '../../../../helpPlease';
import axios from 'axios';
import swal from 'sweetalert';

function AddCart({ currentStyle, setConfetti, setNumInCart }) {
  const [needed, setNeeded] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    setSize('');
    setQuantity('');
    setNeeded('');
    document.getElementById('cart-form').reset();
  }, [currentStyle]);

  const formSubmit = (e) => {
    e.preventDefault();
    let cartBody = helpers.formParser(e.target.elements);
    if (cartBody.sku_id === 'Select Size') {
      setNeeded('size');
      return;
    } else if (cartBody.count === 'Select Quantity') {
      setNeeded('qty');
      return;
    }
    axios.post('/cart', cartBody)
      .then(() => {
        setConfetti(true)
        setSize('');
        setQuantity('');
        setNeeded('');
        setNumInCart(state => state + Number(cartBody.count));
        document.getElementById('cart-form').reset();
      })
      .then(() => {
        console.log('i am here');
        swal('Added Items to Cart!')
      }
      )
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <CartForm
        currentStyle={currentStyle}
        handleSubmit={formSubmit}
        needed={needed}
        setNeeded={setNeeded}
        size={size}
        setSize={setSize}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </div>
  );
}

export default AddCart;
