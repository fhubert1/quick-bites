import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../../utils/queries';
import { idbPromise } from '../../../utils/helper';
import CartItem from '../CartItem/CartItem';
import Auth from '../../../utils/auth';
import { useStoreContext } from '../../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../../utils/actions';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, items: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    getCheckout({
      variables: { 
        products: [...state.cart],
      },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;


// const Cart = ({  cartItems, removeFromCart, getTotalCartAmount }) => {
//   return (
//     <div className="cart">
//       <div className="cart-items">
//         <div className="cart-item-title">
//           <p>Item</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <hr />
//         {State.cart.map((item) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div key={item._id} className="cart-items-item">
//                 <img src={item.image} alt={item.title} className="cart-item-image" />
//                 <p>{item.title}</p>
//                 <p>${item.price}</p>
//                 <p>{cartItems[item._id]}</p>
//                 <p>${item.price * cartItems[item._id]}</p>
//                 <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div className="cart-total-details">
//             <p>Subtotal</p>
//             <p>${getTotalCartAmount()}</p>
//           </div>
//         </div>
//         <button className="cart-checkout">PROCEED TO CHECKOUT</button>
//       </div>
//     </div>
//   );
// };

// export default Cart;




