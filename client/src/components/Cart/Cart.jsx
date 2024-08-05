import React from 'react';
import './Cart.css';

// Assuming these functions and data are provided by context or props
const Cart = ({ foodList, cartItems, removeFromCart, getTotalCartAmount }) => {
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {foodList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="cart-items-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <p>{item.title}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
        </div>
        <button className="cart-checkout">PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
};

export default Cart;




