import React, { useState, useEffect, useContext } from "react";
import { cartContext } from "../context/cartContext";
function Products(props) {
  const { cartState, cartDispatch } = useContext(cartContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    }
    getProducts();
  }, []);

  async function addToCart(productId) {
    const response = await fetch(`/api/orders_products/`, {
      method: "POST",
      headers: {},
      body: JSON.stringify({
        productId,
        orderId: cartState.orderId,
        qty: 1,
      }),
    });
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
        cartState.items.filter((item) => item.id === product.id).length ? (
          <h1>Already in Cart</h1>
        ) : (
          <button onClick={addToCart}>Add to Cart</button>
        )}
      </div>
    );
  });

  return <div>{prods}</div>;
}

export default Products;
