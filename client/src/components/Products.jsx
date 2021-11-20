import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { cartContext } from "../context/cartContext";
import { userContext } from "../context/userContext";

function Products(props) {
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

  async function addToCart(productId) {
    console.log("adding to cart");
    await axios.post("/api/orders_products", {
      productId,
      orderId: userState.cart.orderId,
      qty: 1,
    });
    console.log("Added to cart!");
  }

  const prods = products.map((product) => {
    return (
      <div key={product.id}>
        <h2>{product.name}</h2>
        <ul>
          <li>{product.description}</li>
          <li>{product.price}</li>
        </ul>

        <button onClick={() => addToCart(product.id)}>Add to Cart</button>
      </div>
    );
  });

  return <div>{prods}</div>;
}

export default Products;
