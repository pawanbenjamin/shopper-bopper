import React, { useEffect, useContext } from "react";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";

function Cart(props) {
  const { cartState, cartDispatch } = useContext(cartContext);
  const { userState } = useContext(userContext);

  useEffect(() => {
    async function getCart() {
      const response = await fetch(
        `/api/orders/user/${userState.user.id}/cart`
      );
      const cart = await response.json();
      cartDispatch({ type: "SET_CART", value: cart });
      console.log(cartState);
    }
    getCart();
  }, []);

  const products =
    cartState.cart &&
    cartState.cart.map((item) => {
      return <h1>{item.name}</h1>;
    });

  return <div>{products ? products : <span>Nothing in Your Cart!</span>}</div>;
}

export default Cart;
