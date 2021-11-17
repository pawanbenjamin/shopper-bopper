const pool = require("../db/pool");
const { buildTables, seedDb } = require("../db/seedData");

const tearDown = async ({ watch, watchAll }) => {
  if (watch || watchAll) {
    return;
  }
  // await buildTables();
  // await seedDb();
  await pool.end();
  console.log("Client Ended");
};

module.exports = tearDown;
