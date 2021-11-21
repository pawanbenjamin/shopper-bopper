const pool = require("./pool");

async function addToCart({ productId, orderId, qty }) {
  const {
    rows: [order_product],
  } = await pool.query(
    `
      INSERT INTO orders_products("productId", "orderId", qty)
           VALUES($1, $2, $3)
           RETURNING * 
        `,
    [productId, orderId, qty]
  );

  return order_product;
}

async function removeFromCart({ productId, orderId }) {
  const { rows } = await pool.query(
    `
      DELETE FROM orders_products as op
          WHERE op."productId"=$1 and op."orderId"=$2
          RETURNING *
    `,
    [productId, orderId]
  );

  console.log("THIS SHOULD BE THE DELETED THRU TABLE", rows);

  return rows[0];
}

async function updateQtyInCart({ productId, orderId, qty }) {
  const {
    rows: [order_product],
  } = await pool.query(
    `
      UPDATE orders_products
        SET qty=$3
        WHERE "orderId"=$2 and "productId"=$1
        RETURNING *
    `,
    [productId, orderId, qty]
  );

  return order_product;
}

module.exports = { addToCart, removeFromCart, updateQtyInCart };
