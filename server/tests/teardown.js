const pool = require("../db/pool");

const tearDown = async ({ watch, watchAll }) => {
  if (watch || watchAll) {
    return;
  }

  await pool.end();
  console.log("Client Ended");
};

module.exports = tearDown;
