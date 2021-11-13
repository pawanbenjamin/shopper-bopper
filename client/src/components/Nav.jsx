import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";

function Nav({ isLoggedIn, setIsLoggedIn }) {
  const { userDispatch } = useContext(userContext);
  const { cartDispatch } = useContext(cartContext);

  const handleLogout = async () => {
    await fetch("/auth/logout", {
      method: "POST",
    });
    userDispatch({ type: "LOG_OUT" });
    cartDispatch({ type: "CLEAR_CART" });
    setIsLoggedIn(false);
  };

  console.log(userDispatch);
  return (
    <div>
      <NavLink to="/products">Products</NavLink>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
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
