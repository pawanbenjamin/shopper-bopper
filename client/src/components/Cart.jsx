import React, { useContext, useEffect } from "react";
import { store } from "../state";

function Cart(props) {
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    const getCart = async () => {
      const response = await fetch(`/api/orders/user/${state.user.id}/cart`);
      const cart = await response.json();
      dispatch({ type: "GET_CART", value: cart });
    };
    if (state.user) {
      getCart();
    }
  }, []);

  const products =
    state.cart &&
    state.cart.map((product) => {
      return (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <ul>
            <li>{product.description}</li>
            <li>{product.price}</li>
          </ul>
        </div>
      );
    });

  return <div>{products ? products : <span>Nothing in Your Cart!</span>}</div>;
}

export default Cart;
