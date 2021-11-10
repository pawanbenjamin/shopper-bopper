const orders_productsRouter = require("express").Router();

const { addToCart, removeFromCart, updateQtyInCart } = require("../db");

// Add new item to cart
orders_productsRouter.post("/", async (req, res, next) => {
  try {
    console.log("REQ BODY", req.body);
    const order_product = await addToCart(req.body); // productId, orderId, qty
    res.send(order_product);
  } catch (error) {
    next(error);
  }
});

// Delete item from cart
orders_productsRouter.delete("/", async (req, res, next) => {
  try {
    const deletedOrderProduct = await removeFromCart(req.body); // productId, orderId
    res.send(deletedOrderProduct);
  } catch (error) {
    next(error);
  }
});

// Update qty in cart
orders_productsRouter.put("/", async (req, res, next) => {
  try {
    const updated_op = await updateQtyInCart(req.body); // productId, orderId, qty
    res.send(updated_op);
  } catch (error) {
    next(error);
  }
});

module.exports = orders_productsRouter;
