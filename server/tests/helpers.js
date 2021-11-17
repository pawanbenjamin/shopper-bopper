const faker = require("faker");
const { createUser } = require("../db/users");

const createFakeUser = async (fakeUserData) => {
  if (fakeUserData === undefined) {
    fakeUserData = {
      username: faker.datatype.uuid(),
      password: faker.internet.password(),
    };
  }

  return await createUser(fakeUserData);
};

module.exports = {
  createFakeUser,
};
