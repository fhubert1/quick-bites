import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
} from './actions'

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.item] 
            };
           
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(item => {
                return item._id !== action._id
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

        default:
            return state;
};
};