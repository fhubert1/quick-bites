import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    UPDATE_CART_QUANTITY,
    TOGGLE_CART,
} from './actions'

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.dish] 
            };
        
        case UPDATE_CART_QUANTITY:
                return {
                    ...state,
                    cartOpen: true,
                    cart: state.cart.map(dish => {
                        if (action.id === dish.id) {
                            dish.purchaseQuantity = action.purchaseQuatity
                        }
                        return dish
                    })
                };
           
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(dish => {
                return dish.id !== action.id
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            }

        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
      };

        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };

        default:
            return state;
};
};