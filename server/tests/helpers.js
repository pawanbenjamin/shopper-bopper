const faker = require("faker");
const {
  createUser,
  createProduct,
  createOrderByUserId,
  addToCart,
} = require("../db/index");

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
      name: "Pomegranate",
      description: "Red Goodness",
      price: 2345,
      stockQty: 50,
    };
  }

  return await createProduct(fakeProductData);
};

const createFakeOrder = async (userId) => {
  const order = await createOrderByUserId(userId);
  const fakeProduct = await createFakeProduct({
    name: faker.datatype.uuid(),
    description: faker.datatype.uuid(),
    price: faker.datatype.number(),
    stockQty: faker.datatype.number(),
  });

  await addFakeProductToOrder(order.id, fakeProduct.id, 2);
  return order;
};

const addFakeProductToOrder = async (orderId, productId, qty) => {
  return await addToCart({ productId, orderId, qty });
};

const createFakeEmptyOrder = async (userId) => {
  const order = await createOrderByUserId(userId);
  return order;
};

module.exports = {
  createFakeUser,
  createFakeProduct,
  createFakeOrder,
  createFakeEmptyOrder,
  addFakeProductToOrder,
};
