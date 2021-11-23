import axios from "axios";
import React, { useEffect, useContext } from "react";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";
const url = window.location.origin;
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

  const increaseQty = async (productId, qty) => {
    if (userState.id) {
      const { data } = await axios.patch("/api/orders_products", {
        productId,
        orderId: cartState.orderId,
        qty,
      });
      const response = await axios.get(`/api/orders/user/${userState.id}/cart`);

      cartDispatch({ type: "SET_CART", value: response.data });
    } else {
      cartDispatch({
        type: "CHANGE_QTY",
        value: { productId, qty },
      });
    }
  };

  const decreaseQty = async (productId, qty) => {
    if (qty === 0) {
      await removeFromCart(productId, cartState.orderId);
    }
    if (userState.id) {
      const { data } = await axios.patch("/api/orders_products", {
        productId,
        orderId: cartState.orderId,
        qty,
      });
      const response = await axios.get(`/api/orders/user/${userState.id}/cart`);

      cartDispatch({ type: "SET_CART", value: response.data });
    } else {
      cartDispatch({
        type: "CHANGE_QTY",
        value: { productId, qty },
      });
    }
  };

  const products =
    cartState.items &&
    cartState.items.length &&
    cartState.items.map((item) => {
      return (
        <div key={item.productId}>
          <img src={url + item.imageUrl} />
          <h3>{item.productName}</h3>
          <h4>${item.price / 100}</h4>
          <h5>{item.qty}</h5>
          <button
            onClick={() => removeFromCart(item.productId, cartState.orderId)}
          >
            Remove from Cart
          </button>
          <span>QTY</span>
          <button onClick={() => increaseQty(item.productId, item.qty + 1)}>
            +
          </button>
          <button onClick={() => decreaseQty(item.productId, item.qty - 1)}>
            -
          </button>
        </div>
      );
    });

  const total =
    cartState.items &&
    cartState.items.length &&
    cartState.items
      .map((item) => {
        return item.price * item.qty;
      })
      .reduce((prevTotal, currTotal) => prevTotal + currTotal);

  return (
    <div>
      {products ? products : <span>Nothing in Your Cart!</span>}
      <h3>Cart Total: ${total / 100}</h3>
    </div>
  );
}

export default Cart;
