const usersRouter = require("express").Router();

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  // createOrderByUserId,
  getCart,
} = require("../db");

// Get User
usersRouter.get(`/:id`, async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// Create User
usersRouter.post("/", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    delete user.password;
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// Update User
usersRouter.patch("/:id", async (req, res, next) => {
  try {
    const user = await updateUser(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// Delete User
usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    res.send(deletedUser);
  } catch (error) {
    next(error);
  }
});

// Get User's Cart
usersRouter.get("/:id/cart", async (req, res, next) => {
  try {
    const cart = await getCart(req.params.id);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
