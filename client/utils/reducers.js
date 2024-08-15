// import {
//     ADD_TO_CART,
//     REMOVE_FROM_CART,
//     CLEAR_CART,
//     UPDATE_CART_QUANTITY,
//     TOGGLE_CART,
// } from './actions'

// export const reducer = (state, action) => {
//     switch (action.type) {
//         case ADD_TO_CART:
//             return {
//                 ...state,
//                 cartOpen: true,
//                 cart: [...state.cart, action.dish] 
//             };
        
//         case UPDATE_CART_QUANTITY:
//                 return {
//                     ...state,
//                     cartOpen: true,
//                     cart: state.cart.map(dish => {
//                         if (action.id === dish.id) {
//                             dish.purchaseQuantity = action.purchaseQuantity
//                         }
//                         return dish
//                     })
//                 };
           
//         case REMOVE_FROM_CART:
//             let newState = state.cart.filter(dish => {
//                 return dish.id !== action.id
//             });
//             return {
//                 ...state,
//                 cartOpen: newState.length > 0,
//                 cart: newState
//             }
        

//         case CLEAR_CART:
//             return {
//                 ...state,
//                 cartOpen: false,
//                 cart: []
//       };

//         case TOGGLE_CART:
//             return {
//                 ...state,
//                 cartOpen: !state.cartOpen
//             };

//         default:
//             return state;
// }
// };

import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    UPDATE_CART_QUANTITY,
    TOGGLE_CART,
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // Add the dish to the cart and set cartOpen to true
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.dish] 
            };
        
        case UPDATE_CART_QUANTITY:
            // Update the quantity of the specific dish in the cart
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(dish => {
                    if (action.id === dish.id) {
                        // Update the purchase quantity
                        return { ...dish, purchaseQuantity: action.purchaseQuantity };
                    }
                    return dish;
                })
            };
           
        case REMOVE_FROM_CART:
            // Filter out the dish with the matching ID
            const newState = state.cart.filter(dish => dish.id !== action.id);
            return {
                ...state,
                cartOpen: newState.length > 0, // Set cartOpen to true if there are items left
                cart: newState
            };
        
        case CLEAR_CART:
            // Clear all items from the cart and set cartOpen to false
            return {
                ...state,
                cartOpen: false,
                cart: []
            };

        case TOGGLE_CART:
            // Toggle the visibility of the cart
            return {
                ...state,
                cartOpen: !state.cartOpen
            };

        default:
            return state;
    }
};
