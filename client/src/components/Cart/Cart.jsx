import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../../utils/queries';
import { idbPromise } from '../../../utils/helper';
import CartItem from '../CartItem/CartItem';
import Auth from '../../../utils/auth';
import { useStoreContext } from '../../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../../utils/actions';
import './style.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      console.log('Checkout session data received:', data);
      stripePromise.then((res) => {
        console.log('Checkout session data received:', data);
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      console.log('Loaded cart from IndexedDB:', cart);
      dispatch({ type: ADD_MULTIPLE_TO_CART, dishes: [...cart] });
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
    state.cart.forEach((dish) => {
      sum += dish.price * dish.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    console.log('Submitting checkout with products:', JSON.stringify(state.cart, null, 2));
    // Transform the cart data to match the expected input format
  const products = state.cart.map(item => ({
    name: item.name, 
    quantity: item.purchaseQuantity, 
    price: item.price, 
  }));

  console.log('Formatted checkout products:', JSON.stringify(products, null, 2));
    getCheckout({
      variables: { dish: products},
    });
  }

  if (!state.cartOpen) {
    return null; 
  }

  return (
    <div className="cart-popup">
      <div className="close" onClick={toggleCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((dish) => (
            <CartItem key={dish.id} dish={dish} />
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
        <h3>You haven't added anything to your cart yet!</h3>
      )}
    </div>
  );
};

export default Cart;
