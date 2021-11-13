import React, { createContext, useReducer } from "react";

const initialState = {};

const cartContext = createContext(initialState);
const { Provider } = cartContext;

const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer((oldState, action) => {
    switch (action.type) {
      case "SET_CART": {
        const newState = {
          orderId: action.value.cartId,
          items: [...action.value.items],
        };
        return newState;
      }
      case "CLEAR_CART": {
        return initialState;
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ cartState, cartDispatch }}>{children}</Provider>;
};

export { cartContext, CartProvider };
