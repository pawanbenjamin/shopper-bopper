const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
} = require("./users");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./products");

const {
  createOrderByUserId,
  getOrderById,
  getAllOrdersByUserId,
  getCart,
  getAllOrders,
  deleteOrderById,
  purchaseCart,
} = require("./orders");

const {
  addToCart,
  removeFromCart,
  updateQtyInCart,
} = require("./orders_products");

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  createOrderByUserId,
  getOrderById,
  getAllOrdersByUserId,
  getCart,
  getAllOrders,
  deleteOrderById,
  addToCart,
  removeFromCart,
  updateQtyInCart,
  purchaseCart,
};
