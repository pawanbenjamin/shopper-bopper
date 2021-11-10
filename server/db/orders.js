const pool = require("./pool");

async function createOrderByUserId(userId) {
  try {
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
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM orders
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(orderId) {
  try {
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
  } catch (error) {
    throw error;
  }
}

async function getAllOrdersByUserId(userId) {
  try {
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
  } catch (error) {
    throw error;
  }
}

// Get Cart (order that is active) and include everything
async function getCart(userId) {
  try {
    const {
      rows: [cart],
    } = await pool.query(
      `
      SELECT *
          FROM orders 
          INNER JOIN orders_products as op
            ON op."orderId" = orders.id
          INNER JOIN products as p
          	ON op."productId" = p.id  
     	    WHERE orders."userId" = $1 and orders.isActive = true 
    `,
      [userId]
    );
    console.log("IN THE GET CART", cart);
    return cart;
  } catch (error) {
    throw error;
  }
}

async function purchaseCart(orderId) {
  try {
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
  } catch (error) {
    throw error;
  }
}

async function deleteOrderById(orderId) {
  try {
    const deletedOrder = await pool.query(
      `
      DELETE FROM orders
        WHERE id=$1
    `,
      [orderId]
    );
    return deletedOrder;
  } catch (error) {
    throw error;
  }
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
