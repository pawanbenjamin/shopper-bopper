const pool = require("./pool");

async function createUser({ username, password }) {
  const {
    rows: [user],
  } = await pool.query(
    `INSERT INTO users(username, password)
            VALUES($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *
        `,
    [username, password]
  );
  return user;
}

async function getUser(userId) {
  const {
    rows: [user],
  } = await pool.query(
    `
      SELECT * FROM users
        WHERE id=$1
    `,
    [userId]
  );
  return user;
}

async function loginUser(username) {
  const {
    rows: [user],
  } = await pool.query(
    `
      SELECT * FROM users
        WHERE username=$1
    `,
    [username]
  );
  return user;
}

async function updateUser({ id, username, password }) {
  const {
    rows: [user],
  } = await pool.query(
    `
      UPDATE users
        SET username=$2, password=$3
        WHERE id=$1
        RETURNING *
    `,
    [id, username, password]
  );
  return user;
}

// Must delete Cart (orders_products) before using this function
async function deleteUser(userId) {
  const {
    rows: [user],
  } = await pool.query(
    `
      DELETE from users
        WHERE id=$1
        RETURNING *
    `,
    [userId]
  );
  return user;
}

module.exports = { createUser, getUser, updateUser, deleteUser, loginUser };
