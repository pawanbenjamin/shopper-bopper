const faker = require("faker");
const { createUser } = require("../db/users");
const { createProduct } = require("../db/products");

const createFakeUser = async (fakeUserData) => {
  if (fakeUserData === undefined) {
    fakeUserData = {
      username: faker.datatype.uuid(),
      password: faker.internet.password(),
    };
  }

  return await createUser(fakeUserData);
};

const createFakeProduct = async (fakeProductData) => {
  if (fakeProductData === undefined) {
    fakeProductData = {
      name: "Passion Fruit",
      description: "A Tropical Delight",
      price: 2999,
      stockQty: 5,
    };
  }

  const createdProduct = await createProduct(fakeProductData);

  return createdProduct;
};

module.exports = {
  createFakeUser,
  createFakeProduct,
};
