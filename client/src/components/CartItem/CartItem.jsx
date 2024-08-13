import React from 'react';
import { useStoreContext } from '../../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../../utils/actions';
import { idbPromise } from '../../../utils/helper';
import './CartItem.css';

const CartItem = ({ dish }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (dish) => {
    dispatch({
      type: REMOVE_FROM_CART,
      id: dish.id
    });
    idbPromise('cart', 'delete', { ...dish });
  };

  const onChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if ((value) || value <= 0) {
      removeFromCart(dish); // Remove item if quantity is zero or invalid
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        id: dish.id,
        purchaseQuantity: value
      });
      idbPromise('cart', 'put', { ...dish, purchaseQuantity: value });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <div>{dish.name} - ${dish.price.toFixed(2)}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={dish.purchaseQuantity || 1} // Default to 1 if undefined
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="remove-item"
            onClick={() => removeFromCart(dish)}
            className="remove-item"
            style={{ cursor: 'pointer' }} // Ensure it appears clickable
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

