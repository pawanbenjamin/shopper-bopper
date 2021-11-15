const pool = require("./pool");

async function createProduct({ name, description, price, stockQty }) {
  const {
    rows: [product],
  } = await pool.query(
    `
            INSERT INTO products(name, description, price, stockQty)
                VALUES ($1, $2, $3, $4)
                RETURNING * 
        `,
    [name, description, price, stockQty]
  );
  return product;
}

async function getAllProducts() {
  const { rows } = await pool.query(`
      SELECT * FROM products
    `);
  return rows;
}

async function getProductById(productId) {
  const {
    rows: [product],
  } = await pool.query(
    `
      SELECT * FROM products
        WHERE id=$1
    `,
    [productId]
  );
  return product;
}

async function updateProduct({ name, description, price, stockQty, id }) {
  const {
    rows: [product],
  } = await pool.query(
    `
          UPDATE products
            SET name = $1, description = $2, price = $3, stockQty = $4
            WHERE id=$5
            RETURNING *
    `,
    [name, description, price, stockQty, id]
  );
  return product;
}

// * can only delete products not attached to an order
async function deleteProduct(productId) {
  const {
    rows: [product],
  } = await pool.query(
    `
      DELETE FROM products 
        WHERE id=$1
        RETURNING *
    `,
    [productId]
  );
  console.log("DELETED PRODUCT:", product);
  return product;
}

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
