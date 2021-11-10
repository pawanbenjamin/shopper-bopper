const ordersRouter = require("express").Router();

const {
  createOrderByUserId,
  getOrderById,
  getAllOrdersByUserId,
  getAllOrders,
  getCart,
  deleteOrderById,
  purchaseCart,
} = require("../db");

// Get All Orders
ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// Get single order by orderId
ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);

    res.send(order);
  } catch (error) {
    next(error);
  }
});

// Create a order (cart) for a User
ordersRouter.post("/user/:userId", async (req, res, next) => {
  try {
    const order = await createOrderByUserId(req.params.userId);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

// Get a user's active order (cart)
ordersRouter.get("/user/:userId/cart", async (req, res, next) => {
  try {
    const cart = await getCart(req.params.userId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// Get all of a User's orders
ordersRouter.get("/user/:userId", async (req, res, next) => {
  try {
    const orders = await getAllOrdersByUserId(req.params.userId);
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.put("/:orderId", async (req, res, next) => {
  try {
    const purchasedOrder = await purchaseCart(req.params.orderId);
    res.send(purchasedOrder);
  } catch (error) {
    next(error);
  }
});

// Delete an order by orderId, (must not have through table associations)
ordersRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedOrder = await deleteOrderById(req.params.id);
    res.send(deletedOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
