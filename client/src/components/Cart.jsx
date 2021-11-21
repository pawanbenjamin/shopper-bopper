import axios from "axios";
import React, { useEffect, useContext } from "react";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";

function Cart(props) {
  const { cartState, cartDispatch } = useContext(cartContext);
  const { userState } = useContext(userContext);

  useEffect(() => {}, []);

  const removeFromCart = async (productId, orderId) => {
    if (userState.id) {
      console.log("BEGIN REMOVING FROM CART", { productId, orderId });
      const { data } = await axios.delete(
        `/api/orders_products/${orderId}/${productId}`
      );
      console.log("DELETE RESPONSE::::", data);
      const response = await axios.get(`/api/orders/user/${userState.id}/cart`);
      console.log("IS THIS A CART?????", response.data);
      cartDispatch({ type: "SET_CART", value: response.data });
    } else {
      cartDispatch({ type: "REMOVE_FROM_CART", value: { productId } });
    }
  };

  const products =
    cartState.items &&
    cartState.items.length &&
    cartState.items.map((item) => {
      return (
        <>
          <h3>{item.productName}</h3>
          <h4>{item.price}</h4>
          <h5>{item.qty}</h5>
          <button
            onClick={() => removeFromCart(item.productId, cartState.orderId)}
          >
            Remove from Cart
          </button>
          <span>QTY</span>
          <button>+</button>
          <button>-</button>
        </>
      );
    });

  return <div>{products ? products : <span>Nothing in Your Cart!</span>}</div>;
}

export default Cart;
