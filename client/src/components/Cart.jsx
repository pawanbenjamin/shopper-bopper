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
      console.log(cart);
      cartDispatch({
        type: "SET_CART",
        value: { items: [...cart], cartId: userState.user.cartId },
      });
    }
    if (userState.user) {
      getCart();
    }
  }, []);

  const products =
    cartState.items &&
    cartState.items.length &&
    cartState.items.map((item) => {
      return (
        <>
          <h3>{item.name}</h3>
          <h4>{item.price}</h4>
          <h5>{item.qty}</h5>
        </>
      );
    });

  return <div>{products ? products : <span>Nothing in Your Cart!</span>}</div>;
}

export default Cart;
