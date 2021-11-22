import axios from "axios";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";

function Nav({ isLoggedIn, setIsLoggedIn }) {
  const { userState, userDispatch } = useContext(userContext);
  const { cartState, cartDispatch } = useContext(cartContext);

  const handleLogout = async () => {
    await axios.post("/auth/logout");
    userDispatch({ type: "LOG_OUT" });
    cartDispatch({ type: "CLEAR_CART" });
    setIsLoggedIn(false);
  };

  console.log(userDispatch);
  return (
    <div>
      {userState.id ? <h3>Welcome {userState.username}</h3> : null}
      <NavLink to="/products">Products</NavLink>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
      <NavLink to="/cart">
        Cart({cartState.items && cartState.items.length})
      </NavLink>
    </div>
  );
}

export default Nav;
