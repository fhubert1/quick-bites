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
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        id: dish.id
      });
      idbPromise('cart', 'delete', { ...dish });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        id: dish.id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...dish, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      
      <div>
        <div>{dish.name} - ${dish.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={dish.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="remove-item"
            onClick={() => removeFromCart(dish)}
            className="remove-item"
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
