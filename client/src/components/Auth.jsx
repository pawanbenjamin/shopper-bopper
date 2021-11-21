import React, { useState, useContext } from "react";
import { useLocation, useHistory } from "react-router";
import { userContext } from "../context/userContext";
import { cartContext } from "../context/cartContext";
import axios from "axios";

function Auth({ setIsLoggedIn }) {
  const { cartState, cartDispatch } = useContext(cartContext);
  const { userState, userDispatch } = useContext(userContext);
  const { pathname } = useLocation();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`/auth${pathname}`, {
      username: username,
      password: password,
      ...(cartState.items.length && { items: cartState.items }),
    });
    console.log("CART : : : : : : ", data.cart);

    userDispatch({ type: "SET_USER", value: data.user });
    if (cartState.items.length) {
      cartDispatch({
        type: "SET_CART",
        value: {
          items: cartState.items,
          orderId: data.cart.orderId,
          userId: data.user.id,
          isActive: data.cart.isActive,
        },
      });
    } else {
      cartDispatch({ type: "SET_CART", value: data.cart });
    }

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
