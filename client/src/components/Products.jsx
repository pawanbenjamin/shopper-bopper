import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";

function Products() {
  const { cartState, cartDispatch } = useContext(cartContext);
  const { userState } = useContext(userContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    }
    getProducts();
  }, []);

  async function addToCart(product) {
    if (userState.id) {
      console.log("adding to cart");
      await axios.post("/api/orders_products", {
        productId: product.id,
        orderId: cartState.orderId,
        qty: 1,
      });
      const { data } = await axios.get(`/api/orders/user/${userState.id}/cart`);
      cartDispatch({ type: "SET_CART", value: data });
      console.log("Added to cart!");
    } else {
      cartDispatch({
        type: "ADD_TO_CART",
        value: {
          description: product.description,
          price: product.price,
          productId: product.id,
          productName: product.name,
          qty: 1,
        },
      });
    }
  }

  const prods = products.map((product) => {
    return (
      <div key={product.id}>
        <h2>{product.name}</h2>
        <ul>
          <li>{product.description}</li>
          <li>{product.price}</li>
        </ul>
        {cartState.items &&
          cartState.items
            .filter((item) => item.productId === product.id)
            .map((item) => {
              return <h6>Already in Cart</h6>;
            })}
        {cartState.items ? (
          cartState.items.filter((item) => item.productId === product.id)
            .length === 0 ? (
            <button onClick={() => addToCart(product)}>Add To Cart</button>
          ) : null
        ) : (
          <button onClick={() => addToCart(product)}>Add To Cart</button>
        )}
      </div>
    );
  });

  return <div>{prods}</div>;
}

export default Products;
