const apiRouter = require("express").Router();

apiRouter.use("/users", require("./usersRouter"));

apiRouter.use("/products", require("./productsRouter"));

apiRouter.use("/orders", require("./ordersRouter"));

apiRouter.use("/orders_products", require("./orders_productsRouter"));

module.exports = apiRouter;
