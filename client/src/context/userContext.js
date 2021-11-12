import React, { createContext, useReducer } from "react";

const initialState = {};

const userContext = createContext(initialState);
const { Provider } = userContext;

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((oldState, action) => {
    switch (action.type) {
      case "SET_USER": {
        const newState = {
          user: action.value,
        };
        return newState;
      }
      case "LOG_OUT": {
        return {};
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { userContext, UserProvider };
