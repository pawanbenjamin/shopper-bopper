import React, { useState, useContext } from "react";
import { useLocation, useHistory } from "react-router";
import { userContext } from "../context/userContext";
import { cartContext } from "../context/cartContext";
import axios from "axios";

function Auth({ setIsLoggedIn }) {
  const { userDispatch } = useContext(userContext);
  const { cartDispatch } = useContext(cartContext);

  const { pathname } = useLocation();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`/auth${pathname}`, {
      username: username,
      password: password,
    });

    userDispatch({ type: "SET_USER", value: data });

    const cartResponse = await axios.get(`/api/orders/user/${data.id}/cart`);
    const cart = await cartResponse.data;

    cartDispatch({
      type: "SET_CART",
      value: { items: [...cart], cartId: cart.id },
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
