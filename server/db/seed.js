const { initDb } = require("./seedData");
const pool = require("./pool");

initDb().then(() => pool.end());
