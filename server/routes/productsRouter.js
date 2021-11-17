const productsRouter = require("express").Router();

const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../db");

// Get All Products
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// Get Single Product
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Create Product
productsRouter.post("/", async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Update Product
productsRouter.patch("/:id", async (req, res, next) => {
  try {
    const product = await updateProduct(req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Delete Product
productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);
    res.send(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
