import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { store } from "../state";

function Nav({ isLoggedIn, setIsLoggedIn }) {
  const { state, dispatch } = useContext(store);

  const handleClick = async () => {
    await fetch("/auth/logout", {
      method: "POST",
    });
    dispatch({ type: "LOG_OUT", value: {} });
    setIsLoggedIn(false);
  };

  return (
    <div>
      <NavLink to="/products">Products</NavLink>
      {isLoggedIn ? (
        <button onClick={handleClick}>Logout</button>
      ) : (
        <>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
      <NavLink to="/cart">Cart</NavLink>
    </div>
  );
}

export default Nav;
