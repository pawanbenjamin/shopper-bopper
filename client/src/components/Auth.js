import React, { useEffect, useState, useContext } from "react";
import { useLocation, useHistory } from "react-router";
import { store } from "../state";

function Register(props) {
  const { state, dispatch } = useContext(store);

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

    dispatch({ type: "SET_USER", value: data });
    setUsername("");
    setPassword("");
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

export default Register;
