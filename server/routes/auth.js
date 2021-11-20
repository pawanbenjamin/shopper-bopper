const bcrypt = require("bcrypt");
const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const {
  createUser,
  loginUser,
  createOrderByUserId,
  getCart,
} = require("../db");

const SALT_ROUNDS = 10;

authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({ username, password: hash });
    await createOrderByUserId(user.id);

    delete user.password;

    const token = jwt.sign(user, process.env["JWT_SECRET"]);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send(user);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await loginUser(username);
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        delete user.password;

        const token = jwt.sign(user, process.env["JWT_SECRET"]);

        res.cookie("token", token, {
          sameSite: "strict",
          httpOnly: true,
          signed: true,
        });

        res.send(user);
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    }
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", async (req, res, next) => {
  const token = req.signedCookies.token;

  try {
    const user = await jwt.verify(token, process.env["JWT_SECRET"]);
    console.log(user);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
