import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

function Nav({ isLoggedIn, setIsLoggedIn }) {
  const handleClick = async () => {
    await fetch("/auth/logout", {
      method: "POST",
    });
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
