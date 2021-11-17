const { buildTables, seedDb } = require("../db/seedData");
const setup = async () => {
  console.log("--- JEST SETUP ---");
  await buildTables();
  await seedDb();
};

module.exports = setup;
