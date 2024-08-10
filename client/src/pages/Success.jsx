import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../../utils/mutations';
import { idbPromise } from '../../utils/helper';


function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
        try {
      const cart = await idbPromise('cart', 'get');

      const totalPrice = cart.reduce((sum, item) => {
        return sum + (item.price * item.purchaseQuantity);
      }, 0);
      
      console.log("Cart contents:", cart);
      const products = cart.map((item) => ({
        name: item.name,
        quantity: item.purchaseQuantity,
        price: item.price

      }));
      console.log("Products array:", products);
      console.log("Mutation variables:", { 
        dishes: products, 
        totalPrice: totalPrice 
      });
      
      if (products.length) {
        const { data } = await addOrder({ 
            variables: { 
              dishes: products,
              totalPrice: totalPrice,
            } 
          });
          
          console.log("Raw mutation response:", data);
          console.log("Order ID:", data.addOrder.id);
          console.log("Dishes:", data.addOrder.dishes);

        const productData = data.addOrder.dishes;

        productData.forEach((item) => {
            console.log("Deleting item from IndexedDB:", item.name);
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    } catch (error) {
        console.error("Error processing order:", error);
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach(({ message }) => {
            console.error("GraphQL Error:", message);
          });
        }
        if (error.networkError) {
          console.error("Network Error:", error.networkError);
        }
      }
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
    </div>
  );
}

export default Success;
