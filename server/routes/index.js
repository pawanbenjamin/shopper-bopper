const apiRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  const token = req.signedCookies.token;
  try {
    jwt.verify(token, process.env["JWT_SECRET"]);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are def not authorized.",
    });
    return;
  }
  next();
};

apiRouter.use("/users", authRequired, require("./usersRouter"));

apiRouter.use("/products", require("./productsRouter"));

apiRouter.use("/orders", authRequired, require("./ordersRouter"));

apiRouter.use("/orders_products", require("./orders_productsRouter"));

module.exports = apiRouter;
