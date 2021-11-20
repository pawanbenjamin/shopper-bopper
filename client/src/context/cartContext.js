import React, { createContext, useReducer } from "react";

const initialState = {};

const cartContext = createContext(initialState);
const { Provider } = cartContext;

const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer((oldState, action) => {
    switch (action.type) {
      case "SET_CART": {
        return action.value;
      }
      case "CLEAR_CART": {
        return initialState;
      }
      case "ADD_TO_CART": {
        const newState = {
          items: [...oldState.items, action.value],
        };
        return newState;
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ cartState, cartDispatch }}>{children}</Provider>;
};

export { cartContext, CartProvider };
