import React, { useEffect, useState, useContext } from "react";
import { useLocation, useHistory } from "react-router";
import { userContext } from "../context/userContext";
import { cartContext } from "../context/cartContext";

function Auth({ setIsLoggedIn }) {
  const { userDispatch } = useContext(userContext);
  const { cartDispatch } = useContext(cartContext);
  const { pathname } = useLocation();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const respone = await fetch(`/auth${pathname}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await respone.json();
    userDispatch({ type: "SET_USER", value: data });

    const cartResponse = await fetch(`/api/orders/user/${data.id}/cart`);
    const cart = await cartResponse.json();
    console.log(cart);
    cartDispatch({
      type: "SET_CART",
      value: { items: [...cart], cartId: data.cartId },
    });

    setUsername("");
    setPassword("");
    setIsLoggedIn(true);
    history.push("/products");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Auth;
