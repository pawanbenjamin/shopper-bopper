const pool = require("./pool");

async function createOrderByUserId(userId) {
  const {
    rows: [order],
  } = await pool.query(
    `
            INSERT INTO orders("userId")
                VALUES($1)
                RETURNING * 
        `,
    [userId]
  );
  return order;
}

async function getAllOrders() {
  const { rows } = await pool.query(`
      SELECT * FROM orders
    `);
  return rows;
}

async function getOrderById(orderId) {
  const {
    rows: [order],
  } = await pool.query(
    `
    SELECT *
          FROM orders 
          INNER JOIN orders_products as op
            ON op."orderId" = orders.id
          INNER JOIN products as p
          	ON op."productId" = p.id  
     	    WHERE orders.id = $1 
    `,
    [orderId]
  );
  return order;
}

async function getAllOrdersByUserId(userId) {
  const {
    rows: [orders],
  } = await pool.query(
    `
        SELECT * FROM orders 
        INNER JOIN orders_products as op
            ON op."orderId" = orders.id
          INNER JOIN products as p
          	ON op."productId" = p.id  
     	    WHERE orders."userId" = $1   
    `,
    [userId]
  );
  return orders;
}

// Get Cart (order that is active) and include everything
async function getCart(userId) {
  const {
    rows: [cart],
  } = await pool.query(
    `
    SELECT orders."userId", orders.id as orderId, 
    op."productId", op.qty, p.name, p.description, 
    p.price, p.stockqty, orders.isactive
          FROM orders 
          INNER JOIN orders_products as op
            ON op."orderId" = orders.id
          INNER JOIN products as p
          	ON op."productId" = p.id  
     	    WHERE orders."userId" = $1 and orders.isActive = true 
    `,
    [userId]
  );

  return cart;
}

async function purchaseCart(orderId) {
  const {
    rows: [order],
  } = await pool.query(
    `
      UPDATE orders
        SET isActive=true
        WHERE id=$1
    `,
    [orderId]
  );
  return order;
}

async function deleteOrderById(orderId) {
  const deletedOrder = await pool.query(
    `
      DELETE FROM orders
        WHERE id=$1
    `,
    [orderId]
  );
  return deletedOrder;
}

module.exports = {
  createOrderByUserId,
  getOrderById,
  getAllOrdersByUserId,
  getCart,
  getAllOrders,
  deleteOrderById,
  purchaseCart,
};
