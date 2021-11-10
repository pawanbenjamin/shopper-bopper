import React, { createContext, useReducer } from "react";

const initialState = {};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((oldState, action) => {
    switch (action.type) {
      case "SET_USER": {
        const newState = {
          ...oldState,
          user: action.value,
        };
        return newState;
      }
      case "GET_CART": {
        const newState = {
          ...oldState,
          cart: action.value,
        };
        return newState;
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
