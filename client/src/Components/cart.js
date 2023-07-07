// Cart.js
import React from 'react';

function Cart({ cart, handleRemoveFromCart }) {
  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <ul>
        {cart.map((appointment) => (
          <li key={appointment.service_id}>
            {appointment.name} - ${appointment.price}
            <button
              onClick={() => handleRemoveFromCart(appointment)}
              className="remove-from-cart"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {cart.length === 0 && (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
