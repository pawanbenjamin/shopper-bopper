import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router";
import { store } from "../state";

function Register(props) {
  const { state, dispatch } = useContext(store);

  const { pathname } = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(location);
  });

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
